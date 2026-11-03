<script setup lang="ts">
/*
 * Paisagem da nascente, em luz de dia: serras na névoa, pinheiros, um paredão
 * de pedras com musgo e samambaias, e a queda d'água caindo no poço de onde
 * nasce o regato.
 *
 * Fica ATRÁS do <StreamCourse> (-z-10): a água sai do poço e desce pela
 * frente da cena, emendando com o resto da página. Gerada com semente fixa
 * (igual no servidor e no cliente). Camadas com --depth fazem o parallax.
 */
import Ripples from './Ripples.vue';

withDefaults(defineProps<{ quiet?: boolean }>(), { quiet: false });

const W = 1440;
const H = 800;
const SPRING = { x: 1085, top: 578, pool: 700 };

const springLeft = `${(SPRING.x / W) * 100}%`;
const RIPPLE_WIDTH = 0.12;
// Ripples: viewBox 400x240, centro das ondas em y=170 (70.8% da altura).
const rippleHeight = (RIPPLE_WIDTH * W * 0.6) / H;
const rippleTop = `${(SPRING.pool / H - 0.708 * rippleHeight) * 100}%`;
const anchorTop = `${((SPRING.pool + 6) / H) * 100}%`;

function mulberry32(seed: number) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(42);
const f = (n: number) => n.toFixed(1);

type Ridge = (x: number) => number;
type Point = [number, number];

function ridge(base: number, amp: number, freq: number): Ridge {
    const p1 = rand() * 10;
    const p2 = rand() * 10;
    const p3 = rand() * 10;

    return (x) =>
        base -
        amp *
            (0.55 * Math.sin(x / freq + p1) +
                0.3 * Math.sin(x / (freq * 0.43) + p2) +
                0.15 * Math.sin(x / (freq * 0.17) + p3));
}

function ridgePath(r: Ridge, bottom = H): string {
    let d = `M-20 ${bottom} L-20 ${f(r(-20))}`;
    for (let x = 0; x <= W + 20; x += 24) d += ` L${x} ${f(r(x))}`;

    return `${d} L${W + 20} ${bottom} Z`;
}

/** Pinheiros em camadas sobre a linha da serra (um único path por camada). */
function pines(r: Ridge, minH: number, maxH: number, spacing: number): string {
    let d = '';

    for (let x = -10; x < W + 10; x += spacing * (0.5 + rand())) {
        if (rand() < 0.12) continue;

        const h = minH + rand() * (maxH - minH);
        const w = h * (0.34 + rand() * 0.1);
        const y = r(x) + 4;
        const tiers = 4;
        const left: Point[] = [[x, y - h]];

        for (let t = tiers - 1; t >= 0; t--) {
            const ty = y - h * (t / tiers) - h * 0.04;
            const tw = (w / 2) * (1 - (t / tiers) * 0.8);
            left.push([x - tw, ty]);
            if (t > 0) left.push([x - tw * 0.38, ty - h * 0.03]);
        }

        left.push([x - w * 0.05, y]);
        const right = left
            .slice(1)
            .reverse()
            .map(([px, py]): Point => [2 * x - px, py]);

        d +=
            [...left, ...right]
                .map(([px, py], i) => `${i ? 'L' : 'M'}${f(px)} ${f(py)}`)
                .join(' ') + ' Z ';
    }

    return d;
}

/** Contorno com cantos levemente quebrados (mistura de reta e curva). */
function outline(list: Point[], tension: number): string {
    const m = list.length;
    let d = `M${f(list[0][0])} ${f(list[0][1])}`;

    for (let i = 0; i < m; i++) {
        const p = list[i];
        const q = list[(i + 1) % m];
        const mx = p[0] + (q[0] - p[0]) * tension;
        const my = p[1] + (q[1] - p[1]) * tension;
        d += ` Q${f(p[0])} ${f(p[1])} ${f(mx)} ${f(my)} L${f(q[0])} ${f(q[1])}`;
    }

    return `${d} Z`;
}

interface Boulder {
    body: string;
    light: string;
    moss: string;
    crack: string;
}

