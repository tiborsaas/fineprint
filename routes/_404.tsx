import { Head } from "$fresh/runtime.ts";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — FINEPRINT</title>
      </Head>
      <div class="min-h-screen flex flex-col items-center justify-center bg-cream text-center px-6">
        <p class="text-xs tracking-widest uppercase text-muted mb-6">404</p>
        <h1 class="text-5xl font-thin tracking-wider uppercase mb-6">Not Found</h1>
        <p class="text-sm font-light text-muted tracking-wide mb-10">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          class="text-xs tracking-widest uppercase border border-charcoal/20 px-8 py-3 hover:bg-charcoal hover:text-cream transition-colors duration-300"
        >
          Return Home
        </a>
      </div>
    </>
  );
}
