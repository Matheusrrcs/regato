/*
 * Regato desenhado em canvas: água correndo entre pedras ao longo de um curso
 * definido por âncoras. Só a janela visível é desenhada a cada frame.
 *
 *   buildCourse()  âncoras → amostras uniformes (posição, normal, largura)
 *   buildWorld()   pedras, seixos e capim nas margens (semente fixa)
 *   drawRiacho()   leito seco → água até a "ponta" → espuma → pedras
 */

export interface Anchor {
    x: number;
    y: number;
}

export interface Course {
    /** x, y, nx, ny, halfWidth, length — 6 floats por amostra, y crescente. */
    samples: Float32Array;
    count: number;
    total: number;
}

interface Stone {
    x: number;
    y: number;
    r: number;
    sprite: HTMLCanvasElement;
    /** 0 = margem, 1 = no meio da água (gera espuma). */
    inWater: boolean;
    phase: number;
    /** Comprimento do curso onde a pedra está (para saber se já tem água). */
    at: number;
}

interface Blade {
    x: number;
    y: number;
    h: number;
    bend: number;
    color: string;
}

interface Glint {
    offset: number;
    lateral: number;
    speed: number;
    size: number;
}

export interface World {
    stones: Stone[];
    pebbles: Float32Array; // x, y, r, shade
    blades: Blade[];
    glints: Glint[];
}

const STEP = 5;

/* ------------------------------------------------------------------ */
/* Aleatório com semente: mesmo layout a cada visita                   */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/* ------------------------------------------------------------------ */
/* Curso                                                               */
/* ------------------------------------------------------------------ */

function bezier(a: number, b: number, c: number, d: number, t: number) {
    const u = 1 - t;

    return (
        u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d
    );
}

/**
 * Curvas em S com tangente vertical em cada âncora (sempre descendo), depois
 * reamostradas a cada STEP px de comprimento.
 */
export function buildCourse(anchors: Anchor[], baseHalf: number): Course {
    const dense: number[] = [];

    anchors.forEach((p, i) => {
        if (i === 0) {
            dense.push(p.x, p.y);

            return;
        }

        const prev = anchors[i - 1];
        const mid = (prev.y + p.y) / 2;
        const steps = Math.max(
            8,
            Math.ceil(Math.hypot(p.x - prev.x, p.y - prev.y) / 3),
        );

        for (let s = 1; s <= steps; s++) {
            const t = s / steps;
            dense.push(
                bezier(prev.x, prev.x, p.x, p.x, t),
                bezier(prev.y, mid, mid, p.y, t),
            );
        }
    });

    // Reamostragem por comprimento de arco.
    const points: number[] = [dense[0], dense[1]];
    let carried = 0;

    for (let i = 2; i < dense.length; i += 2) {
        let ax = dense[i - 2];
        let ay = dense[i - 1];
        const bx = dense[i];
        const by = dense[i + 1];
        let seg = Math.hypot(bx - ax, by - ay);

        while (carried + seg >= STEP) {
            const t = (STEP - carried) / seg;
            ax += (bx - ax) * t;
            ay += (by - ay) * t;
            points.push(ax, ay);
            seg = Math.hypot(bx - ax, by - ay);
            carried = 0;
        }

        carried += seg;
    }

    const count = points.length / 2;
    const total = (count - 1) * STEP;
    const samples = new Float32Array(count * 6);

    for (let i = 0; i < count; i++) {
        const prev = Math.max(0, i - 1);
        const next = Math.min(count - 1, i + 1);
        const tx = points[next * 2] - points[prev * 2];
        const ty = points[next * 2 + 1] - points[prev * 2 + 1];
        const tl = Math.hypot(tx, ty) || 1;
        const length = i * STEP;

        // Nasce estreito, ganha corpo, alarga perto da foz; meandra levemente.
        const start = Math.min(1, length / 420);
        const end = 1 + Math.max(0, 1 - (total - length) / 260) * 0.8;
        const wobble =
            1 +
            0.22 * Math.sin(length / 97) +
            0.12 * Math.sin(length / 41 + 1.7);
        // Já nasce com corpo: continua a água da foto do topo.
        const half = baseHalf * (0.55 + 0.45 * start) * end * wobble;

        const o = i * 6;
        samples[o] = points[i * 2];
        samples[o + 1] = points[i * 2 + 1];
        samples[o + 2] = -ty / tl;
        samples[o + 3] = tx / tl;
        samples[o + 4] = half;
        samples[o + 5] = length;
    }

    return { samples, count, total };
}