/** Pedra irregular: face iluminada, musgo no topo e uma rachadura. */
function boulder(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    mossy: number,
): Boulder {
    const n = 13;
    const pts: Point[] = [];

    for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.PI;
        const k = 0.78 + rand() * 0.3;
        const s = Math.sin(a);
        // Base achatada: a pedra assenta no chão.
        pts.push([
            cx + Math.cos(a) * rx * k,
            cy + (s > 0 ? Math.min(s, 0.45) : s) * ry * k,
        ]);
    }

    const body = outline(pts, 0.35);

    const light = outline(
        pts.map(([x, y]): Point =>
            x < cx + rx * 0.2 && y < cy + ry * 0.1
                ? [x + (cx - x) * 0.12, y + (cy - y) * 0.12]
                : [
                      cx - rx * 0.15 + (x - cx) * 0.35,
                      cy - ry * 0.25 + (y - cy) * 0.3,
                  ],
        ),
        0.5,
    );

    // Musgo: faixa irregular no topo, "escorrendo" um pouco.
    const top = pts.filter(([, y]) => y < cy - ry * (0.15 + (1 - mossy) * 0.5));
    let moss = '';
    if (top.length >= 2 && rand() < mossy + 0.2) {
        const drip = top
            .map(([x, y]): Point => [
                x + (rand() - 0.5) * 6,
                y + ry * (0.08 + rand() * 0.16),
            ])
            .reverse();
        moss = outline(
            [...top.map(([x, y]): Point => [x, y - 2]), ...drip],
            0.5,
        );
    }

    const c0x = cx + (rand() - 0.2) * rx * 0.5;
    const c0y = cy - ry * 0.2;
    const crack = `M${f(c0x)} ${f(c0y)} l${f(rx * 0.12)} ${f(ry * 0.25)} l${f(-rx * 0.05)} ${f(ry * 0.22)} l${f(rx * 0.08)} ${f(ry * 0.2)}`;

    return { body, light, moss, crack };
}

/** Samambaia: haste curva com folíolos alternados. */
function fern(x: number, y: number, len: number, lean: number): string {
    const steps = 9;
    const pt = (t: number): Point => [
        x + lean * len * t * t,
        y - len * t + len * 0.25 * t * t,
    ];
    const [ex, ey] = pt(1);
    const [mx, my] = pt(0.5);
    let d = `M${f(x)} ${f(y)} Q${f(mx + lean * 4)} ${f(my)} ${f(ex)} ${f(ey)}`;

    for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const [px, py] = pt(t);
        const leaf = len * 0.28 * (1 - t * 0.8);
        for (const side of [-1, 1]) {
            d += ` M${f(px)} ${f(py)} q${f(side * leaf * 0.6)} ${f(-leaf * 0.1)} ${f(side * leaf)} ${f(leaf * 0.35)}`;
        }
    }

    return d;
}

const far = ridge(470, 95, 210);
const mid = ridge(560, 45, 160);
const near = ridge(650, 26, 120);

const layers = {
    far: ridgePath(far),
    farPines: pines(far, 10, 22, 7),
    mid: ridgePath(mid),
    midPines: pines(mid, 22, 48, 11),
    near: ridgePath(near),
    nearPines: pines(near, 45, 110, 16),
};

// Paredão atrás da queda d'água (a água passa na frente destas).
const backRocks = [
    [965, 628, 135, 100, 0.8],
    [1205, 636, 128, 92, 0.75],
    [1085, 590, 70, 40, 0.9],
    [1335, 676, 80, 52, 0.6],
    [860, 676, 70, 44, 0.6],
].map(([cx, cy, rx, ry, m]) => boulder(cx, cy, rx, ry, m));

// Pedras na frente, em volta do poço.
const frontRocks = [
    [968, 716, 62, 32, 0.5],
    [1206, 722, 70, 34, 0.5],
    [1030, 748, 34, 17, 0.4],
    [1150, 756, 42, 19, 0.4],
    [1300, 742, 46, 22, 0.5],
    [1408, 760, 40, 19, 0.4],
    [880, 750, 36, 17, 0.4],
    [770, 772, 28, 12, 0.3],
].map(([cx, cy, rx, ry, m]) => boulder(cx, cy, rx, ry, m));

const ferns = [
    [905, 640, 46, -0.5],
    [920, 648, 38, -0.9],
    [1262, 652, 44, 0.6],
    [1280, 660, 36, 0.95],
    [1110, 704, 22, 0.7],
    [1046, 706, 20, -0.7],
    [1360, 742, 30, 0.5],
].map(([x, y, len, lean]) => fern(x, y, len, lean));
</script>

