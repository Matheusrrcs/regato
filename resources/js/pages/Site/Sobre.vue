<script setup lang="ts">
import CtaFinal from '@/components/site/CtaFinal.vue';
import PageHeader from '@/components/site/PageHeader.vue';
import ScrollWords from '@/components/site/ScrollWords.vue';
import Section from '@/components/site/Section.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { vProgress, vReveal } from '@/lib/scroll';

defineProps<{
    settings: Record<string, string | null>;
    team: {
        id: number;
        name: string;
        role: string | null;
        photo: string | null;
        bio: string | null;
    }[];
}>();

const teamDepth = [0, -70, -20, -90];
</script>

<template>
    <SiteLayout :settings="settings">
        <PageHeader
            eyebrow="O estúdio"
            :titulo="settings.about_title ?? 'Sobre nós'"
        />

        <Section v-if="settings.about_content">
            <div class="grid gap-8 lg:grid-cols-12">
                <p v-reveal class="eyebrow lg:col-span-3 lg:pt-3">Quem somos</p>
                <ScrollWords
                    :text="settings.about_content"
                    class="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.15] font-bold tracking-[-0.02em] lg:col-span-9"
                />
            </div>
        </Section>

        <section class="relative">
            <div class="mx-auto max-w-7xl pr-5 pl-9 lg:px-8">
                <div
                    v-reveal:mask
                    v-progress
                    class="relative aspect-[16/9] overflow-hidden rounded-[2rem]"
                >
                    <img
                        v-if="settings.about_image"
                        :src="`/storage/${settings.about_image}`"
                        alt=""
                        loading="lazy"
                        class="parallax-img h-full w-full object-cover"
                    />
                    <div
                        v-else
                        class="parallax-img from-moss via-secondary to-background absolute inset-0 bg-gradient-to-br"
                    />
                </div>
            </div>
        </section>

        <Section v-if="team.length">
            <div class="max-w-2xl">
                <p v-reveal class="eyebrow">Equipe</p>
                <h2
                    v-reveal="80"
                    class="mt-4 text-4xl leading-[1.02] font-bold text-balance sm:text-5xl"
                >
                    Quem conduz o curso
                </h2>
            </div>
            <div
                class="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
            >
                <div
                    v-for="(member, i) in team"
                    :key="member.id"
                    v-progress
                    class="lg:drift"
                    :style="{ '--depth': teamDepth[i % 4] }"
                >
                    <div v-reveal="(i % 4) * 100">
                        <div
                            class="bg-card relative mb-5 aspect-[4/5] overflow-hidden rounded-[1.5rem]"
                        >
                            <img
                                v-if="member.photo"
                                :src="`/storage/${member.photo}`"
                                :alt="member.name"
                                loading="lazy"
                                class="h-full w-full object-cover"
                            />
                            <span
                                v-else
                                class="font-display text-foreground/15 absolute inset-0 flex items-center justify-center text-6xl font-extrabold"
                                aria-hidden="true"
                            >
                                {{ member.name.slice(0, 2).toUpperCase() }}
                            </span>
                        </div>
                        <h3 class="text-lg font-semibold">{{ member.name }}</h3>
                        <p class="text-water text-sm">{{ member.role }}</p>
                        <p
                            class="text-muted-foreground mt-3 text-sm leading-relaxed"
                        >
                            {{ member.bio }}
                        </p>
                    </div>
                </div>
            </div>
        </Section>

        <CtaFinal />
    </SiteLayout>
</template>
