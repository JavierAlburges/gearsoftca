import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter( { subsets: ['latin'] } )

export const metadata: Metadata = {
  title: "GearSoftCA",
  verification: {google: "sIyRrMDGwLjnrlANbzwYf1tXWVcVNSjL_yf76grlDBo"},
  description: "Gearsoftca: Tu aliado tecnológico. Somos una empresa innovadora especializada en el desarrollo de software a medida. Creamos soluciones tecnológicas que impulsan el crecimiento de nuestros clientes. Nuestros servicios incluyen desarrollo web, aplicaciones móviles, y sistemas de gestión empresarial.",
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
    description: "Gearsoftca: Tu aliado tecnológico. Somos una empresa innovadora especializada en el desarrollo de software a medida. Creamos soluciones tecnológicas que impulsan el crecimiento de nuestros clientes. Nuestros servicios incluyen desarrollo web, aplicaciones móviles, y sistemas de gestión empresarial.",
  },
};

export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

