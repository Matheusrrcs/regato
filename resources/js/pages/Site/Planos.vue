<script setup lang="ts">
import Icon from '@/components/site/Icon.vue';
import PageHeader from '@/components/site/PageHeader.vue';
import Section from '@/components/site/Section.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { vProgress, vReveal } from '@/lib/scroll';
import { Link } from '@inertiajs/vue3';

defineProps<{
    settings: Record<string, string | null>;
    plans: {
        id: number;
        name: string;
        price: string;
        billing_period: string;
        description: string | null;
        is_featured: boolean;
        features: { id: number; feature: string }[];
    }[];
}>();
</script>

<template>
    <SiteLayout :settings="settings">
        <PageHeader
            eyebrow="Investimento"
            titulo="Planos e preços"
            descricao="Pacotes fechados para começar rápido, sem surpresas no orçamento."
        />

        <Section>
            <div class="grid items-start gap-6 lg:grid-cols-3">
                <div
                    v-for="(plan, i) in plans"
                    :key="plan.id"
                    v-progress
                    class="lg:drift flex h-full"
                    :style="{ '--depth': plan.is_featured ? -60 : 50 }"
                >
                    <div
                        v-reveal="i * 120"
                        class="relative flex w-full flex-col rounded-3xl border p-8 lg:p-10"
                        :class="
                            plan.is_featured
                                ? 'surface-inverse border-transparent'
                                : 'border-border bg-card'
                        "
                    >
                        <span
                            v-if="plan.is_featured"
                            class="bg-inverse-foreground text-inverse absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-medium"
                            >Mais escolhido</span
                        >
                        <h3 class="text-lg font-semibold">{{ plan.name }}</h3>
                        <p
                            class="font-display mt-6 text-5xl font-extrabold tracking-[-0.04em] tabular-nums"
                        >
                            <span class="align-top text-lg font-semibold"
                                >R$</span
                            >
                            {{ Number(plan.price).toLocaleString('pt-BR') }}
                        </p>
                        <p
                            class="text-sm"
                            :class="
                                plan.is_featured
                                    ? 'opacity-70'
                                    : 'text-muted-foreground'
                            "
                        >
                            {{ plan.billing_period }}
                        </p>
                        <p
                            class="mt-4 text-sm"
                            :class="
                                plan.is_featured
                                    ? 'opacity-80'
                                    : 'text-muted-foreground'
                            "
                        >
                            {{ plan.description }}
                        </p>
                        <ul class="mt-6 mb-8 space-y-2.5 text-sm">
                            <li
                                v-for="feature in plan.features"
                                :key="feature.id"
                                class="flex gap-2"
                            >
                                <Icon
                                    name="check"
                                    class="mt-0.5 h-4 w-4 shrink-0"
                                />
                                {{ feature.feature }}
                            </li>
                        </ul>
                        <Link
                            href="/contato"
                            class="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                            :class="
                                plan.is_featured
                                    ? 'bg-inverse-foreground text-inverse'
                                    : 'bg-inverse text-inverse-foreground'
                            "
                        >
                            Contratar
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    </SiteLayout>
</template>
