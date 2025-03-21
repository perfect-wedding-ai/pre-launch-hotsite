'use client'

import { 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuPortal, 
  DropdownMenuSub, 
  DropdownMenuSubContent, 
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { redirectToLanguage } from '@/utils/language-cookie'
import { Locale } from '@/config/i18n.config'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faGlobe } from '@fortawesome/free-solid-svg-icons'

interface LanguageSelectorProps {
  currentLang: Locale
  t: {
    language: string
    languageNames: {
      pt: string
      en: string
      es: string
    }
  }
}

export default function LanguageSelector({ currentLang, t }: LanguageSelectorProps) {
  const [mounted, setMounted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleLanguageChange = (locale: Locale) => {
    if (locale === currentLang) return
    
    setIsChanging(true)
    redirectToLanguage(locale)
  }
  
  const languageOptions = [
    { code: 'pt' as Locale, name: t.languageNames.pt },
    { code: 'en' as Locale, name: t.languageNames.en },
    { code: 'es' as Locale, name: t.languageNames.es },
  ]
  
  // Se não estiver montado, renderizamos apenas o trigger sem funcionalidade
  if (!mounted) {
    return (
      <div className="flex items-center w-full px-2 py-1.5 text-sm">
        <FontAwesomeIcon icon={faGlobe} className="mr-2 h-4 w-4" />
        <span>{t.language}</span>
      </div>
    )
  }
  
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="w-full cursor-default focus:bg-accent">
        <div className="flex items-center w-full">
          <FontAwesomeIcon icon={faGlobe} className="mr-2 h-4 w-4" />
          <span>{t.language}</span>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="min-w-32">
          <DropdownMenuGroup>
            {languageOptions.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                disabled={isChanging}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex justify-between"
              >
                <span>{lang.name}</span>
                {currentLang === lang.code && (
                  <FontAwesomeIcon icon={faCheck} className="h-4 w-4 text-pink-400" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
} 