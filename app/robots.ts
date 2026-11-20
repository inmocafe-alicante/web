import type { MetadataRoute } from 'next';
import { INDEXAR } from '@/lib/sitio';

export default function robots(): MetadataRoute.Robots {
  return INDEXAR ? { rules: { userAgent: '*', allow: '/' } } : { rules: { userAgent: '*', disallow: '/' } };
}
