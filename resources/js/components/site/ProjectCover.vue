<script setup lang="ts">
/*
 * Capa de projeto com parallax (usa o --p do ancestral). Sem imagem, mostra
 * uma composição com a inicial do projeto em vez de um bloco vazio.
 */
import Curves from './Curves.vue';

const props = withDefaults(
    defineProps<{
        title: string;
        image?: string | null;
        index?: number;
        eager?: boolean;
    }>(),
    { image: null, index: 0, eager: false },
);

const hues = [160, 118, 190];
const hue = hues[props.index % hues.length];
const background = `radial-gradient(120% 95% at 18% 8%, oklch(0.93 0.035 ${hue}), oklch(0.84 0.05 ${hue}) 60%, oklch(0.76 0.055 ${hue}))`;
</script>

<template>
    <img
        v-if="image"
        :src="`/storage/${image}`"
        :alt="title"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        width="1200"
        height="900"
        class="parallax-img h-full w-full object-cover"
    />
    <div v-else class="parallax-img absolute inset-0" :style="{ background }">
        <Curves
            class="absolute -right-1/4 -bottom-1/3 h-[140%] text-white/40"
        />
        <span
            class="font-display text-foreground/10 absolute bottom-[8%] left-[7%] text-[clamp(6rem,14vw,11rem)] leading-none font-extrabold tracking-[-0.06em]"
            aria-hidden="true"
            >{{ title.charAt(0) }}</span
        >
    </div>
</template>
