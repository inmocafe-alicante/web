import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    // Las fotos se ven como mucho a 640 px de ancho (480 de alto en 4:3);
    // 1920 cubre pantallas de alta densidad. Next nunca amplía por encima del
    // original (withoutEnlargement), así que no sale más grande que la foto subida.
    deviceSizes: [640, 750, 828, 1080, 1280, 1600, 1920],
  },
  async redirects() {
    return [{ source: '/', destination: '/es', permanent: false }];
  },
  async headers() {
    // Mientras no haya dominio ni OK de publicación (§8), nada se indexa.
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default nextConfig;
