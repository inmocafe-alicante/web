import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { formats: ['image/webp'] },
  async redirects() {
    return [{ source: '/', destination: '/es', permanent: false }];
  },
  async headers() {
    // Mientras no haya dominio ni OK de publicación (§8), nada se indexa.
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default nextConfig;
