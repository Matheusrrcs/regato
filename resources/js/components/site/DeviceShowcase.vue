<script setup lang="ts">
/*
 * O site do projeto dentro de um navegador e de um celular. No desktop a cena
 * fica presa e os prints de página inteira rolam conforme o scroll; no mobile
 * cada aparelho rola enquanto atravessa a tela. Sem movimento (ou sem JS), as
 * telas viram áreas roláveis normais.
 */
import { motionEnabled, trackProgress } from '@/lib/scroll';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import Icon from './Icon.vue';

const props = defineProps<{
    title: string;
    desktop?: string | null;
    mobile?: string | null;
    url?: string | null;
}>();

const root = ref<HTMLElement | null>(null);
const desktopView = ref<HTMLElement | null>(null);
const desktopShot = ref<HTMLImageElement | null>(null);
const mobileView = ref<HTMLElement | null>(null);
const mobileShot = ref<HTMLImageElement | null>(null);
const ready = ref(false);

const host = computed(() => {
    if (!props.url) return null;

    try {
        return new URL(props.url).host.replace(/^www\./, '');
    } catch {
        return props.url;
    }
});

const both = computed(() => Boolean(props.desktop && props.mobile));

let media: MediaQueryList | null = null;
let resizeObserver: ResizeObserver | null = null;
let cleanups: (() => void)[] = [];
let tracked: HTMLElement[] = [];

function measure() {
    const pairs: [HTMLElement | null, HTMLImageElement | null][] = [
        [desktopView.value, desktopShot.value],
        [mobileView.value, mobileShot.value],
    ];
    let longest = 0;

    pairs.forEach(([view, shot]) => {
        if (!view || !shot) return;

        const travel = Math.max(0, shot.offsetHeight - view.clientHeight);
        shot.style.setProperty('--travel', `${travel}px`);
        longest = Math.max(longest, travel);
    });

    // Cena presa: distância de scroll proporcional ao tamanho do site.
    const vh = window.innerHeight;
    const distance = Math.min(Math.max(longest * 0.45, vh * 1.5), vh * 4);
    root.value?.style.setProperty('--pin-height', `${vh + distance}px`);
}

function teardown() {
    cleanups.forEach((cleanup) => cleanup());
    tracked.forEach((el) => el.style.removeProperty('--p'));
    cleanups = [];
    tracked = [];
}

function setup() {
    teardown();

    if (!root.value) return;

    if (media?.matches) {
        tracked = [root.value];
        cleanups.push(trackProgress(root.value, { mode: 'pin' }));
    } else {
        tracked = [desktopView.value, mobileView.value]
            .map((view) => view?.parentElement ?? null)
            .filter((el): el is HTMLElement => el !== null);
        tracked.forEach((el) =>
            cleanups.push(trackProgress(el, { mode: 'cross' })),
        );
    }
}

onMounted(() => {
    if (!motionEnabled()) return;

    ready.value = true;
    media = window.matchMedia('(min-width: 1024px)');
    media.addEventListener('change', setup);

    resizeObserver = new ResizeObserver(measure);
    [desktopView, desktopShot, mobileView, mobileShot].forEach((el) => {
        if (el.value) resizeObserver?.observe(el.value);
    });

    measure();
    setup();
});

onBeforeUnmount(() => {
    teardown();
    resizeObserver?.disconnect();
    media?.removeEventListener('change', setup);
});
</script>

<template>
    <section
        ref="root"
        class="pin-lg relative"
        :class="{ 'device-ready': ready }"
    >
        <span
            data-stream
            class="stream-gutter-right absolute top-0 h-px w-px"
            aria-hidden="true"
        />
        <span
            data-stream
            class="stream-gutter-right absolute bottom-0 h-px w-px"
            aria-hidden="true"
        />

        <div class="pin-stage flex items-center">
            <div
                class="mx-auto grid w-full max-w-7xl items-center gap-12 py-20 pr-5 pl-9 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-0"
            >
                <div class="lg:col-span-3">
                    <p class="eyebrow">O site</p>
                    <h2
                        class="mt-4 text-3xl leading-[1.05] font-bold text-balance sm:text-4xl"
                    >
                        Do topo ao rodapé{{
                            both ? ', no computador e no celular' : ''
                        }}
                    </h2>
                    <p class="text-muted-foreground mt-5 leading-relaxed">
                        <span class="motion-safe:hidden">
                            Role dentro das telas para ver a página inteira.
                        </span>
                        <span class="hidden motion-safe:inline">
                            Continue rolando: as telas percorrem a página
                            inteira.
                        </span>
                    </p>
                    <a
                        v-if="url"
                        :href="url"
                        target="_blank"
                        rel="noopener"
                        class="group text-water mt-7 inline-flex items-center gap-2 text-sm font-medium"
                    >
                        Visitar o site
                        <Icon
                            name="arrow-up-right"
                            class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </a>
                </div>

                <div class="relative lg:col-span-9">
                    <!-- Navegador -->
                    <div
                        v-if="desktop"
                        class="border-border bg-card overflow-hidden rounded-2xl border shadow-[0_40px_80px_-40px_rgb(30_45_35/0.35)]"
                        :class="{ 'lg:w-[86%]': mobile }"
                    >
                        <div
                            class="border-border flex items-center gap-3 border-b px-4 py-3"
                            aria-hidden="true"
                        >
                            <span class="flex gap-1.5">
                                <span
                                    v-for="n in 3"
                                    :key="n"
                                    class="bg-foreground/15 h-2.5 w-2.5 rounded-full"
                                />
                            </span>
                            <span
                                class="bg-background/70 text-muted-foreground mx-auto truncate rounded-full px-4 py-1 text-xs"
                            >
                                {{ host ?? title }}
                            </span>
                            <span class="w-[42px]" />
                        </div>
                        <div
                            ref="desktopView"
                            class="device-viewport aspect-[16/10] lg:max-h-[64svh] lg:w-full"
                            :tabindex="ready ? undefined : 0"
                            :aria-label="`Página inteira do site ${title} no computador`"
                        >
                            <img
                                ref="desktopShot"
                                :src="`/storage/${desktop}`"
                                :alt="`Site ${title} na versão para computador`"
                                loading="lazy"
                                decoding="async"
                                class="device-shot"
                                @load="measure"
                            />
                        </div>
                    </div>

                    <!-- Celular -->
                    <div
                        v-if="mobile"
                        class="mx-auto w-[62%] max-w-[300px]"
                        :class="
                            desktop
                                ? 'mt-12 lg:absolute lg:right-0 lg:-bottom-[8%] lg:mt-0 lg:w-[26%] lg:max-w-none'
                                : 'lg:w-[34%]'
                        "
                    >
                        <div
                            class="relative rounded-[2.6rem] border-[9px] border-[oklch(0.13_0.01_150)] bg-[oklch(0.13_0.01_150)] shadow-[0_40px_80px_-30px_rgb(30_45_35/0.45)]"
                        >
                            <span
                                class="absolute top-2 left-1/2 z-10 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-[oklch(0.13_0.01_150)]"
                                aria-hidden="true"
                            />
                            <div
                                ref="mobileView"
                                class="device-viewport aspect-[9/19.5] rounded-[2rem]"
                                :tabindex="ready ? undefined : 0"
                                :aria-label="`Página inteira do site ${title} no celular`"
                            >
                                <img
                                    ref="mobileShot"
                                    :src="`/storage/${mobile}`"
                                    :alt="`Site ${title} na versão para celular`"
                                    loading="lazy"
                                    decoding="async"
                                    class="device-shot"
                                    @load="measure"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
