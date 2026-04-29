export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer class="border-t border-charcoal/10 px-8 py-10">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p class="text-xs tracking-widest uppercase font-light text-muted">
          &copy; {year} FINEPRINT
        </p>

        <nav class="flex flex-wrap justify-center gap-8">
          {[
            { href: "/gallery", label: "Gallery" },
            { href: "/studio", label: "Studio" },
            { href: "/about", label: "About" },
            { href: "/shipping", label: "Shipping" },
            { href: "/privacy", label: "Privacy" },
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

        <p class="text-xs tracking-wide font-light text-muted/50">Budapest, Hungary</p>
      </div>
    </footer>
  );
}
