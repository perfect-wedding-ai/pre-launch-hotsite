'use client'

import { Locale } from '@/config/i18n.config'

export function redirectToLanguage(locale: Locale): void {
  // Obtém o caminho atual
  const path = window.location.pathname
  
  // Verifica se o caminho já contém um prefixo de idioma
  const pathParts = path.split('/').filter(Boolean)
  const currentLocale = pathParts.length > 0 ? pathParts[0] : ''
  
  // Se o primeiro segmento for um dos idiomas suportados, substitui-o
  if (['pt', 'en', 'es'].includes(currentLocale)) {
    const newPath = '/' + locale + path.slice(3) // Remove o idioma atual e adiciona o novo
    window.location.href = newPath
  } else {
    // Se não houver prefixo de idioma, adiciona-o
    window.location.href = '/' + locale + path
  }
} 