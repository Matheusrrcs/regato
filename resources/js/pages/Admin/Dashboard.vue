<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';

defineProps<{
    stats: Record<string, number>;
}>();

const labels: Record<string, string> = {
    services: 'Serviços',
    plans: 'Planos',
    portfolio: 'Projetos',
    testimonials: 'Depoimentos',
    faqs: 'Perguntas',
    unread_messages: 'Mensagens não lidas',
};
</script>

<template>
    <AdminLayout>
        <p class="eyebrow">Painel</p>
        <h1 class="mt-2 mb-6 text-2xl font-bold">Dashboard</h1>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div
                v-for="(value, key) in stats"
                :key="key"
                class="border-border bg-card rounded-2xl border p-5"
            >
                <div class="font-display text-3xl font-bold">{{ value }}</div>
                <div class="text-muted-foreground mt-1 text-sm">
                    {{ labels[key] ?? key }}
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
