// Prefixes a /public asset path with the deployment's basePath (empty
// locally, "/sentry-web" on GitHub Pages — see next.config.ts). Needed
// because next/image with images.unoptimized doesn't apply basePath
// automatically to plain string `src` values.
export function assetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
}
