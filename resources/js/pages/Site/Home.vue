<script setup lang="ts">
/*
 * Home como o curso de um regato:
 * Nascente → Correnteza → Afluentes → Percurso → Margens → Ecos → Foz.
 * O <StreamCourse> do layout desenha a água ligando as âncoras [data-stream].
 */
import CtaFinal from '@/components/site/CtaFinal.vue';
import Icon from '@/components/site/Icon.vue';
import Landscape from '@/components/site/Landscape.vue';
import Percurso from '@/components/site/Percurso.vue';
import ProjectBanks from '@/components/site/ProjectBanks.vue';
import SplitText from '@/components/site/SplitText.vue';
import Tributaries from '@/components/site/Tributaries.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { vProgress, vReveal } from '@/lib/scroll';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps<{
    settings: Record<string, string | null>;
    services: { id: number; title: string; description: string | null }[];
    steps: { id: number; title: string; description: string | null }[];
    testimonials: {
        id: number;
        author_name: string;
        author_role: string | null;
        content: string;
    }[];
    projects: {
        id: number;
        title: string;
        slug: string;
        category: string | null;
        summary: string | null;
        cover_image: string | null;
    }[];
}>();

const heroTitle = computed(
    () => props.settings.hero_title ?? 'Ideias que ganham movimento',
);

const manifesto = (
    'Todo *regato* começa pequeno. Uma ideia, uma conversa, um primeiro traço. ' +
    'Com direção, ganha força, contorna as pedras e abre o próprio *caminho.* ' +
    'É isso que fazemos com *marcas.*'
)
    .split(' ')
    .map((word) => ({
        text: word.replaceAll('*', ''),
        accent: word.startsWith('*'),
    }));

const pad = (n: number) => String(n).padStart(2, '0');

const echoDepth = [0, -80, -160];
</script>