<template>
    <div
        class="pointer-events-none absolute bottom-0 left-[-100%] -z-10 aspect-[1440/800] w-[200%] select-none sm:left-[-60%] sm:w-[160%] lg:left-0 lg:w-full"
        :class="{ 'opacity-75': quiet }"
        aria-hidden="true"
    >
        <svg
            viewBox="0 0 1440 800"
            class="absolute inset-0 h-full w-full"
            fill="none"
            preserveAspectRatio="xMidYMax meet"
        >
            <defs>
                <radialGradient id="ls-glow" cx="0.72" cy="0.42" r="0.5">
                    <stop
                        offset="0"
                        stop-color="oklch(0.99 0.03 100)"
                        stop-opacity="0.9"
                    />
                    <stop
                        offset="1"
                        stop-color="oklch(0.99 0.03 100)"
                        stop-opacity="0"
                    />
                </radialGradient>
                <linearGradient id="ls-mist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#fff" stop-opacity="0" />
                    <stop offset="0.6" stop-color="#fff" stop-opacity="0.45" />
                    <stop offset="1" stop-color="#fff" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="ls-near" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0.45" stop-color="oklch(0.62 0.06 145)" />
                    <stop
                        offset="1"
                        stop-color="oklch(0.972 0.011 92)"
                        stop-opacity="0"
                    />
                </linearGradient>
                <linearGradient id="ls-rock" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0" stop-color="oklch(0.8 0.014 115)" />
                    <stop offset="0.55" stop-color="oklch(0.6 0.016 125)" />
                    <stop offset="1" stop-color="oklch(0.4 0.018 135)" />
                </linearGradient>
                <linearGradient id="ls-rock-light" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#fff" stop-opacity="0.5" />
                    <stop offset="1" stop-color="#fff" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="ls-moss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="oklch(0.66 0.11 128)" />
                    <stop offset="1" stop-color="oklch(0.52 0.09 132)" />
                </linearGradient>
                <linearGradient id="ls-fall" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="0"
                        stop-color="oklch(0.97 0.015 190)"
                        stop-opacity="0.95"
                    />
                    <stop
                        offset="1"
                        stop-color="oklch(0.78 0.06 192)"
                        stop-opacity="0.95"
                    />
                </linearGradient>
                <radialGradient id="ls-pool" cx="0.5" cy="0.4" r="0.6">
                    <stop offset="0" stop-color="oklch(0.8 0.06 190)" />
                    <stop offset="1" stop-color="oklch(0.6 0.075 195)" />
                </radialGradient>
                <filter
                    id="ls-blur"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="7" />
                </filter>
                <!-- Textura de pedra: borda irregular + grão em relevo. -->
                <filter
                    id="ls-stone"
                    x="-5%"
                    y="-5%"
                    width="110%"
                    height="110%"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.035"
                        numOctaves="4"
                        seed="3"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="7"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="shape"
                    />
                    <feDiffuseLighting
                        in="noise"
                        surfaceScale="3"
                        lighting-color="#fff"
                        result="relief"
                    >
                        <feDistantLight azimuth="235" elevation="50" />
                    </feDiffuseLighting>
                    <!-- Cor × relevo (aritmético: sem franja clara na borda). -->
                    <feComposite
                        in="shape"
                        in2="relief"
                        operator="arithmetic"
                        k1="1.3"
                        k2="0"
                        k3="0"
                        k4="0"
                    />
                </filter>
                <filter
                    id="ls-shadow"
                    x="-20%"
                    y="-50%"
                    width="140%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="8" />
                </filter>
                <!-- Some as serras perto da base: o parallax não deixa borda dura. -->
                <linearGradient
                    id="ls-fade-g"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="800"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.66" stop-color="#fff" />
                    <stop offset="0.95" stop-color="#000" />
                </linearGradient>
                <mask
                    id="ls-fade"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="1440"
                    height="800"
                >
                    <rect width="1440" height="800" fill="url(#ls-fade-g)" />
                </mask>
            </defs>

            <g mask="url(#ls-fade)">
                <g class="layer" style="--depth: 30">
                    <rect width="1440" height="800" fill="url(#ls-glow)" />
                </g>

                <g class="layer" style="--depth: 150">
                    <path :d="layers.far" fill="oklch(0.88 0.025 155)" />
                    <path :d="layers.farPines" fill="oklch(0.85 0.03 155)" />
                    <rect
                        y="380"
                        width="1440"
                        height="240"
                        fill="url(#ls-mist)"
                    />
                </g>

                <g class="layer" style="--depth: 95">
                    <path :d="layers.mid" fill="oklch(0.77 0.045 150)" />
                    <path :d="layers.midPines" fill="oklch(0.71 0.055 150)" />
                    <rect
                        y="500"
                        width="1440"
                        height="200"
                        fill="url(#ls-mist)"
                    />
                </g>

                <g class="layer" style="--depth: 45">
                    <path :d="layers.near" fill="url(#ls-near)" />
                    <path :d="layers.nearPines" fill="oklch(0.5 0.07 150)" />
                </g>
            </g>

            <!-- Sombra do paredão no chão -->
            <ellipse
                cx="1085"
                cy="728"
                rx="330"
                ry="34"
                fill="oklch(0.35 0.03 150)"
                fill-opacity="0.3"
                filter="url(#ls-shadow)"
            />

            <!-- Paredão -->
            <g filter="url(#ls-stone)">
                <g v-for="(r, i) in backRocks" :key="`b${i}`">
                    <path :d="r.body" fill="url(#ls-rock)" />
                    <path :d="r.light" fill="url(#ls-rock-light)" />
                    <path v-if="r.moss" :d="r.moss" fill="url(#ls-moss)" />
                    <path
                        :d="r.crack"
                        stroke="oklch(0.35 0.02 140)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </g>

            <!-- Queda d'água e poço -->
            <g>
                <path
                    :d="`M${SPRING.x - 14} ${SPRING.top} C${SPRING.x - 18} 620 ${SPRING.x - 10} 664 ${SPRING.x - 24} ${SPRING.pool} L${SPRING.x + 24} ${SPRING.pool} C${SPRING.x + 10} 664 ${SPRING.x + 18} 620 ${SPRING.x + 14} ${SPRING.top} Z`"
                    fill="url(#ls-fall)"
                />
                <path
                    v-for="(dx, i) in [-10, -5, 0, 5, 10]"
                    :key="i"
                    class="waterfall-flow"
                    :style="{ animationDelay: `${-i * 0.23}s` }"
                    :d="`M${SPRING.x + dx} ${SPRING.top + 2} C${SPRING.x + dx * 1.1} 625 ${SPRING.x + dx * 0.9} 665 ${SPRING.x + dx * 1.4} ${SPRING.pool - 4}`"
                    stroke="#fff"
                    stroke-opacity="0.8"
                    stroke-width="1.4"
                    stroke-linecap="round"
                />
                <ellipse
                    :cx="SPRING.x"
                    :cy="SPRING.pool + 4"
                    rx="96"
                    ry="20"
                    fill="url(#ls-pool)"
                />
                <ellipse
                    :cx="SPRING.x"
                    :cy="SPRING.pool + 4"
                    rx="96"
                    ry="20"
                    stroke="#fff"
                    stroke-opacity="0.5"
                />
                <ellipse
                    class="waterfall-mist"
                    :cx="SPRING.x"
                    :cy="SPRING.pool - 6"
                    rx="52"
                    ry="18"
                    fill="#fff"
                    fill-opacity="0.55"
                    filter="url(#ls-blur)"
                />
            </g>

            <!-- Pedras da frente e samambaias -->
            <g filter="url(#ls-stone)">
                <g v-for="(r, i) in frontRocks" :key="`f${i}`">
                    <path :d="r.body" fill="url(#ls-rock)" />
                    <path :d="r.light" fill="url(#ls-rock-light)" />
                    <path v-if="r.moss" :d="r.moss" fill="url(#ls-moss)" />
                </g>
            </g>
            <path
                v-for="(d, i) in ferns"
                :key="`fern${i}`"
                :d="d"
                stroke="oklch(0.52 0.11 135)"
                stroke-width="1.6"
                stroke-linecap="round"
            />
        </svg>

        <!-- Ondas no poço + âncora onde nasce o regato. -->
        <Ripples
            :drop="false"
            :rings="3"
            class="absolute -translate-x-1/2 text-white/70"
            :style="{
                left: springLeft,
                top: rippleTop,
                width: `${RIPPLE_WIDTH * 100}%`,
            }"
        />
        <span
            data-stream
            data-stream-keep
            class="absolute h-px w-px"
            :style="{ left: springLeft, top: anchorTop }"
        />
    </div>
</template>
