'use client'

import Cookies from 'js-cookie'
import { Locale } from '@/config/i18n.config'

const LANGUAGE_COOKIE_KEY = 'preferred_language'
const COOKIE_EXPIRY_DAYS = 365

/**
 * Salva o idioma escolhido em um cookie
 * @param locale O código do idioma a ser salvo
 */
export function saveLanguagePreference(locale: Locale): void {
  Cookies.set(LANGUAGE_COOKIE_KEY, locale, { 
    expires: COOKIE_EXPIRY_DAYS, 
    path: '/',
    sameSite: 'lax'
  })
}

/**
 * Obtém o idioma salvo no cookie
 * @returns O código do idioma ou undefined se não houver cookie
 */
export function getLanguagePreference(): Locale | undefined {
  const language = Cookies.get(LANGUAGE_COOKIE_KEY) as Locale | undefined
  return language
}

/**
 * Remove o cookie de preferência de idioma
 */
export function clearLanguagePreference(): void {
  Cookies.remove(LANGUAGE_COOKIE_KEY, { path: '/' })
}

/**
 * Redireciona para a versão do site no idioma especificado
 * @param locale O código do idioma para o qual redirecionar
 */
export function redirectToLanguage(locale: Locale): void {
  // Salva a preferência primeiro
  saveLanguagePreference(locale)
  
  // Obtém o caminho atual
  const path = window.location.pathname
  
  // Verifica se o caminho já contém um prefixo de idioma
  const pathParts = path.split('/').filter(Boolean)
  const currentLocale = pathParts.length > 0 ? pathParts[0] : ''
  
  // Se o primeiro segmento for um dos idiomas suportados, substitui-o
  if (['pt', 'en', 'es'].includes(currentLocale)) {
    const newPath = '/' + locale + path.slice(3) // Remove o idioma atual (exemplo: /pt/) e adiciona o novo
    window.location.href = newPath
  } else {
    // Se não houver prefixo de idioma, adiciona-o
    window.location.href = '/' + locale + path
  }
} 