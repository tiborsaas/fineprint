export default function Header() {
  return (
    <header class="flex items-center justify-between px-8 py-6 border-b border-charcoal/10">
      {/* Logo */}
      <a href="/" class="text-sm tracking-widest uppercase font-light hover:opacity-60 transition-opacity">
        FINEPRINT
      </a>

      {/* Navigation */}
      <nav class="hidden md:flex items-center gap-10">
        {[
          { href: "/gallery", label: "Gallery" },
          { href: "/studio", label: "Studio" },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            class="text-xs tracking-widest uppercase font-light text-muted hover:text-charcoal transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div class="flex items-center gap-6">
        <a
          href="/cart"
          class="text-xs tracking-widest uppercase font-light text-muted hover:text-charcoal transition-colors"
          aria-label="Shopping cart"
        >
          Cart
        </a>
        <a
          href="/account"
          class="text-xs tracking-widest uppercase font-light text-muted hover:text-charcoal transition-colors"
          aria-label="Account"
        >
          Account
        </a>
      </div>
    </header>
  );
}