/** Índice da primeira amostra com y >= alvo. */
export function indexAtY(course: Course, y: number): number {
    let lo = 0;
    let hi = course.count - 1;

    while (lo < hi) {
        const mid = (lo + hi) >> 1;

        if (course.samples[mid * 6 + 1] < y) lo = mid + 1;
        else hi = mid;
    }

    return lo;
}

/* ------------------------------------------------------------------ */
/* Pedras                                                              */
/* ------------------------------------------------------------------ */

function stoneSprite(
    r: number,
    rand: () => number,
    dpr: number,
): HTMLCanvasElement {
    const pad = r * 0.6;
    const size = Math.ceil((r * 2 + pad * 2) * dpr);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const c = r + pad;
    const squash = 0.68 + rand() * 0.22;
    const spin = rand() * Math.PI;
    const n = 11;
    const pts: [number, number][] = [];

    for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const rr = r * (0.84 + rand() * 0.24);
        const x = Math.cos(a) * rr;
        const y = Math.sin(a) * rr * squash;
        pts.push([
            c + x * Math.cos(spin * 0.25) - y * Math.sin(spin * 0.25),
            c + x * Math.sin(spin * 0.25) + y * Math.cos(spin * 0.25),
        ]);
    }

    const shape = (dx = 0, dy = 0) => {
        ctx.beginPath();
        const last = pts[n - 1];
        ctx.moveTo(
            (last[0] + pts[0][0]) / 2 + dx,
            (last[1] + pts[0][1]) / 2 + dy,
        );
        pts.forEach((p, i) => {
            const q = pts[(i + 1) % n];
            ctx.quadraticCurveTo(
                p[0] + dx,
                p[1] + dy,
                (p[0] + q[0]) / 2 + dx,
                (p[1] + q[1]) / 2 + dy,
            );
        });
        ctx.closePath();
    };

    // Sombra no leito.
    ctx.save();
    ctx.filter = `blur(${Math.max(1, r * 0.18)}px)`;
    ctx.fillStyle = 'rgba(30, 36, 28, 0.35)';
    shape(r * 0.12, r * 0.22);
    ctx.fill();
    ctx.restore();

    ctx.save();
    shape();
    ctx.clip();

    // Corpo: cinza-claro esverdeado, luz de dia.
    const body = ctx.createLinearGradient(c - r, c - r, c + r, c + r);
    body.addColorStop(0, 'oklch(0.86 0.012 110)');
    body.addColorStop(1, 'oklch(0.6 0.016 128)');
    ctx.fillStyle = body;
    ctx.fillRect(0, 0, c * 2, c * 2);

    // Volume: luz de cima à esquerda, sombra embaixo à direita.
    const shade = ctx.createRadialGradient(
        c - r * 0.4,
        c - r * 0.5,
        r * 0.05,
        c,
        c,
        r * 1.2,
    );
    shade.addColorStop(0, 'rgba(255, 255, 250, 0.5)');
    shade.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    shade.addColorStop(1, 'rgba(40, 52, 40, 0.45)');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, c * 2, c * 2);

    // Musgo na face de cima.
    const mossCount = rand() < 0.7 ? 1 + Math.floor(rand() * 3) : 0;
    for (let i = 0; i < mossCount; i++) {
        const mx = c + (rand() - 0.5) * r * 1.2;
        const my = c - r * (0.25 + rand() * 0.45);
        const mr = r * (0.25 + rand() * 0.35);
        const moss = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
        moss.addColorStop(0, `oklch(0.64 0.11 128 / ${0.55 + rand() * 0.3})`);
        moss.addColorStop(1, 'oklch(0.6 0.1 128 / 0)');
        ctx.fillStyle = moss;
        ctx.fillRect(mx - mr, my - mr, mr * 2, mr * 2);
    }

    // Brilho úmido na borda superior.
    ctx.strokeStyle = 'rgba(255, 255, 245, 0.25)';
    ctx.lineWidth = Math.max(0.6, r * 0.07);
    shape(-r * 0.03, -r * 0.05);
    ctx.stroke();
    ctx.restore();

    return canvas;
}

