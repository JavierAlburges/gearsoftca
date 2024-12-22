import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter( { subsets: ['latin'] } )

export const metadata: Metadata = {
  title: "GearSoftCA",
  verification: {google: "sIyRrMDGwLjnrlANbzwYf1tXWVcVNSjL_yf76grlDBo"},
  description: "Gearsoftca: Tu aliado tecnológico. Somos una empresa de desarrollo de software con una pasión por crear soluciones innovadoras. Desde pequeñas startups hasta grandes corporaciones, ayudamos a nuestros clientes a alcanzar sus objetivos digitales.",
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
    description: "Gearsoftca: Tu aliado tecnológico. Somos una empresa de desarrollo de software con una pasión por crear soluciones innovadoras. Desde pequeñas startups hasta grandes corporaciones, ayudamos a nuestros clientes a alcanzar sus objetivos digitales.",
  },
};

export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

