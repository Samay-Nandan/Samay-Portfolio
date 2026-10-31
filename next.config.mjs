/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes plain HTML to /out, which can be
  // hosted anywhere (Vercel, Netlify, cPanel). Remove this when adding the
  // AI chat, which needs a server route.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
