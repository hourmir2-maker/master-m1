import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MASTER ม.1 — แพลตฟอร์มการเรียนรู้และเตรียมสอบ',
    short_name: 'MASTER ม.1',
    description: 'ระบบเตรียมสอบเข้า ม.1, O-NET, NT ป.3, RT ป.1 ครบ 4 วิชาหลักพร้อมสูตรลัด 3 วินาที',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#FFF7ED',
    theme_color: '#EA580C',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
