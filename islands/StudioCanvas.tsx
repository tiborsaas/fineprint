import { useEffect, useRef, useState } from "preact/hooks";

interface AlgorithmParams {
  seed: number;
  speed: number;
  density: number;
  colorMode: "mono" | "warm" | "cool";
}

const DEFAULT_PARAMS: AlgorithmParams = {
  seed: 42,
  speed: 1.0,
  density: 0.6,
  colorMode: "mono",
};

/**
 * StudioCanvas — Interactive generative art canvas (client-side island).
 *
 * Architecture: Each generative algorithm is a pure function that receives
 * the canvas context, current time, and params. New algorithms can be added
 * to the ALGORITHMS registry without touching the component.
 */
export default function StudioCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [params, setParams] = useState<AlgorithmParams>(DEFAULT_PARAMS);
  const [activeAlgorithm, setActiveAlgorithm] = useState<string>("perlin-waves");
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime = performance.now();

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function loop(now: number) {
      if (!canvas || !ctx || !isRendering) return;
      const t = (now - startTime) / 1000;
      const algorithm = ALGORITHMS[activeAlgorithm];
      if (algorithm) {
        algorithm(ctx, canvas.offsetWidth, canvas.offsetHeight, t, params);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    }

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [params, activeAlgorithm, isRendering]);

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `fineprint-${activeAlgorithm}-${params.seed}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div class="w-full h-full flex flex-col">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        class="w-full flex-1 block"
        style={{ display: "block" }}
      />

      {/* Controls Bar */}
      <div class="bg-charcoal/90 text-cream px-4 py-3 flex flex-wrap items-center gap-6 text-xs">
        {/* Algorithm selector */}
        <div class="flex items-center gap-2">
          <label class="tracking-wider uppercase text-cream/50">Algorithm</label>
          <select
            value={activeAlgorithm}
            onChange={(e) => setActiveAlgorithm((e.target as HTMLSelectElement).value)}
            class="bg-charcoal border border-cream/20 text-cream text-xs px-2 py-1"
          >
            {Object.keys(ALGORITHMS).map((key) => (
              <option key={key} value={key}>
                {key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        {/* Seed */}
        <div class="flex items-center gap-2">
          <label class="tracking-wider uppercase text-cream/50">Seed</label>
          <input
            type="number"
            value={params.seed}
            onInput={(e) =>
              setParams((p) => ({ ...p, seed: parseInt((e.target as HTMLInputElement).value) || 0 }))}
            class="bg-charcoal border border-cream/20 text-cream text-xs w-16 px-2 py-1"
          />
        </div>

        {/* Speed */}
        <div class="flex items-center gap-2">
          <label class="tracking-wider uppercase text-cream/50">Speed</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={params.speed}
            onInput={(e) =>
              setParams((p) => ({
                ...p,
                speed: parseFloat((e.target as HTMLInputElement).value),
              }))}
            class="w-20 accent-cream"
          />
        </div>

        {/* Color Mode */}
        <div class="flex items-center gap-2">
          <label class="tracking-wider uppercase text-cream/50">Palette</label>
          <select
            value={params.colorMode}
            onChange={(e) =>
              setParams((p) => ({
                ...p,
                colorMode: (e.target as HTMLSelectElement).value as AlgorithmParams["colorMode"],
              }))}
            class="bg-charcoal border border-cream/20 text-cream text-xs px-2 py-1"
          >
            <option value="mono">Mono</option>
            <option value="warm">Warm</option>
            <option value="cool">Cool</option>
          </select>
        </div>

        <div class="ml-auto flex gap-3">
          <button
            onClick={() => setIsRendering((r) => !r)}
            class="tracking-widest uppercase border border-cream/20 px-3 py-1 hover:bg-cream/10 transition-colors"
          >
            {isRendering ? "Pause" : "Play"}
          </button>
          <button
            onClick={handleExport}
            class="tracking-widest uppercase border border-cream/20 px-3 py-1 hover:bg-cream/10 transition-colors"
          >
            Export PNG
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Algorithm Registry
// Each entry is a pure draw function: (ctx, w, h, t, params) => void
// Add new algorithms here without modifying the component above.
// ---------------------------------------------------------------------------

type DrawFn = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  params: AlgorithmParams,
) => void;

function getColors(mode: AlgorithmParams["colorMode"]): { bg: string; fg: string } {
  switch (mode) {
    case "warm":
      return { bg: "#1a0a00", fg: "#c8a96e" };
    case "cool":
      return { bg: "#000a1a", fg: "#6eb4c8" };
    default:
      return { bg: "#0d0d0d", fg: "#faf9f7" };
  }
}

/** Simple pseudo-random based on seed + index */
function seededRandom(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297 + 233) * 4000000;
  return x - Math.floor(x);
}

const perlinWaves: DrawFn = (ctx, w, h, t, params) => {
  const { bg, fg } = getColors(params.colorMode);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const lineCount = Math.floor(params.density * 30) + 5;
  ctx.strokeStyle = fg;
  ctx.lineWidth = 0.8;
  ctx.globalAlpha = 0.6;

  for (let i = 0; i < lineCount; i++) {
    const yBase = (h / lineCount) * i + h / (lineCount * 2);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const phase = (i * 1.7 + params.seed * 0.01) * Math.PI;
      const amp = h * 0.04 * (1 + Math.sin(i * 0.5));
      const freq = 0.008 + seededRandom(params.seed, i) * 0.006;
      const y = yBase + Math.sin(x * freq + t * params.speed + phase) * amp;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
};

const particleField: DrawFn = (ctx, w, h, t, params) => {
  const { bg, fg } = getColors(params.colorMode);
  ctx.fillStyle = bg + "22";
  ctx.fillRect(0, 0, w, h);

  const count = Math.floor(params.density * 200) + 20;
  ctx.fillStyle = fg;

  for (let i = 0; i < count; i++) {
    const ox = seededRandom(params.seed, i * 2) * w;
    const oy = seededRandom(params.seed, i * 2 + 1) * h;
    const speed = 0.3 + seededRandom(params.seed, i) * 0.7;
    const radius = 0.5 + seededRandom(params.seed, i + 100) * 2.5;

    const x = (ox + Math.cos(t * speed * params.speed + i) * 40 + w) % w;
    const y = (oy + Math.sin(t * speed * params.speed + i * 1.3) * 30 + h) % h;

    ctx.globalAlpha = 0.3 + seededRandom(params.seed, i + 200) * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
};

const concentricRings: DrawFn = (ctx, w, h, t, params) => {
  const { bg, fg } = getColors(params.colorMode);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.48;
  const rings = Math.floor(params.density * 20) + 4;

  ctx.strokeStyle = fg;

  for (let i = 0; i < rings; i++) {
    const r = (maxR / rings) * (i + 1);
    const wobble = Math.sin(t * params.speed * 0.8 + i * 0.6 + params.seed * 0.1) * 8;
    ctx.lineWidth = 0.5 + (i / rings) * 1.5;
    ctx.globalAlpha = 0.2 + (i / rings) * 0.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r + wobble, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
};

export const ALGORITHMS: Record<string, DrawFn> = {
  "perlin-waves": perlinWaves,
  "particle-field": particleField,
  "concentric-rings": concentricRings,
};
