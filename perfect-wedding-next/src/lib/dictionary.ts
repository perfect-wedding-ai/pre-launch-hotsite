import type { Locale } from '@/config/i18n.config'

const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    pt: () => import('./dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]()
} 