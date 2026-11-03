<script setup lang="ts">
/*
 * Página de projeto. Mostra só o que o projeto tem:
 *  - site (prints de página inteira desktop/mobile) → DeviceShowcase
 *  - identidade visual (galeria de peças)          → BrandGallery
 * Projetos com os dois mostram os dois, na ordem site → marca.
 */
import BrandGallery from '@/components/site/BrandGallery.vue';
import CtaFinal from '@/components/site/CtaFinal.vue';
import DeviceShowcase from '@/components/site/DeviceShowcase.vue';
import Icon from '@/components/site/Icon.vue';
import PageHeader from '@/components/site/PageHeader.vue';
import ProjectCover from '@/components/site/ProjectCover.vue';
import ScrollWords from '@/components/site/ScrollWords.vue';
import Section from '@/components/site/Section.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { vProgress, vReveal } from '@/lib/scroll';
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps<{
    settings: Record<string, string | null>;
    project: {
        title: string;
        category: string | null;
        client: string | null;
        project_url: string | null;
        cover_image: string | null;
        desktop_screenshot: string | null;
        mobile_screenshot: string | null;
        gallery: string[] | null;
        summary: string | null;
        content: string | null;
    };
    next: {
        title: string;
        slug: string;
        category: string | null;
        cover_image: string | null;
    } | null;
}>();

const hasSite = computed(
    () =>
        Boolean(props.project.desktop_screenshot) ||
        Boolean(props.project.mobile_screenshot),
);
const gallery = computed(() => props.project.gallery ?? []);

const deliverables = computed(() =>
    [
        hasSite.value && 'Site',
        gallery.value.length > 0 && 'Identidade visual',
    ].filter((item): item is string => Boolean(item)),
);

const meta = computed(() =>
    [
        { label: 'Cliente', value: props.project.client },
        { label: 'Categoria', value: props.project.category },
        {
            label: 'Entregas',
            value: deliverables.value.join(' + ') || null,
        },
    ].filter((item) => item.value),
);

// Textos curtos acendem palavra por palavra; textos longos ficam legíveis.
const shortContent = computed(
    () => (props.project.content ?? '').length <= 480,
);
</script>

<template>
    <SiteLayout :settings="settings">
        <Head :title="project.title" />

        <PageHeader
            :eyebrow="project.category ?? 'Projeto'"
            :titulo="project.title"
            :descricao="project.summary ?? undefined"
        />

        <!-- Ficha -->
        <section class="relative">
            <div
                class="mx-auto grid max-w-7xl gap-8 pt-14 pr-5 pl-9 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"
            >
                <div
                    v-for="(item, i) in meta"
                    :key="item.label"
                    v-reveal="i * 90"
                    class="border-border border-t pt-5"
                >
                    <p class="eyebrow">{{ item.label }}</p>
                    <p class="mt-2 font-medium">{{ item.value }}</p>
                </div>
                <div
                    v-if="project.project_url"
                    v-reveal="meta.length * 90"
                    class="border-border border-t pt-5"
                >
                    <p class="eyebrow">No ar</p>
                    <a
                        :href="project.project_url"
                        target="_blank"
                        rel="noopener"
                        class="group text-water mt-2 inline-flex items-center gap-2 font-medium"
                    >
                        Visitar
                        <Icon
                            name="arrow-up-right"
                            class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </a>
                </div>
            </div>
        </section>

        <!-- Capa -->
        <section v-if="project.cover_image" class="relative">
            <div class="mx-auto max-w-7xl pt-14 pr-5 pl-9 lg:px-8">
                <div
                    v-reveal:mask
                    v-progress
                    class="relative aspect-[16/9] overflow-hidden rounded-[2rem]"
                >
                    <ProjectCover
                        :title="project.title"
                        :image="project.cover_image"
                        eager
                    />
                </div>
            </div>
        </section>

        <!-- O projeto -->
        <Section v-if="project.content">
            <div class="grid gap-8 lg:grid-cols-12">
                <p v-reveal class="eyebrow lg:col-span-3 lg:pt-3">O projeto</p>
                <ScrollWords
                    v-if="shortContent"
                    :text="project.content"
                    class="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.15] font-bold tracking-[-0.02em] lg:col-span-9"
                />
                <div
                    v-else
                    v-reveal
                    class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line lg:col-span-9 lg:text-xl"
                >
                    {{ project.content }}
                </div>
            </div>
        </Section>

        <DeviceShowcase
            v-if="hasSite"
            :title="project.title"
            :desktop="project.desktop_screenshot"
            :mobile="project.mobile_screenshot"
            :url="project.project_url"
        />

        <BrandGallery
            v-if="gallery.length"
            :title="project.title"
            :images="gallery"
        />

        <!-- Próximo projeto -->
        <section v-if="next" class="relative">
            <span
                data-stream
                class="stream-gutter-right absolute top-0 h-px w-px"
                aria-hidden="true"
            />
            <div class="mx-auto max-w-7xl pt-24 pr-5 pl-9 lg:px-8 lg:pt-32">
                <div class="border-border border-t pt-10">
                    <p v-reveal class="eyebrow">Próximo projeto</p>
                    <Link
                        :href="`/portfolio/${next.slug}`"
                        class="group mt-8 grid items-center gap-10 lg:grid-cols-12"
                    >
                        <span class="lg:col-span-7">
                            <span
                                v-reveal="80"
                                class="font-display block text-[clamp(2.6rem,6.5vw,5.75rem)] leading-[0.95] font-bold tracking-[-0.04em] text-balance"
                            >
                                {{ next.title }}
                            </span>
                            <span
                                v-reveal="160"
                                class="text-muted-foreground mt-5 inline-flex items-center gap-3 text-sm"
                            >
                                {{ next.category }}
                                <Icon
                                    name="arrow-right"
                                    class="text-water h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                                />
                            </span>
                        </span>
                        <span
                            v-reveal:mask
                            v-progress
                            class="relative block aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-5"
                        >
                            <span
                                class="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            >
                                <ProjectCover
                                    :title="next.title"
                                    :image="next.cover_image"
                                    :index="1"
                                />
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </section>

        <CtaFinal />
    </SiteLayout>
</template>