export function buildWorld(
    course: Course,
    seed: number,
    dpr: number,
    scale: number,
): World {
    const rand = mulberry32(seed);
    const s = course.samples;
    const stones: Stone[] = [];
    const pebbles: number[] = [];
    const blades: Blade[] = [];
    const glints: Glint[] = [];

    // Reaproveita sprites: muitas pedras pequenas com os mesmos desenhos.
    const cache = new Map<number, HTMLCanvasElement[]>();
    const sprite = (r: number) => {
        const key = Math.max(2, Math.round(r));
        const list = cache.get(key) ?? [];
        cache.set(key, list);

        if (list.length < 3) {
            list.push(stoneSprite(key, rand, dpr));

            return list[list.length - 1];
        }

        return list[Math.floor(rand() * list.length)];
    };

    let next = 0;

    for (let i = 0; i < course.count; i++) {
        const o = i * 6;
        const length = s[o + 5];

        if (length < next) continue;

        const half = s[o + 4];
        next = length + half * 1.6 + 14 * scale + rand() * 40 * scale;

        for (const side of [-1, 1]) {
            if (rand() < 0.35) continue;

            const r = Math.max(
                2,
                half * (0.45 + rand() * 0.75) * (rand() < 0.12 ? 1.6 : 1),
            );
            const off = side * (half + r * (0.35 + rand() * 0.35));
            stones.push({
                x: s[o] + s[o + 2] * off,
                y: s[o + 1] + s[o + 3] * off,
                r,
                sprite: sprite(r),
                inWater: false,
                phase: rand() * Math.PI * 2,
                at: length,
            });

            // Seixos espalhados fora da água.
            const extra = 1 + Math.floor(rand() * 3);
            for (let k = 0; k < extra; k++) {
                const po = side * (half + r * 1.2 + rand() * 18 * scale);
                pebbles.push(
                    s[o] + s[o + 2] * po + (rand() - 0.5) * 10 * scale,
                    s[o + 1] + s[o + 3] * po + (rand() - 0.5) * 10 * scale,
                    0.8 + rand() * 2.4 * scale,
                    rand(),
                );
            }

            // Capim nascendo atrás das pedras maiores.
            if (r > 6 * scale && rand() < 0.45) {
                const tufts = 3 + Math.floor(rand() * 5);
                const bx = s[o] + s[o + 2] * (off + side * r * 0.7);
                const by = s[o + 1] + s[o + 3] * (off + side * r * 0.7);
                for (let k = 0; k < tufts; k++) {
                    blades.push({
                        x: bx + (rand() - 0.5) * r,
                        y: by + (rand() - 0.5) * r * 0.4,
                        h: (6 + rand() * 14) * scale,
                        bend: (rand() - 0.5) * 8 * scale,
                        color: `oklch(${0.38 + rand() * 0.16} ${0.06 + rand() * 0.05} ${118 + rand() * 20} / 0.9)`,
                    });
                }
            }
        }

        // Pedra no meio da correnteza, com espuma.
        if (half > 5 && rand() < 0.1) {
            const r = half * (0.28 + rand() * 0.22);
            const off = (rand() - 0.5) * half * 0.8;
            stones.push({
                x: s[o] + s[o + 2] * off,
                y: s[o + 1] + s[o + 3] * off,
                r,
                sprite: sprite(r),
                inWater: true,
                phase: rand() * Math.PI * 2,
                at: length,
            });
        }
    }

    // Brilhos que descem com a água.
    const glintCount = Math.ceil(course.total / 60);
    for (let i = 0; i < glintCount; i++) {
        glints.push({
            offset: rand() * course.total,
            lateral: (rand() - 0.5) * 1.4,
            speed: 30 + rand() * 40,
            size: 0.6 + rand() * 1.4,
        });
    }

    stones.sort((a, b) => a.y - b.y);
    blades.sort((a, b) => a.y - b.y);

    return { stones, pebbles: new Float32Array(pebbles), blades, glints };
}

