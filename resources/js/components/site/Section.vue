<script setup lang="ts">
/*
 * Seção padrão das páginas internas. Marca a margem por onde o regato corre
 * (direita no desktop, esquerda no mobile) no topo e na base da seção.
 */
withDefaults(
    defineProps<{ cream?: boolean; class?: string; stream?: boolean }>(),
    {
        cream: false,
        class: '',
        stream: true,
    },
);
</script>

<template>
    <section
        class="relative"
        :class="[cream ? 'surface-inverse' : '', $props.class]"
    >
        <template v-if="stream">
            <span
                data-stream
                class="stream-gutter-right absolute top-0 h-px w-px"
                aria-hidden="true"
            />
            <span
                data-stream
                class="stream-gutter-right absolute bottom-0 h-px w-px"
                aria-hidden="true"
            />
        </template>
        <div class="mx-auto max-w-7xl py-20 pr-5 pl-9 lg:px-8 lg:py-28">
            <slot />
        </div>
    </section>
</template>
