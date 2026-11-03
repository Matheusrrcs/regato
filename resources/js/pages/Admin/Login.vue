<script setup lang="ts">
import Curves from '@/components/site/Curves.vue';
import Logo from '@/components/site/Logo.vue';
import { useForm } from '@inertiajs/vue3';

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

function submit() {
    form.post('/admin/login');
}
</script>

<template>
    <div
        class="bg-background text-foreground relative flex min-h-screen items-center justify-center overflow-hidden px-5"
    >
        <Curves
            class="text-olive/10 absolute -top-40 -left-40 h-[620px] w-[620px]"
        />
        <Curves
            class="text-olive/10 absolute -right-40 -bottom-40 h-[520px] w-[520px]"
        />

        <form
            class="rise-in border-border bg-card relative w-full max-w-sm rounded-2xl border p-8"
            @submit.prevent="submit"
        >
            <Logo class="mx-auto" />
            <p class="eyebrow mt-6 text-center">Painel administrativo</p>
            <h1 class="mt-2 text-center text-xl font-semibold">
                Entrar na sua conta
            </h1>

            <div class="mt-8 space-y-4">
                <div>
                    <label class="text-muted-foreground mb-1.5 block text-sm"
                        >E-mail</label
                    >
                    <input
                        v-model="form.email"
                        type="email"
                        autofocus
                        class="border-border placeholder:text-muted-foreground focus:border-olive w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm focus:outline-none"
                    />
                    <p
                        v-if="form.errors.email"
                        class="text-destructive mt-1.5 text-sm"
                    >
                        {{ form.errors.email }}
                    </p>
                </div>

                <div>
                    <label class="text-muted-foreground mb-1.5 block text-sm"
                        >Senha</label
                    >
                    <input
                        v-model="form.password"
                        type="password"
                        class="border-border placeholder:text-muted-foreground focus:border-olive w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm focus:outline-none"
                    />
                </div>

                <label
                    class="text-muted-foreground flex items-center gap-2 text-sm"
                >
                    <input
                        v-model="form.remember"
                        type="checkbox"
                        class="border-border rounded"
                    />
                    Manter conectado
                </label>

                <button
                    type="submit"
                    :disabled="form.processing"
                    class="bg-inverse text-inverse-foreground mt-2 w-full rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    Entrar
                </button>
            </div>
        </form>
    </div>
</template>
