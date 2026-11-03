<script setup lang="ts">
/*
 * Margens: projetos alternando de lado, com o regato serpenteando no vão
 * entre imagem e texto. Usado na Home e na página de Portfólio.
 */
import { vProgress, vReveal } from '@/lib/scroll';
import { Link } from '@inertiajs/vue3';
import Icon from './Icon.vue';
import ProjectCover from './ProjectCover.vue';

defineProps<{
    projects: {
        id: number;
        title: string;
        slug: string;
        category: string | null;
        summary: string | null;
        cover_image: string | null;
    }[];
}>();

const pad = (n: number) => String(n).padStart(2, '0');
</script>

<template>
    <div class="space-y-24 lg:space-y-40">
        <article
            v-for="(project, i) in projects"
            :key="project.id"
            class="relative grid items-center gap-8"
            :class="
                i % 2
                    ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,1fr)_minmax(0,6fr)]'
                    : 'lg:grid-cols-[minmax(0,6fr)_minmax(0,1fr)_minmax(0,5fr)]'
            "
        >
            <span
                data-stream
                class="absolute top-1/2 h-px w-px"
                :class="i % 2 ? 'left-[46%]' : 'left-[54%]'"
                aria-hidden="true"
            />

            <Link
                v-reveal:mask
                v-progress
                :href="`/portfolio/${project.slug}`"
                class="group relative block overflow-hidden rounded-[2rem]"
                :class="{ 'lg:order-3': i % 2 }"
                :aria-label="`Ver projeto ${project.title}`"
            >
                <div class="relative aspect-[4/3] overflow-hidden">
                    <div
                        class="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    >
                        <ProjectCover
                            :title="project.title"
                            :image="project.cover_image"
                            :index="i"
                        />
                    </div>
                </div>
            </Link>

            <div class="hidden lg:order-2 lg:block" />

            <div
                v-reveal="120"
                :class="i % 2 ? 'lg:order-1 lg:text-right' : 'lg:order-3'"
            >
                <p class="eyebrow tabular-nums">
                    {{ pad(i + 1) }} · {{ project.category }}
                </p>
                <h3
                    class="mt-4 text-3xl leading-tight font-bold text-balance lg:text-4xl"
                >
                    {{ project.title }}
                </h3>
                <p class="text-muted-foreground mt-4 text-base leading-relaxed">
                    {{ project.summary }}
                </p>
                <Link
                    :href="`/portfolio/${project.slug}`"
                    class="group mt-6 inline-flex items-center gap-2 text-sm font-medium"
                >
                    Ver projeto
                    <Icon
                        name="arrow-right"
                        class="text-water h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </article>
    </div>
</template>
