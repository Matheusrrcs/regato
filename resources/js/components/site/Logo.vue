<script setup lang="ts">
withDefaults(
    defineProps<{
        showWordmark?: boolean;
        name?: string;
    }>(),
    { showWordmark: true, name: 'regato' },
);
</script>

<template>
    <span class="inline-flex items-center gap-2.5">
        <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            class="h-8 w-8 shrink-0"
            fill="none"
        >
            <circle cx="24" cy="24" r="22" fill="currentColor" />
            <path
                d="M19 34V19.5c0-3.6 2.9-6.5 6.5-6.5H30"
                stroke="var(--background)"
                stroke-width="4.2"
                stroke-linecap="round"
            />
            <path
                d="M30 13v6"
                stroke="var(--background)"
                stroke-width="4.2"
                stroke-linecap="round"
            />
        </svg>
        <span
            v-if="showWordmark"
            class="font-display text-2xl font-bold tracking-tight lowercase"
        >
            {{ name }}
        </span>
    </span>
</template>
