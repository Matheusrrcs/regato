<script setup lang="ts">
import Icon from '@/components/site/Icon.vue';
import Logo from '@/components/site/Logo.vue';
import StreamCourse from '@/components/site/StreamCourse.vue';
import { motionEnabled, subscribe } from '@/lib/scroll';
import { Link, usePage } from '@inertiajs/vue3';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps<{
    settings: Record<string, string | null>;
}>();

const menuAberto = ref(false);
const page = usePage();
const header = ref<HTMLElement | null>(null);

const isActive = (href: string) =>
    href === '/' ? page.url === '/' : page.url.startsWith(href);

// Nível da água: quanto da página já foi percorrido.
let unsubscribe: (() => void) | null = null;
let level = 0;

onMounted(() => {
    if (!motionEnabled()) return;

    unsubscribe = subscribe({
        read() {
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            level = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        },
        write() {
            header.value?.style.setProperty('--level', level.toFixed(4));
        },
    });
});

onBeforeUnmount(() => unsubscribe?.());

const navegacao = [
    { href: '/', label: 'Início' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/portfolio', label: 'Portfólio' },
    { href: '/planos', label: 'Planos' },
    { href: '/processo', label: 'Processo' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contato', label: 'Contato' },
];
</script>

<template>
    <div class="bg-background text-foreground flex min-h-screen flex-col">
        <a
            href="#conteudo"
            class="bg-inverse text-inverse-foreground fixed top-3 left-3 z-[60] -translate-y-20 rounded-full px-5 py-2.5 text-sm font-medium focus:translate-y-0"
        >
            Pular para o conteúdo
        </a>

        <header
            ref="header"
            class="border-border/60 bg-background/85 sticky top-0 z-50 border-b backdrop-blur-md"
        >
            <span
                class="header-level bg-water absolute inset-x-0 -bottom-px h-px"
                aria-hidden="true"
            />
            <div
                class="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
            >
                <Link
                    href="/"
                    class="text-foreground"
                    aria-label="Página inicial"
                >
                    <Logo :name="settings.site_name ?? 'regato'" />
                </Link>

                <nav
                    class="hidden items-center gap-7 lg:flex"
                    aria-label="Principal"
                >
                    <Link
                        v-for="item in navegacao.slice(1, -1)"
                        :key="item.href"
                        :href="item.href"
                        class="after:bg-water hover:text-foreground relative text-sm transition-colors after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                        :class="
                            isActive(item.href)
                                ? 'text-foreground after:scale-x-100'
                                : 'text-muted-foreground'
                        "
                        :aria-current="isActive(item.href) ? 'page' : undefined"
                    >
                        {{ item.label }}
                    </Link>
                    <Link
                        href="/contato"
                        class="bg-inverse text-inverse-foreground rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
                    >
                        Começar um projeto
                    </Link>
                </nav>

                <button
                    type="button"
                    class="-mr-2 p-2 lg:hidden"
                    :aria-label="menuAberto ? 'Fechar menu' : 'Abrir menu'"
                    :aria-expanded="menuAberto"
                    aria-controls="menu-mobile"
                    @click="menuAberto = !menuAberto"
                >
                    <Icon :name="menuAberto ? 'x' : 'menu'" class="h-6 w-6" />
                </button>
            </div>

            <nav
                v-if="menuAberto"
                id="menu-mobile"
                aria-label="Principal"
                class="border-border/60 bg-background border-t px-5 pb-6 lg:hidden"
            >
                <Link
                    v-for="item in navegacao"
                    :key="item.href"
                    :href="item.href"
                    class="border-border/40 block border-b py-3.5 text-base"
                    :class="
                        isActive(item.href)
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                    "
                    :aria-current="isActive(item.href) ? 'page' : undefined"
                    @click="menuAberto = false"
                >
                    {{ item.label }}
                </Link>
            </nav>
        </header>

        <main
            id="conteudo"
            class="relative isolate flex-1 overflow-x-clip focus:outline-none"
            tabindex="-1"
        >
            <!-- O regato corre por todas as páginas, entre as âncoras [data-stream]. -->
            <StreamCourse />
            <slot />
        </main>

        <footer
            class="border-border/60 bg-background relative overflow-hidden border-t"
        >
            <div class="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
                <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div class="lg:col-span-1">
                        <Logo :name="settings.site_name ?? 'regato'" />
                        <p class="text-muted-foreground mt-4 max-w-xs text-sm">
                            {{ settings.tagline }}
                        </p>
                        <p class="eyebrow mt-6">
                            Ideias · Movimento · Presença
                        </p>
                    </div>

                    <div>
                        <h2 class="font-display text-sm font-semibold">
                            Navegação
                        </h2>
                        <ul
                            class="text-muted-foreground mt-4 space-y-2.5 text-sm"
                        >
                            <li>
                                <Link
                                    href="/servicos"
                                    class="hover:text-foreground"
                                    >Serviços</Link
                                >
                            </li>
                            <li>
                                <Link
                                    href="/planos"
                                    class="hover:text-foreground"
                                    >Planos e preços</Link
                                >
                            </li>
                            <li>
                                <Link
                                    href="/portfolio"
                                    class="hover:text-foreground"
                                    >Portfólio</Link
                                >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 class="font-display text-sm font-semibold">
                            Estúdio
                        </h2>
                        <ul
                            class="text-muted-foreground mt-4 space-y-2.5 text-sm"
                        >
                            <li>
                                <Link
                                    href="/sobre"
                                    class="hover:text-foreground"
                                    >Sobre nós</Link
                                >
                            </li>
                            <li>
                                <Link
                                    href="/processo"
                                    class="hover:text-foreground"
                                    >Processo</Link
                                >
                            </li>
                            <li>
                                <Link href="/faq" class="hover:text-foreground"
                                    >Perguntas frequentes</Link
                                >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 class="font-display text-sm font-semibold">
                            Contato
                        </h2>
                        <ul
                            class="text-muted-foreground mt-4 space-y-3 text-sm"
                        >
                            <li
                                v-if="settings.contact_email"
                                class="flex items-start gap-2.5"
                            >
                                <Icon
                                    name="mail"
                                    class="text-olive mt-0.5 h-4 w-4 shrink-0"
                                />
                                <a
                                    :href="`mailto:${settings.contact_email}`"
                                    class="hover:text-foreground"
                                    >{{ settings.contact_email }}</a
                                >
                            </li>
                            <li
                                v-if="settings.contact_phone"
                                class="flex items-start gap-2.5"
                            >
                                <Icon
                                    name="phone"
                                    class="text-olive mt-0.5 h-4 w-4 shrink-0"
                                />
                                <a
                                    :href="`https://wa.me/${settings.contact_whatsapp}`"
                                    class="hover:text-foreground"
                                    >{{ settings.contact_phone }}</a
                                >
                            </li>
                            <li
                                v-if="settings.contact_address"
                                class="flex items-start gap-2.5"
                            >
                                <Icon
                                    name="pin"
                                    class="text-olive mt-0.5 h-4 w-4 shrink-0"
                                />
                                <span>{{ settings.contact_address }}</span>
                            </li>
                        </ul>
                        <div
                            class="text-muted-foreground mt-5 flex gap-4 text-sm"
                        >
                            <a
                                v-if="settings.social_instagram"
                                :href="settings.social_instagram"
                                class="hover:text-foreground"
                                >Instagram</a
                            >
                            <a
                                v-if="settings.social_linkedin"
                                :href="settings.social_linkedin"
                                class="hover:text-foreground"
                                >LinkedIn</a
                            >
                            <a
                                v-if="settings.social_behance"
                                :href="settings.social_behance"
                                class="hover:text-foreground"
                                >Behance</a
                            >
                        </div>
                    </div>
                </div>

                <div
                    class="border-border/60 text-muted-foreground mt-14 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
                >
                    <p>
                        &copy; {{ new Date().getFullYear() }}
                        {{ settings.site_name ?? 'Regato' }}. Todos os direitos
                        reservados.
                    </p>
                    <div class="flex gap-5">
                        <Link href="/privacidade" class="hover:text-foreground"
                            >Política de Privacidade</Link
                        >
                        <Link href="/termos" class="hover:text-foreground"
                            >Termos de Uso</Link
                        >
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
