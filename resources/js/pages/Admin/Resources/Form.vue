<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { computed, onBeforeUnmount, reactive } from 'vue';

type Field = {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'checkbox' | 'image' | 'gallery';
    required?: boolean;
    help?: string;
};

const props = defineProps<{
    resource: string;
    label: string;
    singular: string;
    fields: Field[];
    item: Record<string, unknown> | null;
}>();

const isEdit = props.item !== null;

const initial: Record<string, unknown> = {};
for (const field of props.fields) {
    if (field.type === 'image') {
        initial[field.name] = null;
        continue;
    }
    if (field.type === 'gallery') {
        const current = props.item?.[field.name];
        initial[`${field.name}_keep`] = Array.isArray(current)
            ? [...current]
            : [];
        initial[`${field.name}_upload`] = [];
        continue;
    }
    initial[field.name] =
        (props.item?.[field.name] as unknown) ??
        (field.type === 'checkbox' ? false : '');
}

const form = useForm(initial as Record<string, never>);
// Campos dinâmicos (vêm da config do recurso): acesso por chave.
const values = form as unknown as Record<string, unknown>;
const texts = values as Record<string, string>;
const errors = computed(
    () => form.errors as Record<string, string | undefined>,
);

function submit() {
    if (isEdit) {
        form.transform((data) => ({ ...data, _method: 'put' })).post(
            `/admin/${props.resource}/${props.item?.id}`,
        );
    } else {
        form.post(`/admin/${props.resource}`);
    }
}

function onFile(e: Event, field: string) {
    const target = e.target as HTMLInputElement;
    values[field] = target.files?.[0] ?? null;
}

/* Galeria ------------------------------------------------------------ */

// Prévia local dos arquivos novos (object URLs), por campo.
const previews = reactive<Record<string, string[]>>({});

const kept = (name: string) => values[`${name}_keep`] as string[];
const uploads = (name: string) => values[`${name}_upload`] as File[];

function addGalleryFiles(e: Event, name: string) {
    const target = e.target as HTMLInputElement;
    const files = [...(target.files ?? [])];

    values[`${name}_upload`] = [...uploads(name), ...files];
    previews[name] = [
        ...(previews[name] ?? []),
        ...files.map((file) => URL.createObjectURL(file)),
    ];
    target.value = '';
}

function removeKept(name: string, path: string) {
    values[`${name}_keep`] = kept(name).filter((item) => item !== path);
}

function removeUpload(name: string, index: number) {
    URL.revokeObjectURL(previews[name][index]);
    values[`${name}_upload`] = uploads(name).filter((_, i) => i !== index);
    previews[name] = previews[name].filter((_, i) => i !== index);
}

function galleryError(name: string): string | undefined {
    return Object.entries(errors.value).find(([key]) =>
        key.startsWith(`${name}_`),
    )?.[1];
}

onBeforeUnmount(() => {
    Object.values(previews)
        .flat()
        .forEach((url) => URL.revokeObjectURL(url));
});
</script>

<template>
    <AdminLayout>
        <p class="eyebrow">{{ label }}</p>
        <h1 class="mt-2 mb-6 text-2xl font-bold">
            {{ isEdit ? `Editar ${singular}` : `Novo ${singular}` }}
        </h1>

        <form
            class="border-border bg-card max-w-2xl space-y-5 rounded-2xl border p-6"
            @submit.prevent="submit"
        >
            <div v-for="field in fields" :key="field.name">
                <label class="text-muted-foreground mb-1.5 block text-sm">
                    {{ field.label }}
                </label>
                <p
                    v-if="field.help"
                    class="text-muted-foreground/80 mb-2 text-xs"
                >
                    {{ field.help }}
                </p>

                <textarea
                    v-if="field.type === 'textarea'"
                    v-model="texts[field.name]"
                    rows="5"
                    class="border-border focus:border-olive w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm focus:outline-none"
                />

                <label
                    v-else-if="field.type === 'checkbox'"
                    class="text-muted-foreground flex items-center gap-2 text-sm"
                >
                    <input
                        v-model="values[field.name]"
                        type="checkbox"
                        class="border-border rounded"
                    />
                    Sim
                </label>

                <div v-else-if="field.type === 'image'" class="space-y-3">
                    <img
                        v-if="typeof item?.[field.name] === 'string'"
                        :src="`/storage/${item[field.name]}`"
                        alt="Imagem atual"
                        class="border-border max-h-40 rounded-lg border object-contain object-left"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        class="text-muted-foreground w-full text-sm"
                        @change="onFile($event, field.name)"
                    />
                </div>

                <div v-else-if="field.type === 'gallery'" class="space-y-3">
                    <ul
                        v-if="
                            kept(field.name).length ||
                            previews[field.name]?.length
                        "
                        class="grid grid-cols-3 gap-3 sm:grid-cols-4"
                    >
                        <li
                            v-for="path in kept(field.name)"
                            :key="path"
                            class="group relative"
                        >
                            <img
                                :src="`/storage/${path}`"
                                alt=""
                                class="border-border aspect-square w-full rounded-lg border object-cover"
                            />
                            <button
                                type="button"
                                class="bg-background/90 text-destructive absolute top-1.5 right-1.5 rounded-full px-2 py-0.5 text-xs"
                                @click="removeKept(field.name, path)"
                            >
                                Remover
                            </button>
                        </li>
                        <li
                            v-for="(url, index) in previews[field.name] ?? []"
                            :key="url"
                            class="relative"
                        >
                            <img
                                :src="url"
                                alt=""
                                class="border-olive aspect-square w-full rounded-lg border border-dashed object-cover"
                            />
                            <span
                                class="bg-olive text-accent-foreground absolute bottom-1.5 left-1.5 rounded-full px-2 py-0.5 text-[10px]"
                                >nova</span
                            >
                            <button
                                type="button"
                                class="bg-background/90 text-destructive absolute top-1.5 right-1.5 rounded-full px-2 py-0.5 text-xs"
                                @click="removeUpload(field.name, index)"
                            >
                                Remover
                            </button>
                        </li>
                    </ul>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        class="text-muted-foreground w-full text-sm"
                        @change="addGalleryFiles($event, field.name)"
                    />
                    <div
                        v-if="galleryError(field.name)"
                        class="text-destructive text-sm"
                    >
                        {{ galleryError(field.name) }}
                    </div>
                </div>

                <input
                    v-else
                    v-model="values[field.name]"
                    :type="field.type === 'number' ? 'number' : 'text'"
                    class="border-border focus:border-olive w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm focus:outline-none"
                />

                <div
                    v-if="errors[field.name]"
                    class="text-destructive mt-1.5 text-sm"
                >
                    {{ errors[field.name] }}
                </div>
            </div>

            <div class="flex gap-3 pt-2">
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="bg-inverse text-inverse-foreground rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    Salvar
                </button>
                <a
                    :href="`/admin/${resource}`"
                    class="border-border text-muted-foreground hover:bg-secondary rounded-full border px-6 py-2.5 text-sm transition-colors"
                >
                    Cancelar
                </a>
            </div>
        </form>
    </AdminLayout>
</template>
