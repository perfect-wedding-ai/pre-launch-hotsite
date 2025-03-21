import { Montserrat, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { translations, getTranslations } from './translations'
import '../globals.css'
import { metadataTranslations, getMetadataTranslations } from './metadata'
import { Locale, i18n } from '@/config/i18n.config'
import Providers from '../providers'
import CookieConsent from '@/components/CookieConsent'
import { getBaseUrl, siteConfig } from '@/lib/utils/siteConfig'

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
  const metadata = getMetadataTranslations(lang);
  const t = getTranslations(lang);
  
  const title = metadata.title;
  const description = metadata.description;
  const baseUrl = getBaseUrl();
  
  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.ogTitle || title,
      description: metadata.ogDescription || description,
      type: 'website',
      url: baseUrl,
      images: [
        {
          url: `${baseUrl}/assets/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Perfect Wedding | AI Virtual Dress Try-On',
        },
      ],
    },
    robots: {
      index: process.env.NODE_ENV === 'production',
      follow: process.env.NODE_ENV === 'production',
      googleBot: {
        index: process.env.NODE_ENV === 'production',
        follow: process.env.NODE_ENV === 'production',
      },
    },
    icons: {
      icon: '/assets/icons/favicon.ico',
      shortcut: '/assets/icons/favicon.ico',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'x-default': `${baseUrl}/pt`,
        'pt-BR': `${baseUrl}/pt`,
        'en-US': `${baseUrl}/en`,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
    },
    applicationName: siteConfig.name,
    referrer: 'origin-when-cross-origin',
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      telephone: false,
    },
    category: 'planejamento de casamentos',
    other: {
      schemaWebsite: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Perfect Wedding",
        "url": `https://perfectwedding.ai/${lang}`,
        "description": description,
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
      }),
      'schema:organization': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.name,
        "url": `${baseUrl}/${lang}`,
        "logo": `${baseUrl}/images/logo.png`,
        "sameAs": ["https://www.facebook.com/perfectweddingai", "https://www.instagram.com/perfectweddingai/"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/${lang}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.ogTitle || title,
      description: metadata.ogDescription || description,
      images: ['/images/og-image.jpg'],
    },
  }
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: ValidLang }
}) {
  const { lang } = params;
  const t = getTranslations(lang);
  
  return (
    <html lang={lang} className={`${montserrat.variable} ${playfair.variable}`}>
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
        <Providers>
          {children}
          <CookieConsent translations={t.cookieConsent} locale={lang} />
        </Providers>

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