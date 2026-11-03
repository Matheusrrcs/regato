<script setup lang="ts">
import CtaFinal from '@/components/site/CtaFinal.vue';
import PageHeader from '@/components/site/PageHeader.vue';
import Percurso from '@/components/site/Percurso.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';

defineProps<{
    settings: Record<string, string | null>;
    steps: { id: number; title: string; description: string | null }[];
}>();
</script>

<template>
    <SiteLayout :settings="settings">
        <PageHeader
            eyebrow="Como trabalhamos"
            titulo="Nosso processo"
            descricao="Cada etapa é acompanhada de perto, com prazo combinado e sem surpresas no final."
        />

        <Percurso
            v-if="steps.length"
            :steps="steps"
            eyebrow="Etapas"
            titulo="Um caminho claro, do começo ao fim"
        />

        <CtaFinal />
    </SiteLayout>
</template>
