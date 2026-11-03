<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';
import { router } from '@inertiajs/vue3';

type ContactMessage = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
};

defineProps<{
    messages: { data: ContactMessage[] };
}>();

function markAsRead(id: number) {
    router.post(`/admin/messages/${id}/read`);
}

function destroy(id: number) {
    if (confirm('Remover esta mensagem?')) {
        router.delete(`/admin/messages/${id}`);
    }
}
</script>

<template>
    <AdminLayout>
        <p class="eyebrow">Contato</p>
        <h1 class="mt-2 mb-6 text-2xl font-bold">Mensagens</h1>

        <div class="space-y-3">
            <div
                v-for="message in messages.data"
                :key="message.id"
                class="border-border bg-card rounded-2xl border p-5"
                :class="{ 'border-l-olive border-l-4': !message.is_read }"
            >
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <div class="font-medium">
                            {{ message.name }}
                            <span class="text-muted-foreground text-sm">{{
                                message.email
                            }}</span>
                        </div>
                        <div class="text-muted-foreground text-sm">
                            {{ message.subject }}
                        </div>
                    </div>
                    <div class="space-x-4 text-sm">
                        <button
                            v-if="!message.is_read"
                            class="text-olive hover:underline"
                            @click="markAsRead(message.id)"
                        >
                            Marcar como lida
                        </button>
                        <button
                            class="text-destructive hover:underline"
                            @click="destroy(message.id)"
                        >
                            Remover
                        </button>
                    </div>
                </div>
                <p class="text-muted-foreground mt-3 text-sm">
                    {{ message.message }}
                </p>
            </div>

            <div
                v-if="messages.data.length === 0"
                class="border-border bg-card text-muted-foreground rounded-2xl border p-10 text-center"
            >
                Nenhuma mensagem recebida.
            </div>
        </div>
    </AdminLayout>
</template>
