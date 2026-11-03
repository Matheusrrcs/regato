<script setup lang="ts">
/*
 * Afluentes: três filetes d'água descendo entre pedras, saindo de cada card de
 * serviço e se juntando no regato principal. A água entra conforme o scroll
 * (--p do v-progress) e corre continuamente.
 */
import { vProgress } from '@/lib/scroll';

const W = 1200;
const H = 170;

type P = [number, number];
const channels: [P, P, P, P][] = [
    [
        [196, 0],
        [196, 100],
        [600, 70],
        [600, H],
    ],
    [
        [600, 0],
        [588, 60],
        [612, 110],
        [600, H],
    ],
    [
        [1004, 0],
        [1004, 100],
        [600, 70],
        [600, H],
    ],
];

const d = (c: [P, P, P, P]) =>
    `M${c[0][0]} ${c[0][1]}C${c[1][0]} ${c[1][1]} ${c[2][0]} ${c[2][1]} ${c[3][0]} ${c[3][1]}`;

function at(c: [P, P, P, P], t: number) {
    const u = 1 - t;
    const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    const dk = [
        -3 * u * u,
        3 * u * u - 6 * u * t,
        6 * u * t - 3 * t * t,
        3 * t * t,
    ];
    const x = k.reduce((s, v, i) => s + v * c[i][0], 0);
    const y = k.reduce((s, v, i) => s + v * c[i][1], 0);
    const tx = dk.reduce((s, v, i) => s + v * c[i][0], 0);
    const ty = dk.reduce((s, v, i) => s + v * c[i][1], 0);
    const l = Math.hypot(tx, ty) || 1;

    return { x, y, nx: -ty / l, ny: tx / l };
}

let seed = 7;
const rand = () => {
    seed = (seed * 16807) % 2147483647;

    return seed / 2147483647;
};

// Pedras nas margens de cada filete.
const stones = channels.flatMap((c) => {
    const list: {
        x: number;
        y: number;
        rx: number;
        ry: number;
    }[] = [];

    for (let t = 0.06; t < 0.92; t += 0.07 + rand() * 0.06) {
        const p = at(c, t);
        for (const side of [-1, 1]) {
            if (rand() < 0.3) continue;
            const r = 4 + rand() * 7;
            const off = side * (7 + r * 0.7);
            list.push({
                x: p.x + p.nx * off,
                y: p.y + p.ny * off,
                rx: r,
                ry: r * (0.6 + rand() * 0.25),
            });
        }
    }

    return list;
});
</script>

<template>
    <div v-progress class="relative h-[170px]" aria-hidden="true">
        <svg
            :viewBox="`0 0 ${W} ${H}`"
            preserveAspectRatio="none"
            class="h-full w-full overflow-visible"
            fill="none"
        >
            <defs>
                <radialGradient id="tr-rock" cx="0.35" cy="0.3" r="0.8">
                    <stop offset="0" stop-color="oklch(0.84 0.014 115)" />
                    <stop offset="0.55" stop-color="oklch(0.64 0.016 125)" />
                    <stop offset="1" stop-color="oklch(0.44 0.018 135)" />
                </radialGradient>
                <linearGradient id="tr-moss" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="0"
                        stop-color="oklch(0.64 0.11 128)"
                        stop-opacity="0.9"
                    />
                    <stop
                        offset="0.55"
                        stop-color="oklch(0.64 0.11 128)"
                        stop-opacity="0"
                    />
                </linearGradient>
            </defs>

            <!-- Leito seco -->
            <path
                v-for="(c, i) in channels"
                :key="`bed-${i}`"
                :d="d(c)"
                stroke="oklch(0.86 0.022 85 / 0.7)"
                stroke-width="16"
                stroke-linecap="round"
            />
            <!-- Água (entra com o scroll) -->
            <g v-for="(c, i) in channels" :key="`water-${i}`">
                <path
                    class="tributary"
                    :d="d(c)"
                    pathLength="1"
                    stroke="oklch(0.72 0.07 188)"
                    stroke-width="11"
                    stroke-linecap="round"
                />
                <path
                    class="tributary"
                    :d="d(c)"
                    pathLength="1"
                    stroke="oklch(0.55 0.075 195)"
                    stroke-width="5"
                    stroke-linecap="round"
                />
                <path
                    class="tributary-flow"
                    :d="d(c)"
                    stroke="rgb(255 255 255 / 0.7)"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    :style="{ animationDelay: `${-i * 0.4}s` }"
                />
            </g>
            <!-- Pedras -->
            <g v-for="(s, i) in stones" :key="`stone-${i}`">
                <ellipse
                    :cx="s.x + s.rx * 0.15"
                    :cy="s.y + s.ry * 0.3"
                    :rx="s.rx"
                    :ry="s.ry"
                    fill="rgb(30 45 35 / 0.3)"
                />
                <ellipse
                    :cx="s.x"
                    :cy="s.y"
                    :rx="s.rx"
                    :ry="s.ry"
                    fill="url(#tr-rock)"
                />
                <ellipse
                    :cx="s.x"
                    :cy="s.y"
                    :rx="s.rx"
                    :ry="s.ry"
                    fill="url(#tr-moss)"
                />
            </g>
        </svg>
        <span data-stream class="absolute bottom-0 left-1/2 h-px w-px" />
    </div>
</template>
