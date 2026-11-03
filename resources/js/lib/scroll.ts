import type { Directive } from 'vue';

/*
 * Motor de scroll do site.
 *
 * Um único listener de scroll/resize agenda um requestAnimationFrame. Em cada
 * frame todos os assinantes primeiro leem layout (read) e depois escrevem
 * estilos (write), evitando layout thrashing. Elementos só ficam assinados
 * enquanto estão perto da viewport (IntersectionObserver).
 */

/** Altura da viewport (0..1) onde fica a "ponta" da correnteza. */
export const TIP = 0.55;

export const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const motionEnabled = (): boolean =>
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !prefersReducedMotion();

if (motionEnabled()) {
    document.documentElement.classList.add('js-motion');
}

export interface ScrollFrame {
    vh: number;
    vw: number;
}

export interface ScrollSubscriber {
    read?(frame: ScrollFrame): void;
    write(frame: ScrollFrame): void;
}

const subscribers = new Set<ScrollSubscriber>();
let frameId = 0;

const currentFrame = (): ScrollFrame => ({
    vh: window.innerHeight,
    vw: window.innerWidth,
});

function run(list: Iterable<ScrollSubscriber>): void {
    const frame = currentFrame();
    const items = [...list];
    items.forEach((s) => s.read?.(frame));
    items.forEach((s) => s.write(frame));
}

function flush(): void {
    frameId = 0;
    run(subscribers);
}

export function requestFlush(): void {
    if (!frameId && subscribers.size) {
        frameId = requestAnimationFrame(flush);
    }
}

export function subscribe(subscriber: ScrollSubscriber): () => void {
    if (subscribers.size === 0) {
        window.addEventListener('scroll', requestFlush, { passive: true });
        window.addEventListener('resize', requestFlush, { passive: true });
    }

    subscribers.add(subscriber);
    requestFlush();

    return () => {
        subscribers.delete(subscriber);

        if (subscribers.size === 0) {
            window.removeEventListener('scroll', requestFlush);
            window.removeEventListener('resize', requestFlush);
            cancelAnimationFrame(frameId);
            frameId = 0;
        }
    };
}

/* ------------------------------------------------------------------ */
/* Assinatura ligada à visibilidade do elemento                        */
/* ------------------------------------------------------------------ */

const visibleSubs = new WeakMap<
    Element,
    { subscriber: ScrollSubscriber; off: (() => void) | null }
>();
let visibilityObserver: IntersectionObserver | null = null;

function getVisibilityObserver(): IntersectionObserver {
    visibilityObserver ??= new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const item = visibleSubs.get(entry.target);

                if (!item) return;

                if (entry.isIntersecting && !item.off) {
                    item.off = subscribe(item.subscriber);
                } else if (!entry.isIntersecting && item.off) {
                    // Último frame síncrono para não deixar o estado "no meio".
                    run([item.subscriber]);
                    item.off();
                    item.off = null;
                }
            });
        },
        { rootMargin: '25% 0px' },
    );

    return visibilityObserver;
}

export function subscribeWhileVisible(
    el: Element,
    subscriber: ScrollSubscriber,
): () => void {
    visibleSubs.set(el, { subscriber, off: null });
    getVisibilityObserver().observe(el);

    return () => {
        visibilityObserver?.unobserve(el);
        visibleSubs.get(el)?.off?.();
        visibleSubs.delete(el);
    };
}

/* ------------------------------------------------------------------ */
/* Progresso de cena                                                   */
/* ------------------------------------------------------------------ */

/**
 * cross: 0 quando o topo entra pela base da tela, 1 quando a base sai pelo topo.
 * pin:   0..1 enquanto uma cena alta com filho sticky está "presa".
 * exit:  0 com o topo no topo da tela, 1 quando o elemento já saiu por cima.
 * tip:   quanto do elemento já passou da linha da correnteza (TIP).
 */
export type ProgressMode = 'cross' | 'pin' | 'exit' | 'tip';

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

export function computeProgress(
    mode: ProgressMode,
    rect: DOMRect,
    vh: number,
): number {
    switch (mode) {
        case 'pin': {
            const distance = rect.height - vh;

            return distance > 0
                ? clamp01(-rect.top / distance)
                : rect.top < 0
                  ? 1
                  : 0;
        }
        case 'exit':
            return clamp01(-rect.top / rect.height);
        case 'tip':
            return clamp01((vh * TIP - rect.top) / rect.height);
        default:
            return clamp01((vh - rect.top) / (vh + rect.height));
    }
}

const reducedDefaults: Record<ProgressMode, number> = {
    cross: 0.5,
    pin: 1,
    exit: 0,
    tip: 1,
};

export interface ProgressOptions {
    mode?: ProgressMode;
    onUpdate?: (progress: number) => void;
}

/** Escreve `--p` (0..1) no elemento conforme o scroll. Retorna o cleanup. */
export function trackProgress(
    el: HTMLElement,
    { mode = 'cross', onUpdate }: ProgressOptions = {},
): () => void {
    if (!motionEnabled()) {
        const value = reducedDefaults[mode];
        el.style.setProperty('--p', String(value));
        onUpdate?.(value);

        return () => {};
    }

    let rect: DOMRect | null = null;
    let last = -1;

    return subscribeWhileVisible(el, {
        read() {
            rect = el.getBoundingClientRect();
        },
        write({ vh }) {
            if (!rect) return;

            const p =
                Math.round(computeProgress(mode, rect, vh) * 10000) / 10000;

            if (p === last) return;

            last = p;
            el.style.setProperty('--p', String(p));
            onUpdate?.(p);
        },
    });
}

/* ------------------------------------------------------------------ */
/* Diretivas                                                           */
/* ------------------------------------------------------------------ */

const progressCleanups = new WeakMap<HTMLElement, () => void>();

/**
 * v-progress="'pin'" ou v-progress="{ mode: 'tip', onUpdate }".
 * Expõe `--p` para o CSS animar apenas transform/opacity.
 */
export const vProgress: Directive<
    HTMLElement,
    ProgressMode | ProgressOptions | undefined
> = {
    mounted(el, { value }) {
        const options = typeof value === 'string' ? { mode: value } : value;
        progressCleanups.set(el, trackProgress(el, options));
    },
    unmounted(el) {
        progressCleanups.get(el)?.();
        progressCleanups.delete(el);
    },
};

let revealObserver: IntersectionObserver | null = null;

function getRevealObserver(): IntersectionObserver {
    revealObserver ??= new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                revealObserver?.unobserve(entry.target);
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    return revealObserver;
}

/**
 * v-reveal, v-reveal:mask, v-reveal:fade — com atraso opcional em ms:
 * v-reveal="120". O conteúdo só fica oculto quando há JS e movimento ativo.
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
    beforeMount(el, { arg, value }) {
        el.dataset.reveal = arg ?? 'up';

        if (value) {
            el.style.setProperty('--reveal-delay', `${value}ms`);
        }
    },
    mounted(el) {
        if (motionEnabled()) {
            getRevealObserver().observe(el);
        } else {
            el.classList.add('is-visible');
        }
    },
    unmounted(el) {
        revealObserver?.unobserve(el);
    },
};
