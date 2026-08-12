import type { NextConfig } from "next";

// Deployed as a GitHub Pages project site at /sentry-web/ — only apply the
// basePath/assetPrefix in CI (GITHUB_ACTIONS is set there) so local dev and
// `npm run build` stay at the root path.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions ? "/sentry-web" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    // Exposed to client code so /public asset URLs (via next/image with
    // unoptimized:true, which does NOT auto-prefix basePath) resolve
    // correctly once deployed under /sentry-web/.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
