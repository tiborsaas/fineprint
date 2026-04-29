import { type Artist } from "../utils/types.ts";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <article class="group text-center">
      {/* Avatar */}
      <div class="w-16 h-16 rounded-full bg-charcoal/10 mx-auto mb-4 overflow-hidden">
        {artist.avatarUrl
          ? (
            <img
              src={artist.avatarUrl}
              alt={artist.name}
              class="w-full h-full object-cover"
              loading="lazy"
            />
          )
          : (
            <div class="w-full h-full flex items-center justify-center">
              <span class="text-xs text-muted/40 font-light">
                {artist.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
      </div>

      <h3 class="text-xs tracking-widest uppercase font-light mb-1">{artist.name}</h3>
      <p class="text-xs text-muted font-light leading-relaxed line-clamp-2">{artist.bio}</p>

      {artist.portfolioUrl && (
        <a
          href={artist.portfolioUrl}
          class="mt-2 inline-block text-xs tracking-wide text-muted/60 hover:text-charcoal transition-colors"
        >
          View Work →
        </a>
      )}
    </article>
  );
}
