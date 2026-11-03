<script setup lang="ts">
/*
 * Nascente: anéis concêntricos se abrindo na superfície da água, vistos em
 * perspectiva, com uma gota caindo a cada ciclo. Decorativo.
 */
withDefaults(defineProps<{ drop?: boolean; rings?: number }>(), {
    drop: true,
    rings: 4,
});

const DURATION = 7.2;
</script>

<template>
    <svg
        viewBox="0 0 400 240"
        fill="none"
        aria-hidden="true"
        class="pointer-events-none select-none"
        overflow="visible"
    >
        <ellipse
            v-for="i in rings"
            :key="i"
            class="ripple"
            cx="200"
            cy="170"
            rx="196"
            ry="62"
            stroke="currentColor"
            :stroke-width="i === 1 ? 1.6 : 1"
            vector-effect="non-scaling-stroke"
            :style="{
                '--s': (i / (rings + 0.5)).toFixed(3),
                '--ripple-delay': `${-((i - 1) * DURATION) / rings}s`,
            }"
        />
        <g v-if="drop" class="drop">
            <path
                d="M200 146c-5 7-8 11.5-8 15.5a8 8 0 0 0 16 0c0-4-3-8.5-8-15.5Z"
                fill="currentColor"
            />
        </g>
    </svg>
</template>
