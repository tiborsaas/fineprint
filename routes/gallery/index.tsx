import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import ProductCard from "../../components/ProductCard.tsx";
import ArtistCard from "../../components/ArtistCard.tsx";
import { type Artist, type Product } from "../../utils/types.ts";

interface GalleryData {
  products: Product[];
  artists: Artist[];
}

export const handler: Handlers<GalleryData> = {
  async GET(_req, ctx) {
    // In production, fetch from Supabase/database.
    // Using stub data here for the scaffold.
    const products: Product[] = STUB_PRODUCTS;
    const artists: Artist[] = STUB_ARTISTS;
    return ctx.render({ products, artists });
  },
};

export default function Gallery({ data }: PageProps<GalleryData>) {
  const { products, artists } = data;

  return (
    <>
      <Head>
        <title>The Gallery — FINEPRINT</title>
        <meta name="description" content="Discover original fine art prints by independent artists." />
      </Head>

      <Header />

      <main class="flex-1 px-6 py-16">
        <div class="max-w-6xl mx-auto">
          {/* Page Header */}
          <div class="text-center mb-20">
            <p class="text-xs tracking-widest uppercase text-muted mb-4">Department I</p>
            <h1 class="text-4xl md:text-6xl font-thin tracking-wider uppercase">The Gallery</h1>
            <p class="mt-6 text-sm font-light text-muted tracking-wide max-w-md mx-auto">
              Original fine art prints by independent artists, produced with archival-grade
              materials and shipped worldwide.
            </p>
          </div>

          {/* Filter Bar */}
          <div class="flex items-center justify-between border-b border-charcoal/10 pb-4 mb-12">
            <div class="flex gap-6">
              {["All", "Photography", "Illustration", "Abstract", "Typography"].map((cat) => (
                <button
                  key={cat}
                  class="text-xs tracking-wider uppercase font-light text-muted hover:text-charcoal transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
            <span class="text-xs tracking-wide text-muted">{products.length} works</span>
          </div>

          {/* Product Grid */}
          <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </section>

          {/* Artists Section */}
          <section class="border-t border-charcoal/10 pt-16">
            <p class="text-xs tracking-widest uppercase text-muted text-center mb-12">
              Featured Artists
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              {artists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Stub data (replace with real DB calls)
// ---------------------------------------------------------------------------

const STUB_ARTISTS: Artist[] = [
  {
    id: "1",
    name: "Anna Varga",
    bio: "Budapest-based photographer exploring urban minimalism.",
    avatarUrl: "",
    portfolioUrl: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Bence Kovács",
    bio: "Abstract painter and digital artist working at the boundary of form.",
    avatarUrl: "",
    portfolioUrl: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Léa Dupont",
    bio: "Paris-based illustrator with a focus on botanical subjects.",
    avatarUrl: "",
    portfolioUrl: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Miro Santos",
    bio: "Generative artist and coder crafting algorithmic landscapes.",
    avatarUrl: "",
    portfolioUrl: "",
    createdAt: new Date().toISOString(),
  },
];

const STUB_PRODUCTS: Product[] = [
  {
    id: "p1",
    artistId: "1",
    title: "Morning Geometry",
    description: "Archival pigment print on 310gsm fine art paper.",
    type: "physical",
    priceCents: 28000,
    currency: "HUF",
    imageUrl: "",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p2",
    artistId: "2",
    title: "Noise Field #7",
    description: "Limited edition abstract print, signed and numbered.",
    type: "physical",
    priceCents: 42000,
    currency: "HUF",
    imageUrl: "",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p3",
    artistId: "4",
    title: "Vertex Drift — Algorithm Preset",
    description: "A generative algorithm preset for use in the Studio.",
    type: "algorithm_preset",
    priceCents: 5500,
    currency: "HUF",
    imageUrl: "",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p4",
    artistId: "3",
    title: "Herbarium I",
    description: "Botanical illustration series — archival print.",
    type: "physical",
    priceCents: 19000,
    currency: "HUF",
    imageUrl: "",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p5",
    artistId: "4",
    title: "Fractal Bloom — Algorithm Preset",
    description: "Recursive floral generative preset with parameter controls.",
    type: "algorithm_preset",
    priceCents: 7900,
    currency: "HUF",
    imageUrl: "",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p6",
    artistId: "1",
    title: "Dusk, Danube",
    description: "Fine art photograph, edition of 10.",
    type: "physical",
    priceCents: 65000,
    currency: "HUF",
    imageUrl: "",
    inStock: false,
    createdAt: new Date().toISOString(),
  },
];
