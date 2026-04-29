import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import StudioCanvas from "../../islands/StudioCanvas.tsx";
import { type Product } from "../../utils/types.ts";

interface StudioData {
  availablePresets: Product[];
}

export const handler: Handlers<StudioData> = {
  async GET(_req, ctx) {
    // Fetch only algorithm_preset products
    const availablePresets: Product[] = STUB_PRESETS;
    return ctx.render({ availablePresets });
  },
};

export default function Studio({ data }: PageProps<StudioData>) {
  const { availablePresets } = data;

  return (
    <>
      <Head>
        <title>The Studio — FINEPRINT</title>
        <meta
          name="description"
          content="Interact with generative algorithms to create your own unique art in the FINEPRINT Studio."
        />
      </Head>

      <Header />

      <main class="flex-1 px-6 py-16">
        <div class="max-w-6xl mx-auto">
          {/* Page Header */}
          <div class="text-center mb-16">
            <p class="text-xs tracking-widest uppercase text-muted mb-4">Department II</p>
            <h1 class="text-4xl md:text-6xl font-thin tracking-wider uppercase">The Studio</h1>
            <p class="mt-6 text-sm font-light text-muted tracking-wide max-w-md mx-auto">
              Explore and manipulate generative algorithms. Select a preset, adjust the parameters,
              and render your unique piece.
            </p>
          </div>

          {/* Studio Layout: Canvas + Controls */}
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
            {/* Canvas — client-side island */}
            <div class="lg:col-span-3 border border-charcoal/10 bg-charcoal aspect-video flex items-center justify-center">
              <StudioCanvas />
            </div>

            {/* Preset Sidebar */}
            <aside class="flex flex-col gap-4">
              <p class="text-xs tracking-widest uppercase text-muted mb-2">Algorithm Presets</p>
              {availablePresets.map((preset) => (
                <div
                  key={preset.id}
                  class="border border-charcoal/10 p-4 hover:border-charcoal/40 transition-colors cursor-pointer"
                >
                  <p class="text-xs tracking-wide font-light uppercase mb-1">{preset.title}</p>
                  <p class="text-xs text-muted">
                    {(preset.priceCents / 100).toLocaleString("hu-HU")} HUF
                  </p>
                </div>
              ))}
              <a
                href="/gallery"
                class="mt-2 text-xs tracking-wider uppercase text-center text-muted hover:text-charcoal transition-colors"
              >
                Browse all presets →
              </a>
            </aside>
          </div>

          {/* How it works */}
          <section class="border-t border-charcoal/10 pt-16">
            <p class="text-xs tracking-widest uppercase text-muted text-center mb-12">
              How It Works
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                {
                  step: "01",
                  title: "Select a Preset",
                  desc: "Choose a free or purchased algorithm preset from our library.",
                },
                {
                  step: "02",
                  title: "Adjust Parameters",
                  desc: "Tweak seeds, color palettes, density, and more in real time.",
                },
                {
                  step: "03",
                  title: "Order Your Print",
                  desc: "Render at full resolution and order a museum-quality physical print.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step}>
                  <p class="text-3xl font-thin text-muted/30 mb-4">{step}</p>
                  <h3 class="text-xs tracking-widest uppercase font-light mb-3">{title}</h3>
                  <p class="text-sm text-muted font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

const STUB_PRESETS: Product[] = [
  {
    id: "p3",
    artistId: "4",
    title: "Vertex Drift",
    description: "Noise-driven particle system.",
    type: "algorithm_preset",
    priceCents: 5500,
    currency: "HUF",
    imageUrl: "",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p5",
    artistId: "4",
    title: "Fractal Bloom",
    description: "Recursive floral generator.",
    type: "algorithm_preset",
    priceCents: 7900,
    currency: "HUF",
    imageUrl: "",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo",
    artistId: "system",
    title: "Demo — Perlin Waves",
    description: "Free demo preset.",
    type: "algorithm_preset",
    priceCents: 0,
    currency: "HUF",
    imageUrl: "",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
];
