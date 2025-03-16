import React from 'react'
import { getTranslations } from '../translations'
import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateMetadata({ params }: { params: { lang: 'pt' | 'en' | 'es' } }): Promise<Metadata> {
  const t = getTranslations(params.lang)
  
  return {
    title: `${t.privacyPolicy.title} | Perfect Wedding`,
    description: t.privacyPolicy.introduction.content,
  }
}

export default function PrivacyPolicy({ params }: { params: { lang: 'pt' | 'en' | 'es' } }) {
  const { lang } = params
  const t = getTranslations(lang)
  const pp = t.privacyPolicy
  
  const today = new Date()
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
  
  return (
    <>
      <Header lang={lang} t={t} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-medium text-gray-800 mb-4">{pp.title}</h1>
            <p className="text-sm text-gray-500 mb-8">{pp.lastUpdated} {formattedDate}</p>

            {/* Introdução */}
            <section className="mb-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-3">{pp.introduction.title}</h2>
              <p className="text-gray-600">{pp.introduction.content}</p>
            </section>

            {/* Dados que coletamos */}
            <section className="mb-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-3">{pp.dataWeCollect.title}</h2>
              <p className="text-gray-600 mb-4">{pp.dataWeCollect.content}</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {pp.dataWeCollect.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-3">{pp.cookies.title}</h2>
              <p className="text-gray-600 mb-4">{pp.cookies.content}</p>
              <p className="text-gray-600 mb-2 font-medium">{pp.cookies.purposes}</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                {pp.cookies.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-600 mb-2">{pp.cookies.management}</p>
              <p className="text-gray-600">{pp.cookies.moreInfo}</p>
            </section>

            {/* Seus direitos */}
            <section className="mb-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-3">{pp.yourRights.title}</h2>
              <p className="text-gray-600 mb-4">{pp.yourRights.content}</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {pp.yourRights.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Alterações à política */}
            <section className="mb-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-3">{pp.changes.title}</h2>
              <p className="text-gray-600">{pp.changes.content}</p>
            </section>

            {/* Contato */}
            <section>
              <h2 className="text-2xl font-medium text-gray-800 mb-3">{pp.contact.title}</h2>
              <p className="text-gray-600">{pp.contact.content}</p>
            </section>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <Link 
                href={`/${lang}`}
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t.nav.howItWorks}
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer lang={lang} t={t} />
    </>
  )
} 