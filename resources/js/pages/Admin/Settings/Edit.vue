<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

type Field = {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'image';
    value: string | null;
};
type Group = { label: string; fields: Field[] };

const props = defineProps<{
    groups: Record<string, Group>;
}>();

const activeTab = ref(Object.keys(props.groups)[0]);

const initial: Record<string, unknown> = {};
for (const group of Object.values(props.groups)) {
    for (const field of group.fields) {
        initial[field.key] = field.type === 'image' ? null : field.value;
    }
}

const form = useForm(initial);

function onFile(e: Event, key: string) {
    const target = e.target as HTMLInputElement;
    form[key] = target.files?.[0] ?? null;
}

function submit() {
    form.post('/admin/settings');
}
</script>

<template>
    <AdminLayout>
        <p class="eyebrow">Site</p>
        <h1 class="mt-2 mb-6 text-2xl font-bold">Configurações do Site</h1>

        <div class="border-border mb-4 flex flex-wrap gap-1 border-b">
            <button
                v-for="(group, key) in groups"
                :key="key"
                type="button"
                class="px-4 py-2 text-sm transition-colors"
                :class="
                    activeTab === key
                        ? 'border-olive text-foreground border-b-2 font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                "
                @click="activeTab = key"
            >
                {{ group.label }}
            </button>
        </div>

        <form
            class="border-border bg-card max-w-2xl space-y-5 rounded-2xl border p-6"
            @submit.prevent="submit"
        >
            <template v-for="(group, key) in groups" :key="key">
                <div v-show="activeTab === key" class="space-y-5">
                    <div v-for="field in group.fields" :key="field.key">
                        <label
                            class="text-muted-foreground mb-1.5 block text-sm"
                        >
                            {{ field.label }}
                        </label>

                        <textarea
                            v-if="field.type === 'textarea'"
                            v-model="form[field.key]"
                            rows="5"
                            class="border-border focus:border-olive w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm focus:outline-none"
                        />

                        <div v-else-if="field.type === 'image'">
                            <img
                                v-if="field.value"
                                :src="`/storage/${field.value}`"
                                class="mb-2 h-16 rounded-lg object-cover"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                class="text-muted-foreground w-full text-sm"
                                @change="onFile($event, field.key)"
                            />
                        </div>

                        <input
                            v-else
                            v-model="form[field.key]"
                            type="text"
                            class="border-border focus:border-olive w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm focus:outline-none"
                        />
                    </div>
                </div>
            </template>

            <div class="pt-2">
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="bg-inverse text-inverse-foreground rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    Salvar Configurações
                </button>
            </div>
        </form>
    </AdminLayout>
</template>
