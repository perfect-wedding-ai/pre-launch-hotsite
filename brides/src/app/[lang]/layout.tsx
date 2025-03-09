import { Montserrat, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
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
  const t = translations[lang]

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
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
      schemaWebsite: JSON.stringify({
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
      }),
      schemaFAQ: JSON.stringify({
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
    }
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
  return (
    <html lang={params.lang} className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  )
} 