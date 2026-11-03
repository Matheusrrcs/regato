<script setup lang="ts">
/*
 * Serviços como cards que se empilham: cada um gruda no topo e o próximo
 * desliza por cima, como camadas de água. Sem movimento, lista normal.
 */
import CtaFinal from '@/components/site/CtaFinal.vue';
import Icon from '@/components/site/Icon.vue';
import PageHeader from '@/components/site/PageHeader.vue';
import Section from '@/components/site/Section.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { vReveal } from '@/lib/scroll';
import { Link } from '@inertiajs/vue3';

defineProps<{
    settings: Record<string, string | null>;
    services: { id: number; title: string; description: string | null }[];
}>();

const pad = (n: number) => String(n).padStart(2, '0');
</script>

<template>
    <SiteLayout :settings="settings">
        <PageHeader
            eyebrow="O que fazemos"
            titulo="Serviços"
            descricao="Marca, site e design do dia a dia — separados ou juntos, sempre com a mesma coerência."
        />

        <Section>
            <ol class="space-y-6 pb-[10vh]">
                <li
                    v-for="(service, i) in services"
                    :key="service.id"
                    class="motion-safe:sticky"
                    :style="{ top: `calc(6.5rem + ${i * 1.5}rem)` }"
                >
                    <article
                        v-reveal
                        class="border-border bg-card flex min-h-[50svh] flex-col rounded-[2rem] border p-8 shadow-[0_-24px_50px_-30px_rgb(30_45_35/0.25)] sm:p-12 lg:p-16"
                    >
                        <!-- Título no topo: é o que continua visível quando o
                             próximo card desliza por cima. -->
                        <div class="flex items-start gap-6 sm:gap-10">
                            <span
                                class="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.85] font-extrabold tracking-[-0.06em] text-transparent tabular-nums [-webkit-text-stroke:1px_var(--olive)]"
                                aria-hidden="true"
                                >{{ pad(i + 1) }}</span
                            >
                            <h2
                                class="text-3xl leading-[1.02] font-bold text-balance sm:text-5xl"
                            >
                                {{ service.title }}
                            </h2>
                        </div>
                        <div
                            class="mt-auto grid gap-8 pt-12 lg:grid-cols-12 lg:items-end"
                        >
                            <p
                                class="text-muted-foreground text-lg leading-relaxed lg:col-span-7"
                            >
                                {{ service.description }}
                            </p>
                            <Link
                                href="/contato"
                                class="group bg-inverse text-inverse-foreground inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-5 lg:justify-self-end"
                            >
                                Falar sobre este serviço
                                <Icon
                                    name="arrow-right"
                                    class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    </article>
                </li>
            </ol>
        </Section>

        <CtaFinal />
    </SiteLayout>
</template>
