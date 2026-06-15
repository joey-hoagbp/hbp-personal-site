/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Single-page client-rendered portfolio — no SSR/API routes needed.
  // Static export emits real index.html files Amplify can serve directly.
  output: "export",
};

export default nextConfig;
