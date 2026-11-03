<script setup lang="ts">
/*
 * Cabeçalho das páginas internas: a paisagem da nascente ao fundo, de onde
 * sai o regato da página (desenhado pelo <StreamCourse> do layout).
 */
import { vProgress } from '@/lib/scroll';
import Landscape from './Landscape.vue';
import SplitText from './SplitText.vue';

defineProps<{
    eyebrow: string;
    titulo: string;
    descricao?: string;
}>();
</script>

<template>
    <section
        v-progress="'exit'"
        class="border-border/60 relative overflow-hidden border-b"
    >
        <!-- Paisagem: o regato da página nasce no poço da queda d'água. -->
        <Landscape quiet />
        <!-- Véu claro atrás do texto: legibilidade sobre a paisagem. -->
        <div
            class="from-background via-background/75 lg:via-background/60 absolute inset-0 -z-10 bg-gradient-to-b to-transparent lg:bg-gradient-to-r"
            aria-hidden="true"
        />

        <div
            class="hero-copy relative mx-auto max-w-7xl pt-20 pr-6 pb-40 pl-9 lg:px-8 lg:pt-28 lg:pb-56"
        >
            <p class="eyebrow rise-in">{{ eyebrow }}</p>
            <SplitText
                as="h1"
                :text="titulo"
                :delay="80"
                class="mt-5 block max-w-3xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] font-bold tracking-[-0.04em] text-balance"
            />
            <p
                v-if="descricao"
                class="rise-in text-muted-foreground mt-7 max-w-2xl text-lg leading-relaxed"
                style="--delay: 380ms"
            >
                {{ descricao }}
            </p>
        </div>
    </section>
</template>
