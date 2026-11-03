<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Link, router } from '@inertiajs/vue3';

const props = defineProps<{
    resource: string;
    label: string;
    singular: string;
    titleField: string;
    items: Record<string, unknown>[];
}>();

function destroy(id: number) {
    if (confirm(`Remover este ${props.singular.toLowerCase()}?`)) {
        router.delete(`/admin/${props.resource}/${id}`);
    }
}
</script>

<template>
    <AdminLayout>
        <div class="mb-6 flex items-center justify-between">
            <div>
                <p class="eyebrow">Conteúdo</p>
                <h1 class="mt-2 text-2xl font-bold">{{ label }}</h1>
            </div>
            <Link
                :href="`/admin/${resource}/create`"
                class="bg-inverse text-inverse-foreground inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
            >
                + Novo {{ singular }}
            </Link>
        </div>

        <div class="border-border bg-card overflow-hidden rounded-2xl border">
            <table class="w-full text-left text-sm">
                <thead class="border-border text-muted-foreground border-b">
                    <tr>
                        <th class="px-5 py-3 font-medium">Título</th>
                        <th class="px-5 py-3 font-medium">Ativo</th>
                        <th class="px-5 py-3 font-medium">Ordem</th>
                        <th class="px-5 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in items"
                        :key="String(item.id)"
                        class="border-border/60 border-b last:border-0"
                    >
                        <td class="px-5 py-3.5">{{ item[titleField] }}</td>
                        <td class="px-5 py-3.5">
                            <span
                                class="rounded-full px-2.5 py-1 text-xs"
                                :class="
                                    item.is_active
                                        ? 'bg-olive/15 text-olive'
                                        : 'bg-muted text-muted-foreground'
                                "
                            >
                                {{ item.is_active ? 'Sim' : 'Não' }}
                            </span>
                        </td>
                        <td class="text-muted-foreground px-5 py-3.5">
                            {{ item.order }}
                        </td>
                        <td class="space-x-4 px-5 py-3.5 text-right">
                            <Link
                                :href="`/admin/${resource}/${item.id}/edit`"
                                class="text-olive hover:underline"
                            >
                                Editar
                            </Link>
                            <button
                                class="text-destructive hover:underline"
                                @click="destroy(item.id as number)"
                            >
                                Remover
                            </button>
                        </td>
                    </tr>
                    <tr v-if="items.length === 0">
                        <td
                            colspan="4"
                            class="text-muted-foreground px-5 py-10 text-center"
                        >
                            Nenhum registro encontrado.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminLayout>
</template>
