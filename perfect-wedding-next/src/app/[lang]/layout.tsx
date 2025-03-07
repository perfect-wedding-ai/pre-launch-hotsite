import { Montserrat, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import { translations } from './translations'
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

// Importar os metadados traduzidos
import { metadataTranslations } from './metadata'

// Gerar metadados dinâmicos baseados no idioma
export async function generateMetadata({ params }: { params: { lang: 'pt' | 'en' | 'es' } }): Promise<Metadata> {
  const lang = params?.lang || 'pt'
  const meta = metadataTranslations[lang]

  return {
    metadataBase: new URL('https://perfectwedding.ai'),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      type: 'website',
      url: `https://perfectwedding.ai/${lang}`,
      images: [
        {
          url: '/assets/images/og-image.webp',
        },
      ],
    },
    robots: 'index, follow',
    icons: {
      icon: '/assets/icons/favicon.ico',
      shortcut: '/assets/icons/favicon.ico',
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'pt-BR': '/pt',
        'en-US': '/en',
        'es-ES': '/es',
      },
    },
  }
}

export async function generateStaticParams() {
  return [
    { lang: 'pt' },
    { lang: 'en' },
    { lang: 'es' }
  ]
}

export default function Layout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: 'pt' | 'en' | 'es' }
}) {
  const lang = params?.lang || 'pt'
  const t = translations[lang]
  const meta = metadataTranslations[lang]

  return (
    <html lang={params.lang} className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TGY4JXMX0F"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TGY4JXMX0F');
            `
          }}
        />

        {/* Font Awesome */}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"
          integrity="sha512-GWzVrcGlo0TxTjwEjZEDSxVqzGnAYYXBwKhJiAqSWFT6ZP+nZf6xBY4JqiZZZWwNrTY+CRRTmFJ5NtJ3RBwJw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          defer
        />

        {/* Schema.org markup para o site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Perfect Wedding",
              "url": `https://perfectwedding.ai/${lang}`,
              "description": meta.description,
              "inLanguage": lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : 'es-ES',
              "potentialAction": {
                "@type": "SearchAction",
                "target": `https://perfectwedding.ai/${lang}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Schema.org markup para FAQs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "inLanguage": lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : 'es-ES',
              "mainEntity": t.faq.questions.map(q => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": q.answer
                }
              }))
            })
          }}
        />
      </head>
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  )
} 