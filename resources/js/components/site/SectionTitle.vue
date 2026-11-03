<script setup lang="ts">
withDefaults(
    defineProps<{
        eyebrow: string;
        titulo: string;
        descricao?: string;
        dark?: boolean;
    }>(),
    { dark: false },
);
</script>

<template>
    <div class="max-w-2xl">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2 class="mt-3 text-3xl leading-tight font-bold sm:text-4xl">
            {{ titulo }}
        </h2>
        <p
            v-if="descricao"
            class="mt-4 text-base"
            :class="dark ? 'opacity-70' : 'text-muted-foreground'"
        >
            {{ descricao }}
        </p>
    </div>
</template>
