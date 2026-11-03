<script setup lang="ts">
/*
 * Foz: onde o regato encontra águas maiores. A correnteza termina na crista
 * da onda e as ondulações se abrem conforme a seção atravessa a tela.
 */
import { vProgress, vReveal } from '@/lib/scroll';
import { Link } from '@inertiajs/vue3';
import Icon from './Icon.vue';
import Ripples from './Ripples.vue';

defineProps<{
    titulo?: string;
    descricao?: string;
}>();
</script>

<template>
    <section class="relative z-10 mt-20 lg:mt-28">
        <svg
            class="text-secondary absolute bottom-[calc(100%-1px)] left-0 h-14 w-full lg:h-24"
            viewBox="0 0 1440 96"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                d="M0 70C260 70 470 4 720 4s460 66 720 66V96H0Z"
                fill="currentColor"
            />
        </svg>
        <span
            data-stream
            data-stream-keep
            class="absolute -top-[2.25rem] left-1/2 h-px w-px lg:-top-[5.5rem]"
            aria-hidden="true"
        />

        <div
            v-progress
            class="bg-secondary relative overflow-hidden px-6 pt-20 pb-28 lg:px-8 lg:pt-28 lg:pb-40"
        >
            <Ripples
                :drop="false"
                :rings="5"
                class="foz-ripples text-water/25 absolute top-0 left-1/2 w-[1100px] max-w-none lg:w-[1500px]"
            />

            <div class="relative mx-auto max-w-4xl text-center">
                <p v-reveal class="eyebrow">Foz</p>
                <h2
                    v-reveal="80"
                    class="mt-5 text-4xl leading-[1.02] font-bold text-balance sm:text-6xl lg:text-7xl"
                >
                    {{ titulo ?? 'Vamos colocar a sua ideia em movimento?' }}
                </h2>
                <p
                    v-reveal="160"
                    class="text-muted-foreground mx-auto mt-7 max-w-2xl text-lg"
                >
                    {{
                        descricao ??
                        'Conte o que você precisa. Respondemos em até 1 dia útil com os próximos passos, prazo e faixa de investimento.'
                    }}
                </p>
                <div
                    v-reveal="240"
                    class="mt-10 flex flex-wrap justify-center gap-3"
                >
                    <Link
                        href="/contato"
                        class="group bg-inverse text-inverse-foreground inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
                    >
                        Começar um projeto
                        <Icon
                            name="arrow-right"
                            class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                    <Link
                        href="/planos"
                        class="border-border hover:bg-background/60 inline-flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-medium transition-colors"
                    >
                        Ver planos e preços
                    </Link>
                </div>
            </div>
        </div>
    </section>
</template>
