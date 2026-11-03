<script setup lang="ts">
/*
 * Peças da identidade visual. No desktop, com 3+ imagens, a cena fica presa e
 * as peças correm na horizontal conforme o scroll (o rio "passa" por elas).
 * No mobile, ou sem movimento, vira grade / faixa rolável normal.
 */
import { motionEnabled, trackProgress, vReveal } from '@/lib/scroll';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
    title: string;
    images: string[];
}>();

const root = ref<HTMLElement | null>(null);
const viewport = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
const ready = ref(false);

const horizontal = computed(() => props.images.length >= 3);

let media: MediaQueryList | null = null;
let resizeObserver: ResizeObserver | null = null;
let stopTracking: (() => void) | null = null;

function measure() {
    if (!root.value || !viewport.value || !track.value) return;

    const travel = Math.max(
        0,
        track.value.scrollWidth - viewport.value.clientWidth,
    );
    track.value.style.setProperty('--travel', `${travel}px`);
    root.value.style.setProperty(
        '--pin-height',
        `${window.innerHeight + travel}px`,
    );
}

function setup() {
    stopTracking?.();
    stopTracking = null;
    root.value?.style.removeProperty('--p');

    if (media?.matches && root.value) {
        stopTracking = trackProgress(root.value, { mode: 'pin' });
    }
}

onMounted(() => {
    if (!horizontal.value || !motionEnabled()) return;

    ready.value = true;
    media = window.matchMedia('(min-width: 1024px)');
    media.addEventListener('change', setup);

    resizeObserver = new ResizeObserver(measure);
    if (track.value) resizeObserver.observe(track.value);
    if (viewport.value) resizeObserver.observe(viewport.value);

    measure();
    setup();
});

onBeforeUnmount(() => {
    stopTracking?.();
    resizeObserver?.disconnect();
    media?.removeEventListener('change', setup);
});
</script>

<template>
    <section
        ref="root"
        class="relative"
        :class="{ 'pin-lg': horizontal, 'gallery-ready': ready }"
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

        <div
            class="flex flex-col justify-center py-20 lg:py-28"
            :class="{ 'pin-stage lg:py-0': horizontal }"
        >
            <div
                class="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 pr-5 pl-9 lg:px-8"
            >
                <div class="max-w-2xl">
                    <p v-reveal class="eyebrow">Identidade visual</p>
                    <h2
                        v-reveal="80"
                        class="mt-4 text-3xl leading-[1.05] font-bold text-balance sm:text-4xl lg:text-5xl"
                    >
                        A marca em cada ponto de contato
                    </h2>
                </div>
                <p
                    v-reveal="160"
                    class="text-muted-foreground text-sm tabular-nums"
                >
                    {{ String(images.length).padStart(2, '0') }} peças
                </p>
            </div>

            <div
                ref="viewport"
                class="mt-10 lg:mt-14"
                :class="{ 'gallery-viewport': horizontal }"
            >
                <ul
                    ref="track"
                    class="mx-auto grid max-w-7xl gap-5 pr-5 pl-9 sm:grid-cols-2"
                    :class="
                        horizontal
                            ? 'gallery-track lg:flex lg:max-w-none lg:gap-6'
                            : 'lg:gap-8 lg:px-8'
                    "
                >
                    <li
                        v-for="(image, i) in images"
                        :key="image"
                        v-reveal:mask
                        class="shrink-0"
                        :class="{
                            'sm:col-span-2': !horizontal && images.length === 1,
                        }"
                    >
                        <a
                            :href="`/storage/${image}`"
                            target="_blank"
                            rel="noopener"
                            class="group bg-card block overflow-hidden rounded-[2rem]"
                            :aria-label="`Abrir peça ${i + 1} da identidade de ${title} em tamanho real`"
                        >
                            <img
                                :src="`/storage/${image}`"
                                :alt="`Identidade visual de ${title} — peça ${i + 1}`"
                                loading="lazy"
                                decoding="async"
                                class="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                :class="{
                                    'lg:h-[56svh] lg:w-auto lg:max-w-none':
                                        horizontal,
                                }"
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
