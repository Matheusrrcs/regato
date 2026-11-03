<script setup lang="ts">
import Icon from '@/components/site/Icon.vue';
import PageHeader from '@/components/site/PageHeader.vue';
import Section from '@/components/site/Section.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { vReveal } from '@/lib/scroll';
import { useForm, usePage } from '@inertiajs/vue3';

defineProps<{
    settings: Record<string, string | null>;
}>();

const page = usePage();

const form = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
});

function submit() {
    form.post('/contato', {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <SiteLayout :settings="settings">
        <PageHeader
            eyebrow="Contato"
            titulo="Vamos conversar sobre o seu projeto"
            descricao="Conte o que você precisa. Respondemos em até 1 dia útil com os próximos passos, prazo e faixa de investimento."
        />

        <Section>
            <div class="grid gap-14 lg:grid-cols-2">
                <form v-reveal class="space-y-4" @submit.prevent="submit">
                    <div
                        v-if="page.props.flash?.success"
                        class="bg-inverse text-inverse-foreground rounded-xl px-4 py-3 text-sm"
                    >
                        {{ page.props.flash.success }}
                    </div>

                    <input
                        v-model="form.name"
                        type="text"
                        placeholder="Nome"
                        class="border-border placeholder:text-muted-foreground focus:border-olive w-full rounded-xl border bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                    <input
                        v-model="form.email"
                        type="email"
                        placeholder="E-mail"
                        class="border-border placeholder:text-muted-foreground focus:border-olive w-full rounded-xl border bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                    <input
                        v-model="form.phone"
                        type="text"
                        placeholder="Telefone / WhatsApp"
                        class="border-border placeholder:text-muted-foreground focus:border-olive w-full rounded-xl border bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                    <input
                        v-model="form.subject"
                        type="text"
                        placeholder="Assunto"
                        class="border-border placeholder:text-muted-foreground focus:border-olive w-full rounded-xl border bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                    <textarea
                        v-model="form.message"
                        rows="5"
                        placeholder="Conte um pouco sobre o seu projeto"
                        class="border-border placeholder:text-muted-foreground focus:border-olive w-full rounded-xl border bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="bg-inverse text-inverse-foreground inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
                    >
                        Enviar mensagem
                        <Icon name="arrow-right" class="h-4 w-4" />
                    </button>
                </form>

                <div
                    v-reveal="160"
                    class="text-muted-foreground space-y-5 text-sm"
                >
                    <div
                        v-if="settings.contact_email"
                        class="flex items-start gap-2.5"
                    >
                        <Icon
                            name="mail"
                            class="text-olive mt-0.5 h-4 w-4 shrink-0"
                        />
                        {{ settings.contact_email }}
                    </div>
                    <div
                        v-if="settings.contact_phone"
                        class="flex items-start gap-2.5"
                    >
                        <Icon
                            name="phone"
                            class="text-olive mt-0.5 h-4 w-4 shrink-0"
                        />
                        {{ settings.contact_phone }}
                    </div>
                    <div
                        v-if="settings.contact_address"
                        class="flex items-start gap-2.5"
                    >
                        <Icon
                            name="pin"
                            class="text-olive mt-0.5 h-4 w-4 shrink-0"
                        />
                        {{ settings.contact_address }}
                    </div>
                </div>
            </div>
        </Section>
    </SiteLayout>
</template>
