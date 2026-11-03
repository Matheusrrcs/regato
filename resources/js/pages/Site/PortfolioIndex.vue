<script setup lang="ts">
import CtaFinal from '@/components/site/CtaFinal.vue';
import PageHeader from '@/components/site/PageHeader.vue';
import ProjectBanks from '@/components/site/ProjectBanks.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';

defineProps<{
    settings: Record<string, string | null>;
    projects: {
        id: number;
        title: string;
        slug: string;
        category: string | null;
        summary: string | null;
        cover_image: string | null;
    }[];
}>();
</script>

<template>
    <SiteLayout :settings="settings">
        <PageHeader
            eyebrow="Portfólio"
            titulo="Por onde o regato já passou"
            descricao="Sites, marcas e sistemas visuais. Cada projeto com o caminho completo, do primeiro traço à entrega."
        />

        <section class="relative py-24 lg:py-36">
            <div class="mx-auto max-w-7xl pr-6 pl-9 lg:px-8">
                <ProjectBanks :projects="projects" />
            </div>
        </section>

        <CtaFinal />
    </SiteLayout>
</template>
