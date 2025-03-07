import { Montserrat, Playfair_Display } from 'next/font/google'
import { metadata } from './metadata'
import '../globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

export { metadata }

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={lang} className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        {/* Font Awesome será carregado via script para evitar problemas de hidratação */}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"
          integrity="sha512-GWzVrcGlo0TxTjwEjZEDSxVqzGnAYYXBwKhJiAqSWFT6ZP+nZf6xBY4JqiZZZWwNrTY+CRRTmFJ5NtJ3RBwJw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          defer
        />
      </head>
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  )
} 