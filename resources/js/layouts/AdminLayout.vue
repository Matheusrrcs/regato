<script setup lang="ts">
import Logo from '@/components/site/Logo.vue';
import { Link, router, usePage } from '@inertiajs/vue3';

const page = usePage();

const nav = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Serviços', href: '/admin/services' },
    { label: 'Planos', href: '/admin/plans' },
    { label: 'Portfólio', href: '/admin/portfolio' },
    { label: 'Depoimentos', href: '/admin/testimonials' },
    { label: 'FAQ', href: '/admin/faqs' },
    { label: 'Equipe', href: '/admin/team' },
    { label: 'Processo', href: '/admin/process' },
    { label: 'Mensagens', href: '/admin/messages' },
    { label: 'Configurações do Site', href: '/admin/settings' },
];

function isActive(href: string) {
    const current = page.url.split('?')[0];

    return href === '/admin' ? current === '/admin' : current.startsWith(href);
}

function logout() {
    router.post('/logout');
}
</script>

<template>
    <div class="bg-background text-foreground flex min-h-screen">
        <aside
            class="border-border bg-card flex w-64 shrink-0 flex-col border-r"
        >
            <div class="border-border border-b px-6 py-5">
                <Logo />
            </div>
            <nav class="flex-1 space-y-1 px-3 py-4">
                <Link
                    v-for="item in nav"
                    :key="item.href"
                    :href="item.href"
                    class="block rounded-xl px-3 py-2 text-sm transition-colors"
                    :class="
                        isActive(item.href)
                            ? 'bg-secondary text-foreground'
                            : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                    "
                >
                    {{ item.label }}
                </Link>
            </nav>
            <div class="border-border border-t p-3">
                <div class="text-muted-foreground px-3 pb-2 text-xs">
                    {{ page.props.auth?.user?.name }}
                </div>
                <button
                    class="text-muted-foreground hover:bg-secondary/60 hover:text-foreground w-full rounded-xl px-3 py-2 text-left text-sm transition-colors"
                    @click="logout"
                >
                    Sair
                </button>
            </div>
        </aside>
        <main class="flex-1 overflow-x-hidden p-8">
            <div
                v-if="page.props.flash?.success"
                class="border-olive/30 bg-olive/10 text-foreground mb-6 rounded-xl border px-4 py-3 text-sm"
            >
                {{ page.props.flash.success }}
            </div>
            <slot />
        </main>
    </div>
</template>
