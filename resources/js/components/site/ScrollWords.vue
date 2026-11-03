<script setup lang="ts">
/*
 * Texto que "acende" palavra por palavra conforme a correnteza (linha TIP)
 * passa por ele. Mantém parágrafos. Sem JS/movimento, aparece inteiro.
 */
import { vProgress } from '@/lib/scroll';
import { computed } from 'vue';

const props = defineProps<{ text: string }>();

const paragraphs = computed(() => {
    let index = 0;

    return props.text
        .split(/\n\s*\n|\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) =>
            paragraph.split(/\s+/).map((word) => ({ word, i: index++ })),
        );
});

const total = computed(() =>
    paragraphs.value.reduce((sum, words) => sum + words.length, 0),
);
</script>

<template>
    <div v-progress="'tip'" :style="{ '--n': total }">
        <p v-for="(words, p) in paragraphs" :key="p" class="[&+&]:mt-[0.8em]">
            <template v-for="item in words" :key="item.i">
                <span class="manifesto-word" :style="{ '--i': item.i }">{{
                    item.word
                }}</span
                >{{ ' ' }}
            </template>
        </p>
    </div>
</template>
