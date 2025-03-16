'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ConsentType, getConsent, saveConsent } from '@/utils/cookie-consent'

interface CookieConsentProps {
  translations: {
    title: string
    description: string
    acceptButton: string
    rejectButton: string
    learnMore: string
    privacyPolicy: string
  }
  locale: string
}

export default function CookieConsent({ translations, locale }: CookieConsentProps) {
  const [consent, setConsent] = useState<ConsentType>(undefined)
  const [visible, setVisible] = useState(false)

  // Verifica se o usuário já fez uma escolha ao carregar o componente
  useEffect(() => {
    const storedConsent = getConsent()
    setConsent(storedConsent)
    
    // Mostra o banner apenas se o usuário ainda não fez uma escolha
    if (storedConsent === undefined) {
      // Pequeno delay para não mostrar imediatamente ao carregar a página
      const timer = setTimeout(() => {
        setVisible(true)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [])

  // Função para lidar com a aceitação dos cookies
  const handleAccept = () => {
    saveConsent('accepted')
    setConsent('accepted')
    setVisible(false)
  }

  // Função para lidar com a rejeição dos cookies
  const handleReject = () => {
    saveConsent('rejected')
    setConsent('rejected')
    setVisible(false)
  }

  // Se o usuário já fez uma escolha ou o componente não está visível, não mostra nada
  if (consent !== undefined || !visible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg p-4 md:p-6 border-t border-neutral-200 animate-slide-up">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="font-medium text-lg">{translations.title}</h3>
          <p className="text-sm text-neutral-600">{translations.description}</p>
          <div className="text-sm text-neutral-500">
            <Link 
              href={`/${locale}/privacy-policy`} 
              className="underline hover:text-primary transition-colors"
            >
              {translations.privacyPolicy}
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 md:mt-0 w-full md:w-auto">
          <button
            onClick={handleReject}
            className="px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors"
          >
            {translations.rejectButton}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-primary border border-primary rounded-md text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {translations.acceptButton}
          </button>
        </div>
      </div>
    </div>
  )
} 