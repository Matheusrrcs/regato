<script setup lang="ts">
/*
 * Percurso: as etapas do processo como um trecho do regato. O regato principal
 * (<StreamCourse>) desce pela trilha e cada etapa "acende" quando a água passa.
 */
import { motionEnabled, TIP, vReveal } from '@/lib/scroll';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        steps: { id: number; title: string; description: string | null }[];
        eyebrow?: string;
        titulo?: string;
        descricao?: string;
    }>(),
    {
        eyebrow: 'Percurso',
        titulo: 'Do primeiro contato à entrega',
        descricao:
            'Cada etapa tem prazo combinado e entrega visível. Você sabe sempre em que trecho do caminho o projeto está.',
    },
);

const list = ref<HTMLOListElement | null>(null);
// Começa vazio no servidor e no cliente (SSR); o CSS só "apaga" etapas
// não percorridas quando há movimento (.js-motion).
const passed = ref<boolean[]>(props.steps.map(() => false));
const current = computed(() => Math.max(0, passed.value.lastIndexOf(true)));
const pad = (n: number) => String(n).padStart(2, '0');

let observer: IntersectionObserver | null = null;

onMounted(() => {
    if (!motionEnabled() || !list.value) {
        passed.value = props.steps.map(() => true);

        return;
    }

    observer = new IntersectionObserver(
        (entries) => {
            const next = [...passed.value];

            entries.forEach((entry) => {
                const index = Number(
                    (entry.target as HTMLElement).dataset.index,
                );
                const line =
                    entry.rootBounds?.bottom ?? window.innerHeight * TIP;
                next[index] = entry.boundingClientRect.top < line;
            });

            passed.value = next;
        },
        { rootMargin: `0px 0px -${Math.round((1 - TIP) * 100)}% 0px` },
    );

    list.value
        .querySelectorAll('[data-index]')
        .forEach((el) => observer?.observe(el));
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
    <section class="relative z-10">
        <div
            class="mx-auto grid max-w-7xl gap-14 py-24 pr-6 pl-9 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-36"
        >
            <div class="lg:col-span-5">
                <div class="lg:sticky lg:top-32">
                    <p v-reveal class="eyebrow">{{ eyebrow }}</p>
                    <h2
                        v-reveal="80"
                        class="mt-4 text-4xl leading-[1.02] font-bold text-balance sm:text-5xl"
                    >
                        {{ titulo }}
                    </h2>
                    <p
                        v-reveal="160"
                        class="text-muted-foreground mt-6 max-w-md text-lg"
                    >
                        {{ descricao }}
                    </p>

                    <div
                        class="mt-12 hidden items-end gap-5 motion-safe:lg:flex"
                        aria-hidden="true"
                    >
                        <span
                            class="font-display text-water text-[7rem] leading-[0.8] font-extrabold tracking-[-0.06em] tabular-nums"
                        >
                            {{ pad(current + 1) }}
                        </span>
                        <span class="text-muted-foreground pb-2 text-sm">
                            / {{ pad(steps.length) }}
                            <span
                                class="text-foreground mt-1 block max-w-[12rem] font-medium"
                            >
                                {{ steps[current]?.title }}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-7">
                <ol ref="list" class="relative pl-12 sm:pl-20">
                    <!-- O regato principal desce por aqui, passando pelas etapas. -->
                    <span
                        class="absolute top-2 bottom-0 left-[11px] w-px sm:left-[23px]"
                        aria-hidden="true"
                    >
                        <span
                            data-stream
                            data-stream-keep
                            class="absolute top-0 left-0 h-px w-px"
                        />
                        <span
                            data-stream
                            data-stream-keep
                            class="absolute bottom-0 left-0 h-px w-px"
                        />
                    </span>

                    <li
                        v-for="(step, index) in steps"
                        :key="step.id"
                        :data-index="index"
                        class="step relative pb-20 last:pb-4 sm:pb-28"
                        :class="{ 'is-passed': passed[index] }"
                    >
                        <span
                            class="step-marker border-water bg-background absolute top-1.5 -left-12 flex h-[23px] w-[23px] items-center justify-center rounded-full border transition-[border-color,transform] duration-500 sm:-left-20 sm:ml-3"
                            aria-hidden="true"
                        >
                            <span
                                class="step-dot bg-water h-2 w-2 rounded-full transition-transform duration-500"
                            />
                        </span>

                        <p
                            class="font-display text-olive text-sm font-semibold tracking-[0.2em] tabular-nums"
                        >
                            {{ pad(index + 1) }}
                        </p>
                        <h3
                            class="step-title mt-3 text-2xl font-semibold transition-colors duration-500 sm:text-3xl"
                        >
                            {{ step.title }}
                        </h3>
                        <p
                            class="step-desc text-muted-foreground mt-4 max-w-lg text-base leading-relaxed transition-opacity duration-500"
                        >
                            {{ step.description }}
                        </p>
                    </li>
                </ol>
            </div>
        </div>
    </section>
</template>
