<script setup lang="ts">
import PageHeader from '@/components/site/PageHeader.vue';
import Section from '@/components/site/Section.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { vReveal } from '@/lib/scroll';

defineProps<{
    settings: Record<string, string | null>;
    faqs: { id: number; question: string; answer: string }[];
}>();
</script>

<template>
    <SiteLayout :settings="settings">
        <PageHeader eyebrow="Dúvidas" titulo="Perguntas frequentes" />

        <Section>
            <div class="divide-border mx-auto max-w-3xl divide-y">
                <details
                    v-for="(faq, i) in faqs"
                    :key="faq.id"
                    v-reveal="i * 80"
                    class="group py-6"
                >
                    <summary
                        class="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden"
                    >
                        {{ faq.question }}
                        <span
                            class="text-water relative h-4 w-4 shrink-0"
                            aria-hidden="true"
                        >
                            <span
                                class="absolute inset-x-0 top-1/2 h-px bg-current"
                            />
                            <span
                                class="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-300 group-open:scale-y-0"
                            />
                        </span>
                    </summary>
                    <p class="text-muted-foreground mt-3 text-sm">
                        {{ faq.answer }}
                    </p>
                </details>
            </div>
        </Section>
    </SiteLayout>
</template>