/* ------------------------------------------------------------------ */
/* Desenho                                                             */
/* ------------------------------------------------------------------ */

export interface Frame {
    ctx: CanvasRenderingContext2D;
    course: Course;
    world: World;
    /** Topo da janela desenhada, em coordenadas do curso. */
    top: number;
    height: number;
    /** Até onde a água já chegou (comprimento do curso). */
    tip: number;
    /** Tempo em segundos (anima a correnteza). */
    time: number;
}

/** Desenha um "tubo" ao longo do curso entre os índices a..b, com largura f. */
function ribbon(f: Frame, a: number, b: number, factor: number) {
    const { ctx } = f;
    const s = f.course.samples;

    ctx.beginPath();
    for (let i = a; i <= b; i++) {
        const o = i * 6;
        const w = s[o + 4] * factor;
        const x = s[o] + s[o + 2] * w;
        const y = s[o + 1] + s[o + 3] * w - f.top;
        if (i === a) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    for (let i = b; i >= a; i--) {
        const o = i * 6;
        const w = s[o + 4] * factor;
        ctx.lineTo(s[o] - s[o + 2] * w, s[o + 1] - s[o + 3] * w - f.top);
    }
    ctx.closePath();
}

/** Linha ao longo do curso, deslocada lateralmente (fração da largura). */
function flowLine(f: Frame, a: number, b: number, lateral: number) {
    const { ctx } = f;
    const s = f.course.samples;

    ctx.beginPath();
    for (let i = a; i <= b; i++) {
        const o = i * 6;
        const w = s[o + 4] * lateral;
        const x = s[o] + s[o + 2] * w;
        const y = s[o + 1] + s[o + 3] * w - f.top;
        if (i === a) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
}

export function drawRiacho(f: Frame) {
    const { ctx, course, world, top, height, tip, time } = f;
    const s = course.samples;
    const margin = 80;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (course.count < 2) return;

    const a = Math.max(0, indexAtY(course, top - margin) - 1);
    const b = Math.min(
        course.count - 1,
        indexAtY(course, top + height + margin),
    );
    const tipIndex = Math.min(course.count - 1, Math.floor(tip / STEP));
    const wetEnd = Math.min(b, tipIndex);

    // 1. Leito seco (o caminho que a água ainda vai percorrer).
    if (b > a) {
        // Ravina úmida: só um pouco mais escura que o fundo, sem contorno.
        ribbon(f, a, b, 0.9);
        ctx.fillStyle = 'oklch(0.88 0.02 85 / 0.32)';
        ctx.fill();
    }

    // Seixos.
    const p = world.pebbles;
    for (let i = 0; i < p.length; i += 4) {
        const y = p[i + 1] - top;
        if (y < -10 || y > height + 10) continue;
        ctx.fillStyle = `oklch(${0.55 + p[i + 3] * 0.25} 0.012 100 / 0.9)`;
        ctx.beginPath();
        ctx.ellipse(p[i], y, p[i + 2], p[i + 2] * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // 2. Água.
    if (wetEnd > a) {
        // Raso e claro nas margens, mais fundo no centro.
        ribbon(f, a, wetEnd, 1.08);
        ctx.fillStyle = 'oklch(0.86 0.05 185 / 0.6)';
        ctx.fill();
        ribbon(f, a, wetEnd, 0.9);
        ctx.fillStyle = 'oklch(0.74 0.07 188)';
        ctx.fill();

        // Mais fundo (e mais escuro) no centro.
        ribbon(f, a, wetEnd, 0.5);
        ctx.fillStyle = 'oklch(0.58 0.08 195 / 0.55)';
        ctx.fill();

        // Correnteza: poucos reflexos longos e bem fracos.
        ctx.lineCap = 'round';
        const lines = [
            [-0.5, 0.1, 0.8, 50, 110, 1.1],
            [0.1, 0.08, 0.7, 30, 140, 1.4],
            [0.6, 0.1, 0.8, 60, 100, 0.95],
        ];
        lines.forEach(([lat, alpha, width, dash, gap, speed]) => {
            flowLine(f, a, wetEnd, lat);
            ctx.setLineDash([dash, gap]);
            ctx.lineDashOffset = -time * 38 * speed;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 3})`;
            ctx.lineWidth = width;
            ctx.stroke();
        });
        ctx.setLineDash([]);

        // Margem molhada.
        ribbon(f, a, wetEnd, 1.04);
        ctx.strokeStyle = 'rgba(255, 255, 250, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Brilhos.
        world.glints.forEach((g) => {
            const length = (g.offset + time * g.speed) % course.total;
            if (length > tip) return;
            const i = Math.floor(length / STEP);
            if (i < a || i > wetEnd) return;
            const o = i * 6;
            const w = s[o + 4] * g.lateral * 0.5;
            const twinkle = 0.5 + 0.5 * Math.sin(time * 3 + g.offset);
            ctx.fillStyle = `rgba(240, 255, 250, ${0.25 + twinkle * 0.5})`;
            ctx.beginPath();
            ctx.ellipse(
                s[o] + s[o + 2] * w,
                s[o + 1] + s[o + 3] * w - top,
                g.size * 1.8,
                g.size * 0.7,
                Math.atan2(s[o + 3], s[o + 2]) + Math.PI / 2,
                0,
                Math.PI * 2,
            );
            ctx.fill();
        });

        // Frente d'água: espuma onde a água está chegando.
        if (tipIndex >= a && tipIndex <= b && tip < course.total - STEP) {
            const o = tipIndex * 6;
            const w = s[o + 4];
            for (let k = 0; k < 9; k++) {
                const lat = Math.sin(k * 1.7 + time * 2) * w * 0.8;
                const along = Math.cos(k * 2.3 + time * 3) * 3;
                ctx.fillStyle = `rgba(235, 250, 245, ${0.25 + 0.2 * Math.sin(time * 4 + k)})`;
                ctx.beginPath();
                ctx.arc(
                    s[o] + s[o + 2] * lat - s[o + 3] * along,
                    s[o + 1] + s[o + 3] * lat + s[o + 2] * along - top,
                    Math.max(1, w * 0.18),
                    0,
                    Math.PI * 2,
                );
                ctx.fill();
            }
        }
    }

    // 3. Pedras (e espuma nas que estão dentro da água).
    for (const stone of world.stones) {
        const y = stone.y - top;
        if (y < -stone.r * 2 || y > height + stone.r * 2) continue;

        if (stone.inWater && stone.at <= tip) {
            const pulse = 0.5 + 0.5 * Math.sin(time * 2.4 + stone.phase);
            ctx.strokeStyle = `rgba(235, 250, 245, ${0.25 + pulse * 0.3})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.ellipse(
                stone.x,
                y - stone.r * 0.15,
                stone.r * (1.15 + pulse * 0.15),
                stone.r * 0.85,
                0,
                Math.PI * 1.05,
                Math.PI * 1.95,
            );
            ctx.stroke();
        }

        const size = stone.r * 3.2;
        ctx.drawImage(
            stone.sprite,
            stone.x - size / 2,
            y - size / 2,
            size,
            size,
        );
    }

    // 4. Capim.
    ctx.lineCap = 'round';
    for (const blade of world.blades) {
        const y = blade.y - top;
        if (y < -30 || y > height + 30) continue;
        const sway = Math.sin(time * 1.3 + blade.x * 0.05) * 1.5;
        ctx.strokeStyle = blade.color;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(blade.x, y);
        ctx.quadraticCurveTo(
            blade.x + blade.bend * 0.3,
            y - blade.h * 0.6,
            blade.x + blade.bend + sway,
            y - blade.h,
        );
        ctx.stroke();
    }
}
