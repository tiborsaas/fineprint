import { type Product } from "../utils/types.ts";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isPreset = product.type === "algorithm_preset";
  const formattedPrice = (product.priceCents / 100).toLocaleString("hu-HU");

  return (
    <article class="group cursor-pointer">
      {/* Image placeholder / artwork thumbnail */}
      <div class="relative aspect-[3/4] bg-charcoal/5 mb-4 overflow-hidden">
        {product.imageUrl
          ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          )
          : (
            <div class="w-full h-full flex items-center justify-center">
              <span class="text-xs tracking-widest uppercase text-muted/30">
                {isPreset ? "Preset" : "Print"}
              </span>
            </div>
          )}

        {/* Type badge */}
        <div class="absolute top-3 left-3">
          <span
            class={`text-xs tracking-wider uppercase px-2 py-1 ${
              isPreset ? "bg-charcoal text-cream" : "bg-cream text-charcoal"
            }`}
          >
            {isPreset ? "Algorithm" : "Print"}
          </span>
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div class="absolute inset-0 bg-cream/70 flex items-center justify-center">
            <span class="text-xs tracking-widest uppercase text-muted">Sold Out</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 class="text-sm font-light tracking-wide uppercase mb-1">{product.title}</h3>
        <p class="text-xs text-muted tracking-wide mb-2 line-clamp-2">{product.description}</p>
        <p class="text-sm font-light tracking-wider">
          {product.priceCents === 0 ? "Free" : `${formattedPrice} HUF`}
        </p>
      </div>
    </article>
  );
}
