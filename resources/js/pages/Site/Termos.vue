<script setup lang="ts">
import PageHeader from '@/components/site/PageHeader.vue';
import Section from '@/components/site/Section.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { vReveal } from '@/lib/scroll';

defineProps<{
    settings: Record<string, string | null>;
}>();

const paragraphs = (text: string | null) =>
    (text ?? '').split(/\n\s*\n/).filter((p) => p.trim());
</script>

<template>
    <SiteLayout :settings="settings">
        <PageHeader eyebrow="Jurídico" titulo="Termos de Uso" />
        <Section>
            <div
                class="text-muted-foreground mx-auto max-w-3xl space-y-5 text-base leading-relaxed"
            >
                <p
                    v-for="(paragraph, i) in paragraphs(settings.terms_content)"
                    :key="i"
                    v-reveal
                    class="whitespace-pre-line"
                >
                    {{ paragraph }}
                </p>
            </div>
        </Section>
    </SiteLayout>
</template>
