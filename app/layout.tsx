import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

const inter = Inter( { subsets: ['latin'] } )

export const metadata: Metadata = {
  title: "GearSoftCA",
  verification: {google: "sIyRrMDGwLjnrlANbzwYf1tXWVcVNSjL_yf76grlDBo"},
  description: "GearSoftCA: Expertos en desarrollo de aplicaciones móviles, diseño web y software para empresas en Maracaibo, Estado Zulia, Venezuela. ¡Solicita tu presupuesto y transforma tu negocio con soluciones innovadoras!",
  openGraph: {
    title: "GearSoftCA",
    type: "website",
    url: "https://gearsoftca.vercel.app/",
    images: [
      {
        url: "https://gearsoftca.vercel.app/images/gearsoftlogo.png",
        width: 800,
        height: 600,
        alt: "GearSoftCA Logo",
      },
    ],
    description: "GearSoftCA: Expertos en desarrollo de aplicaciones móviles, diseño web y software para empresas en Maracaibo, Estado Zulia, Venezuela. ¡Solicita tu presupuesto y transforma tu negocio con soluciones innovadoras!",
  },
};

export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
      <SpeedInsights />
    </html>
  )
}

