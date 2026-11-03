<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        text: string;
        as?: string;
        /** Atraso inicial em ms antes da primeira palavra subir. */
        delay?: number;
    }>(),
    { as: 'span', delay: 0 },
);

const words = computed(() => props.text.trim().split(/\s+/));
</script>

<template>
    <component :is="as" :aria-label="text">
        <template v-for="(word, i) in words" :key="i">
            <span class="split-mask" aria-hidden="true"
                ><span
                    class="split-word"
                    :style="{ '--i': i, '--delay': `${delay}ms` }"
                    >{{ word }}</span
                ></span
            >{{ i < words.length - 1 ? ' ' : '' }}
        </template>
    </component>
</template>
