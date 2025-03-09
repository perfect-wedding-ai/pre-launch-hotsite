import { Montserrat, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { translations } from './translations'
import '../globals.css'
import { metadataTranslations } from './metadata'

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

type ValidLang = 'pt' | 'en' | 'es';

export async function generateMetadata({ params }: { params: { lang: ValidLang } }): Promise<Metadata> {
  const lang = (params?.lang || 'pt') as ValidLang;
  const metadata = metadataTranslations[lang] || metadataTranslations.pt;
  const t = translations[lang] || translations.pt;

  return {
    metadataBase: new URL('https://perfectwedding.ai'),
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
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
        "description": metadata.description,
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
        "mainEntity": t.faq.questions.map((q: { question: string; answer: string }) => ({
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

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: ValidLang }
}) {
  return (
    <html lang={params.lang} className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
        <link
          rel="preload"
          as="image"
          href="/assets/images/hero-bride-desktop.webp"
          type="image/webp"
        />
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