<template>
    <SiteLayout :settings="settings">
        <div class="relative">
            <!-- Nascente ------------------------------------------------ -->
            <section
                v-progress="'exit'"
                class="relative flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden"
            >
                <!-- Foto enviada no admin, ou a paisagem ilustrada. -->
                <template v-if="settings.hero_image">
                    <img
                        :src="`/storage/${settings.hero_image}`"
                        alt=""
                        fetchpriority="high"
                        class="absolute inset-0 -z-10 h-full w-full object-cover"
                    />
                    <div
                        class="from-background via-background/70 to-background/20 absolute inset-0 -z-10 bg-gradient-to-t"
                        aria-hidden="true"
                    />
                    <div
                        class="from-background/85 absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
                        aria-hidden="true"
                    />
                    <span
                        data-stream
                        data-stream-keep
                        class="absolute bottom-[12%] left-3/4 h-px w-px"
                        aria-hidden="true"
                    />
                </template>
                <template v-else>
                    <Landscape />
                    <!-- Véu claro atrás do texto: legibilidade sobre a paisagem. -->
                    <div
                        class="from-background via-background/70 lg:via-background/50 absolute inset-0 -z-10 bg-gradient-to-b to-transparent lg:bg-gradient-to-r"
                        aria-hidden="true"
                    />
                </template>

                <div
                    class="relative mx-auto w-full max-w-7xl pt-16 pr-6 pb-40 pl-9 lg:px-8 lg:pt-20"
                >
                    <div class="hero-copy max-w-3xl">
                        <p class="eyebrow rise-in">
                            Estúdio de criação digital
                        </p>
                        <SplitText
                            as="h1"
                            :text="heroTitle"
                            :delay="120"
                            class="mt-6 block text-[clamp(2.9rem,7.2vw,6.75rem)] leading-[0.94] font-bold tracking-[-0.045em] text-balance"
                        />
                        <p
                            v-if="settings.hero_subtitle"
                            class="rise-in text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed"
                            style="--delay: 520ms"
                        >
                            {{ settings.hero_subtitle }}
                        </p>
                        <div
                            class="rise-in mt-10 flex flex-wrap gap-3"
                            style="--delay: 660ms"
                        >
                            <Link
                                :href="settings.hero_cta_url ?? '/contato'"
                                class="group bg-inverse text-inverse-foreground inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
                            >
                                {{
                                    settings.hero_cta_text ??
                                    'Começar um projeto'
                                }}
                                <Icon
                                    name="arrow-right"
                                    class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                            <Link
                                href="/portfolio"
                                class="border-border hover:border-water/50 bg-background/60 hover:bg-secondary inline-flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-medium backdrop-blur-sm transition-colors"
                            >
                                Ver portfólio
                            </Link>
                        </div>
                    </div>
                </div>

                <a
                    href="#correnteza"
                    class="group text-muted-foreground hover:text-foreground absolute bottom-8 hidden items-center gap-4 text-xs tracking-[0.22em] uppercase transition-colors lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:flex"
                >
                    <span class="bg-border relative h-12 w-px overflow-hidden">
                        <span
                            class="scroll-cue-line bg-water absolute inset-0"
                        />
                    </span>
                    Siga o curso
                </a>
            </section>

            <!-- Correnteza --------------------------------------------- -->
            <section
                id="correnteza"
                v-progress="'pin'"
                class="pin-scene relative z-10"
                style="--pin-height: 250vh"
            >
                <span
                    data-stream
                    class="stream-gutter-right absolute top-[6%] h-px w-px"
                    aria-hidden="true"
                />
                <span
                    data-stream
                    class="stream-gutter-right absolute bottom-[4%] h-px w-px"
                    aria-hidden="true"
                />
                <div class="pin-stage flex items-center">
                    <div
                        class="mx-auto w-full max-w-7xl py-24 pr-6 pl-9 lg:px-8 lg:pl-[8%]"
                    >
                        <p class="eyebrow">Correnteza</p>
                        <p
                            class="font-display mt-8 max-w-5xl text-[clamp(1.9rem,4.6vw,4.4rem)] leading-[1.08] font-bold tracking-[-0.03em]"
                            :style="{ '--n': manifesto.length }"
                        >
                            <template v-for="(word, i) in manifesto" :key="i">
                                <span
                                    class="manifesto-word"
                                    :class="{ 'text-water': word.accent }"
                                    :style="{ '--i': i }"
                                    >{{ word.text }}</span
                                >{{ ' ' }}
                            </template>
                        </p>
                    </div>
                </div>
            </section>

            <!-- Afluentes ----------------------------------------------- -->
            <section
                v-if="services.length"
                class="relative z-10 py-24 lg:py-36"
            >
                <span
                    data-stream
                    class="stream-gutter-right absolute top-[45%] h-px w-px"
                    aria-hidden="true"
                />
                <div class="mx-auto max-w-7xl pr-6 pl-9 lg:px-8">
                    <div class="grid items-end gap-6 lg:grid-cols-12">
                        <div class="lg:col-span-7">
                            <p v-reveal class="eyebrow">Afluentes</p>
                            <h2
                                v-reveal="80"
                                class="mt-4 text-4xl leading-[1.02] font-bold text-balance sm:text-5xl lg:text-6xl"
                            >
                                Três frentes, uma mesma direção
                            </h2>
                        </div>
                        <p
                            v-reveal="160"
                            class="text-muted-foreground text-lg lg:col-span-5 lg:pb-2"
                        >
                            Marca, site e design do dia a dia. Cada frente pode
                            correr sozinha, mas todas desembocam no mesmo lugar:
                            um negócio que se explica bem.
                        </p>
                    </div>

                    <div class="mt-16 grid gap-5 lg:grid-cols-3">
                        <div
                            v-for="(service, i) in services"
                            :key="service.id"
                            v-reveal="i * 120"
                            class="flex"
                        >
                            <Link
                                href="/servicos"
                                class="group border-border bg-card hover:border-water/40 relative flex min-h-[20rem] w-full flex-col rounded-3xl border p-8 transition-[border-color,transform] duration-500 hover:-translate-y-1 lg:p-10"
                            >
                                <span
                                    class="font-display group-hover:text-water/15 text-6xl font-extrabold tracking-[-0.05em] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--olive)]"
                                    aria-hidden="true"
                                    >{{ pad(i + 1) }}</span
                                >
                                <h3
                                    class="mt-auto pt-10 text-2xl font-semibold"
                                >
                                    {{ service.title }}
                                </h3>
                                <p
                                    class="text-muted-foreground mt-3 text-sm leading-relaxed"
                                >
                                    {{ service.description }}
                                </p>
                                <span
                                    class="text-water mt-6 inline-flex items-center gap-2 text-sm font-medium"
                                >
                                    Saber mais
                                    <Icon
                                        name="arrow-right"
                                        class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </span>
                            </Link>
                        </div>
                    </div>

                    <!-- As três frentes desaguando na mesma correnteza. -->
                    <Tributaries
                        v-if="services.length === 3"
                        class="hidden lg:block"
                    />
                </div>
            </section>

            <!-- Percurso ------------------------------------------------ -->
            <Percurso v-if="steps.length" :steps="steps" />

            <!-- Margens ------------------------------------------------- -->
            <section
                v-if="projects.length"
                class="relative z-10 py-24 lg:py-36"
            >
                <div class="mx-auto max-w-7xl pr-6 pl-9 lg:px-8">
                    <div class="flex flex-wrap items-end justify-between gap-6">
                        <div class="max-w-2xl">
                            <p v-reveal class="eyebrow">Margens</p>
                            <h2
                                v-reveal="80"
                                class="mt-4 text-4xl leading-[1.02] font-bold text-balance sm:text-5xl lg:text-6xl"
                            >
                                Por onde o regato já passou
                            </h2>
                        </div>
                        <Link
                            v-reveal="160"
                            href="/portfolio"
                            class="group text-water inline-flex items-center gap-2 text-sm font-medium"
                        >
                            Ver todos os projetos
                            <Icon
                                name="arrow-right"
                                class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>

                    <ProjectBanks :projects="projects" class="mt-20 lg:mt-28" />
                </div>
            </section>

            <!-- Ecos ---------------------------------------------------- -->
            <section
                v-if="testimonials.length"
                class="relative z-10 py-24 lg:py-36"
            >
                <span
                    data-stream
                    class="stream-gutter-right absolute top-28 h-px w-px"
                    aria-hidden="true"
                />
                <div class="mx-auto max-w-7xl pr-6 pl-9 lg:px-8">
                    <div class="max-w-2xl">
                        <p v-reveal class="eyebrow">Ecos</p>
                        <h2
                            v-reveal="80"
                            class="mt-4 text-4xl leading-[1.02] font-bold text-balance sm:text-5xl lg:text-6xl"
                        >
                            O que fica depois que o projeto passa
                        </h2>
                    </div>

                    <div class="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-3">
                        <figure
                            v-for="(testimonial, i) in testimonials"
                            :key="testimonial.id"
                            v-progress
                            class="lg:drift"
                            :style="{ '--depth': echoDepth[i % 3] }"
                        >
                            <div
                                v-reveal="i * 120"
                                class="border-border bg-card flex h-full flex-col rounded-3xl border p-8 lg:p-10"
                            >
                                <svg
                                    viewBox="0 0 32 24"
                                    class="text-water h-6 w-8"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M0 24V14C0 6 4.5 1.3 12 0l1.4 3.2C9 4.6 7 7.4 6.8 11H12v13H0Zm19 0V14c0-8 4.5-12.7 12-14l1 3.2C27.7 4.6 26 7.4 25.8 11H31v13H19Z"
                                    />
                                </svg>
                                <blockquote
                                    class="text-foreground/90 mt-6 mb-8 text-lg leading-relaxed"
                                >
                                    {{ testimonial.content }}
                                </blockquote>
                                <figcaption
                                    class="border-border text-muted-foreground mt-auto border-t pt-6 text-sm"
                                >
                                    <span
                                        class="text-foreground block font-medium"
                                        >{{ testimonial.author_name }}</span
                                    >
                                    {{ testimonial.author_role }}
                                </figcaption>
                            </div>
                        </figure>
                    </div>
                </div>
            </section>

            <!-- Foz ----------------------------------------------------- -->
            <CtaFinal />
        </div>
    </SiteLayout>
</template>
