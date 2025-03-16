'use client'

/**
 * Funções para manipulação de cookies de consentimento
 * Utilizado para atender às leis da UE sobre cookies
 */

// Nome do cookie
const COOKIE_CONSENT_KEY = 'cookie-consent'

// Tipos de consentimento
export type ConsentType = 'accepted' | 'rejected' | undefined

// Função para salvar a escolha do usuário
export function saveConsent(consent: ConsentType): void {
  if (typeof window === 'undefined') return
  
  const expirationDate = new Date()
  // Cookie válido por 6 meses
  expirationDate.setMonth(expirationDate.getMonth() + 6)
  
  document.cookie = `${COOKIE_CONSENT_KEY}=${consent};expires=${expirationDate.toUTCString()};path=/;SameSite=Lax`
}

// Função para obter a escolha do usuário
export function getConsent(): ConsentType {
  if (typeof window === 'undefined') return undefined
  
  const cookies = document.cookie.split(';')
  const consentCookie = cookies.find(cookie => cookie.trim().startsWith(`${COOKIE_CONSENT_KEY}=`))
  
  if (!consentCookie) return undefined
  
  const consentValue = consentCookie.split('=')[1].trim()
  
  if (consentValue === 'accepted' || consentValue === 'rejected') {
    return consentValue
  }
  
  return undefined
}

// Função para limpar o cookie de consentimento
export function clearConsent(): void {
  if (typeof window === 'undefined') return
  
  const pastDate = new Date(0)
  document.cookie = `${COOKIE_CONSENT_KEY}=;expires=${pastDate.toUTCString()};path=/;SameSite=Lax`
} 