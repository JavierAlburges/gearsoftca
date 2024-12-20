import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter( { subsets: ['latin'] } )

export const metadata: Metadata = {
  title: "GearSoftCA",
  verification: {google: "sIyRrMDGwLjnrlANbzwYf1tXWVcVNSjL_yf76grlDBo"},
  description: "Esta es una empresa de servicio digitales profesionales de diferentes áreas relacionada con las tecnologías de la información",
  openGraph: {
    title: "GearSoftCA",
    type: "website",
    url: "https://gearsoftca.vercel.app/",
    images: [
      {
        url: "https://www.gearsoftca.com/images/gearsoft-logo.png",
        width: 800,
        height: 600,
        alt: "GearSoftCA Logo",
      },
    ],
    description: "Esta es una empresa de servicio digitales profesionales de diferentes áreas relacionada con las tecnologías de la información",
  },
};

export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

