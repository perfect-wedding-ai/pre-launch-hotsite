import { getDictionary } from '@/lib/dictionary'
import type { Locale } from '@/config/i18n.config'
import Header from '@/components/Header'
import Hero from '@/components/Hero'

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <main>
      <Header dict={dict.navigation} />
      <Hero dict={dict.hero} />
    </main>
  )
} 