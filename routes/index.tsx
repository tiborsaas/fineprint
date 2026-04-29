import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>FINEPRINT — Fine Art Prints &amp; Generative Studio</title>
        <meta
          name="description"
          content="Fine art prints by independent artists and a generative art studio. Discover, create, and own unique artwork."
        />
      </Head>

      <Header />

      <main class="flex-1">
        {/* Hero */}
        <section class="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <p class="text-xs tracking-widest uppercase text-muted mb-6">
            Fine Art &amp; Generative Studio
          </p>
          <h1
            class="text-5xl md:text-8xl font-thin tracking-wider uppercase leading-none mb-10"
            style="letter-spacing: 0.25em;"
          >
            FINEPRINT
          </h1>
          <p class="max-w-xl text-sm font-light tracking-wide text-muted leading-relaxed mb-16">
            Where independent artists meet algorithmic imagination. Acquire high-quality fine art
            prints or create your own generative masterpiece in our studio.
          </p>

          {/* Entry Points */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-px w-full max-w-3xl border border-charcoal/10">
            {/* Gallery Entry */}
            <a
              href="/gallery"
              class="group relative flex flex-col items-center justify-center p-16 bg-cream hover:bg-charcoal transition-colors duration-500 cursor-pointer"
            >
              <div class="mb-6 opacity-30 group-hover:opacity-60 transition-opacity">
                <GalleryIcon />
              </div>
              <span class="text-xs tracking-widest uppercase font-light group-hover:text-cream transition-colors duration-500">
                The Gallery
              </span>
              <span class="mt-2 text-xs tracking-wide text-muted group-hover:text-cream/50 transition-colors duration-500">
                Fine Art Prints
              </span>
            </a>

            {/* Studio Entry */}
            <a
              href="/studio"
              class="group relative flex flex-col items-center justify-center p-16 bg-charcoal text-cream hover:bg-accent transition-colors duration-500 cursor-pointer"
            >
              <div class="mb-6 opacity-40 group-hover:opacity-80 transition-opacity">
                <StudioIcon />
              </div>
              <span class="text-xs tracking-widest uppercase font-light">
                The Studio
              </span>
              <span class="mt-2 text-xs tracking-wide text-cream/40">
                Generative Art
              </span>
            </a>
          </div>
        </section>

        {/* Featured Section */}
        <section class="py-24 px-6 border-t border-charcoal/10">
          <div class="max-w-5xl mx-auto">
            <p class="text-xs tracking-widest uppercase text-muted text-center mb-16">
              What We Offer
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureBlock
                title="Original Prints"
                description="Curated fine art prints by independent artists, produced with archival-grade materials."
              />
              <FeatureBlock
                title="Algorithm Presets"
                description="Unlock procedural generation seeds and parameters created by our artists and engineers."
              />
              <FeatureBlock
                title="Studio Creations"
                description="Render your own unique piece in the Generative Studio, then order it as a physical print."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FeatureBlock({ title, description }: { title: string; description: string }) {
  return (
    <div class="text-center">
      <h3 class="text-xs tracking-widest uppercase mb-4 font-light">{title}</h3>
      <p class="text-sm text-muted font-light leading-relaxed tracking-wide">{description}</p>
    </div>
  );
}

function GalleryIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" stroke="currentColor" stroke-width="0.75" />
      <rect x="10" y="10" width="8" height="10" stroke="currentColor" stroke-width="0.75" />
      <rect x="22" y="10" width="8" height="10" stroke="currentColor" stroke-width="0.75" />
      <rect x="10" y="24" width="20" height="6" stroke="currentColor" stroke-width="0.75" />
    </svg>
  );
}

function StudioIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="0.75" />
      <circle cx="20" cy="20" r="7" stroke="currentColor" stroke-width="0.75" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
      <line x1="20" y1="6" x2="20" y2="34" stroke="currentColor" stroke-width="0.5" />
      <line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" stroke-width="0.5" />
    </svg>
  );
}
