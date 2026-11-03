<script setup lang="ts">
withDefaults(defineProps<{ class?: string }>(), { class: '' });

const rings = [120, 190, 260, 330, 400];
</script>

<template>
    <svg
        viewBox="0 0 600 600"
        aria-hidden="true"
        :class="`pointer-events-none select-none ${$props.class}`"
        fill="none"
    >
        <circle
            v-for="(r, i) in rings"
            :key="r"
            cx="300"
            cy="300"
            :r="r"
            stroke="currentColor"
            :stroke-width="i % 2 === 0 ? 26 : 12"
            :stroke-dasharray="`${r * 2.4} ${r * 6}`"
            stroke-linecap="round"
            :transform="`rotate(${-35 + i * 12} 300 300)`"
            :opacity="0.55 - i * 0.07"
        />
    </svg>
</template>
