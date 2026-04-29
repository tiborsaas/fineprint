# FINEPRINT

**fineprint.hu** — High-end fine art print marketplace and generative art studio.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | [Deno](https://deno.land/) |
| Framework | [Fresh](https://fresh.deno.dev/) (SSR + Islands) |
| Styling | Tailwind CSS via [Twind](https://twind.style/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| Payments | [Stripe](https://stripe.com/) |

## Project Structure

```
fineprint/
├── routes/                 # Fresh file-system routing
│   ├── _app.tsx            # Root HTML shell
│   ├── _404.tsx            # Not-found page
│   ├── index.tsx           # Homepage (Gallery + Studio entry points)
│   ├── gallery/index.tsx   # Art Gallery & Print Store
│   ├── studio/index.tsx    # Generative Studio
│   └── api/
│       ├── artists.ts      # GET /api/artists
│       └── products.ts     # GET /api/products
├── components/             # Server-rendered Preact components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ArtistCard.tsx
├── islands/                # Client-side interactive components
│   └── StudioCanvas.tsx    # WebCanvas generative engine
├── utils/
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── db.ts               # Supabase client singleton
│   └── schema.sql          # Supabase database schema + RLS policies
├── static/
│   └── styles.css          # Global base styles
├── deno.json               # Deno config, import map, tasks
├── fresh.config.ts         # Fresh + Twind plugin config
├── fresh.gen.ts            # Auto-generated Fresh manifest
├── main.ts                 # Production entry point
├── dev.ts                  # Development entry point
└── twind.config.ts         # Tailwind theme extension
```

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) ≥ 1.41

### Environment Variables

```bash
cp .env.example .env
# Fill in SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_* keys
```

### Database

Run `utils/schema.sql` in the Supabase SQL Editor to create all tables and RLS policies.

### Development

```bash
deno task start
```

Open [http://localhost:8000](http://localhost:8000).

### Production Build

```bash
deno task build
deno task preview
```

### Type Check

```bash
deno task check
```

## Departments

### The Gallery (`/gallery`)

A curated marketplace where independent artists list high-quality fine art prints. We handle fulfillment and archival printing. Products come in two types:

- **Physical prints** — archival pigment prints shipped worldwide.
- **Algorithm presets** — generative art seeds purchasable for use in The Studio.

### The Studio (`/studio`)

A WebGL/Canvas sandbox where users interact with predefined generative algorithms. Features:

- **Algorithm Registry** — add new algorithms by adding a draw function to `islands/StudioCanvas.tsx`
- **Parameter controls** — seed, speed, density, color palette
- **Export** — download a PNG snapshot
- **Order** — render at full resolution and order a physical print

## Adding New Generative Algorithms

1. Write a pure draw function matching the `DrawFn` signature in `islands/StudioCanvas.tsx`:
   ```ts
   const myAlgorithm: DrawFn = (ctx, w, h, t, params) => { … };
   ```
2. Register it in the `ALGORITHMS` object at the bottom of the file:
   ```ts
   export const ALGORITHMS: Record<string, DrawFn> = {
     "my-algorithm": myAlgorithm,
     // existing algorithms…
   };
   ```

No other changes required — the Studio UI picks it up automatically.
