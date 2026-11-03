<script setup lang="ts">
/*
 * O curso do regato: água correndo entre pedras, atravessando o elemento pai
 * por todas as âncoras [data-stream]. À frente da água fica o leito seco; a
 * água avança conforme o scroll (até a linha TIP da tela).
 *
 * Âncoras:
 *   data-stream        ponto por onde a água passa
 *   data-stream-keep   mantém o x da âncora também no mobile
 *
 * O canvas cobre só a janela visível (+ folga) e rola junto com a página;
 * é reposicionado e redesenhado a cada frame. O pai precisa ser relative.
 */
import { motionEnabled, subscribe, TIP } from '@/lib/scroll';
import type { Anchor, Course, World } from '@/lib/riacho';
import { buildCourse, buildWorld, drawRiacho } from '@/lib/riacho';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const MOBILE_BREAKPOINT = 1024;
const MOBILE_GUTTER = 12;
/** Folga acima e abaixo da tela, em frações da altura da viewport. */
const BUFFER = 0.35;

const canvas = ref<HTMLCanvasElement | null>(null);

let parent: HTMLElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let course: Course | null = null;
let world: World | null = null;
let resizeObserver: ResizeObserver | null = null;
let unsubscribe: (() => void) | null = null;
let rebuildFrame = 0;
let loopFrame = 0;
let dpr = 1;
let windowHeight = 0;
let animate = false;
const startedAt = performance.now();

function anchorPosition(el: HTMLElement, root: HTMLElement) {
    // offsetTop/offsetLeft ignoram transforms (parallax), ao contrário do rect.
    let x = el.offsetWidth / 2;
    let y = el.offsetHeight / 2;
    let node: HTMLElement | null = el;

    while (node && node !== root) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
    }

    return { x, y };
}

/** Largura do regato conforme o espaço que sobra fora da coluna de conteúdo. */
function baseHalfWidth(width: number) {
    if (width < MOBILE_BREAKPOINT) return 5;

    const gutter = Math.max(0, (width - 1280) / 2) + 32;

    return Math.max(8, Math.min(22, gutter * 0.28));
}

function rebuild() {
    rebuildFrame = 0;

    if (!parent || !canvas.value) return;

    const width = parent.clientWidth;
    const mobile = width < MOBILE_BREAKPOINT;

    const anchors: Anchor[] = [
        ...parent.querySelectorAll<HTMLElement>('[data-stream]'),
    ]
        .filter((el) => el.offsetParent !== null)
        .map((el) => {
            const { x, y } = anchorPosition(el, parent!);

            return { x: mobile && !('streamKeep' in el.dataset) ? -1 : x, y };
        })
        .sort((a, b) => a.y - b.y)
        .map((anchor, i) => ({
            y: anchor.y,
            // No mobile a água corre pela margem esquerda, com leve meandro.
            x: anchor.x < 0 ? MOBILE_GUTTER + (i % 2 ? 3 : -3) : anchor.x,
        }));

    if (anchors.length < 2) {
        course = null;
        world = null;
        draw();

        return;
    }

    dpr = Math.min(2, window.devicePixelRatio || 1);
    windowHeight = Math.ceil(window.innerHeight * (1 + BUFFER * 2));
    canvas.value.width = Math.ceil(width * dpr);
    canvas.value.height = Math.ceil(windowHeight * dpr);
    canvas.value.style.width = `${width}px`;
    canvas.value.style.height = `${windowHeight}px`;

    course = buildCourse(anchors, baseHalfWidth(width));
    // Semente fixa por página: as pedras ficam sempre no mesmo lugar.
    const seed = [...location.pathname].reduce(
        (h, c) => (h * 31 + c.charCodeAt(0)) | 0,
        7,
    );
    world = buildWorld(course, seed, dpr, mobile ? 0.45 : 1);

    draw();
}

function draw() {
    if (!ctx || !canvas.value || !parent) return;

    if (!course || !world) {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

        return;
    }

    const parentTop = parent.getBoundingClientRect().top;
    const viewTop = -parentTop;
    const vh = window.innerHeight;
    // Nunca passa da base do pai (senão cria scroll extra no fim da página).
    const top = Math.max(
        0,
        Math.min(viewTop - vh * BUFFER, parent.clientHeight - windowHeight),
    );

    // Até onde a água chegou: o ponto do curso na altura TIP da tela.
    let tip = course.total;
    if (animate) {
        const tipY = viewTop + vh * TIP;
        const s = course.samples;
        let lo = 0;
        let hi = course.count - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (s[mid * 6 + 1] < tipY) lo = mid + 1;
            else hi = mid;
        }
        tip = s[lo * 6 + 5];
    }

    canvas.value.style.transform = `translate3d(0, ${top}px, 0)`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawRiacho({
        ctx,
        course,
        world,
        top,
        height: windowHeight,
        tip,
        time: animate ? (performance.now() - startedAt) / 1000 : 0,
    });
}

function loop() {
    draw();
    loopFrame = requestAnimationFrame(loop);
}

function scheduleRebuild() {
    if (!rebuildFrame) rebuildFrame = requestAnimationFrame(rebuild);
}

function onVisibility() {
    cancelAnimationFrame(loopFrame);
    if (animate && !document.hidden) loopFrame = requestAnimationFrame(loop);
}

onMounted(() => {
    parent = canvas.value?.parentElement ?? null;
    ctx = canvas.value?.getContext('2d') ?? null;

    if (!parent || !ctx) return;

    animate = motionEnabled();

    resizeObserver = new ResizeObserver(scheduleRebuild);
    resizeObserver.observe(parent);
    window.addEventListener('resize', scheduleRebuild);
    void document.fonts?.ready.then(scheduleRebuild);
    scheduleRebuild();

    if (animate) {
        document.addEventListener('visibilitychange', onVisibility);
        onVisibility();
    } else {
        // Sem animação: redesenha só quando a página rola.
        unsubscribe = subscribe({ write: draw });
    }
});

onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    window.removeEventListener('resize', scheduleRebuild);
    document.removeEventListener('visibilitychange', onVisibility);
    unsubscribe?.();
    cancelAnimationFrame(rebuildFrame);
    cancelAnimationFrame(loopFrame);
});
</script>

<template>
    <canvas
        ref="canvas"
        class="pointer-events-none absolute top-0 left-0 z-0"
        aria-hidden="true"
    />
</template>
