import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/**
 * Exported as a function so the build can pick its own distDir.
 *
 * `next dev` and `next build` both default to .next, so running the build
 * gate while a dev server is up replaces the running server's chunks under
 * it — every asset then 404s and the page renders with no CSS. Giving the
 * build its own directory makes the two safe to run at the same time.
 * The static export still lands in out/, which is what Cloudflare Pages
 * publishes, so this is invisible to the deployment.
 *
 * @type {import('next').NextConfig}
 */
export default function nextConfig(phase) {
  return {
    reactStrictMode: true,
    // Single-page client-rendered portfolio — no SSR/API routes needed.
    // Static export emits real index.html files Cloudflare Pages can serve.
    output: "export",
    // Static export can't run the Image Optimization API, so serve images as-is.
    images: { unoptimized: true },
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : ".next-build",
  };
}
