'use client'

import { Locale } from '@/config/i18n.config'
import { getConsent } from './cookie-consent'

// Nome do cookie para armazenar a preferência de idioma
const LANGUAGE_COOKIE_KEY = 'preferred_language'

// Verifica se pode usar cookies (apenas se o usuário aceitou)
function canUseCookies(): boolean {
  return getConsent() === 'accepted'
}

// Função para salvar a preferência de idioma em cookie
export function saveLanguagePreference(locale: Locale): void {
  if (typeof window === 'undefined') return
  
  // Salva em cookie apenas se o usuário aceitou cookies
  if (canUseCookies()) {
    const expirationDate = new Date()
    // Cookie válido por 1 ano
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    
    document.cookie = `${LANGUAGE_COOKIE_KEY}=${locale};expires=${expirationDate.toUTCString()};path=/;SameSite=Lax`
    console.log(`Preferência de idioma salva em cookie: ${locale}`)
  } else {
    console.log('Cookies não aceitos, preferência de idioma não foi salva')
  }
}

export function redirectToLanguage(locale: Locale): void {
  // Obtém o caminho atual
  const path = window.location.pathname
  
  // Verifica se o caminho já contém um prefixo de idioma
  const pathParts = path.split('/').filter(Boolean)
  const currentLocale = pathParts.length > 0 ? pathParts[0] : ''
  
  // Salva a preferência de idioma antes de redirecionar
  saveLanguagePreference(locale)
  
  // Se o primeiro segmento for um dos idiomas suportados, substitui-o
  if (['pt', 'en', 'es'].includes(currentLocale)) {
    const newPath = '/' + locale + path.slice(3) // Remove o idioma atual e adiciona o novo
    window.location.href = newPath
  } else {
    // Se não houver prefixo de idioma, adiciona-o
    window.location.href = '/' + locale + path
  }
} 