"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { imageAlts, translations, getTranslations } from './translations';
import OptimizedImage from '@/components/OptimizedImage';
import Header from '@/components/Header';
import BackgroundEffect from '@/components/BackgroundEffect';
import Footer from '@/components/Footer';
import BlogPreloader from '@/components/BlogPreloader';

type ValidLang = 'pt' | 'en' | 'es';

export default function Home({ params }: { params: { lang: ValidLang } }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const lang = (params?.lang || 'pt') as ValidLang;
  const alts = imageAlts[lang] || imageAlts.pt;
  const t = getTranslations(lang);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Renderização condicional do formulário de inscrição
  const renderSignupForm = () => {
    // No servidor, renderizamos uma versão simplificada para evitar problemas de hidratação
    if (!mounted) {
      return (
        <div className="space-y-4">
          <div>
            <div className="w-full px-4 py-2 rounded-lg border border-gray-300 h-10"></div>
          </div>
          <div>
            <div className="w-full px-4 py-2 rounded-lg border border-gray-300 h-10"></div>
          </div>
          <button className="btn-primary w-full">
            {t.signup.form.button}
          </button>
        </div>
      );
    }

    // No cliente, renderizamos o formulário completo
    return (
      <form 
        id="signup-form" 
        className="space-y-4"
        action="https://gmail.us8.list-manage.com/subscribe/post?u=67483d6202e3116de901adf0e&amp;id=f687178ad2"
        method="post"
      >
        <div>
          <input 
            type="text" 
            id="name" 
            name="FNAME" 
            placeholder={t.signup.form.name}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <input 
            type="email" 
            id="email" 
            name="EMAIL" 
            placeholder={t.signup.form.email}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input type="text" name="b_873506_f687178ad2" tabIndex={-1} />
        </div>
        <input type="hidden" name="REDIRECT" value={`/${lang}/thank-you`} />
        <button type="submit" className="btn-primary w-full">
          {t.signup.form.button}
        </button>
      </form>
    );
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
      `}</style>

      <Header lang={lang} t={t} />

      <BackgroundEffect className="pt-24 pb-16 bg-light-bg" highOpacity={false}>
        <div className="container relative z-[1]">
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="hero-content w-full md:flex-1 md:pr-12 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl mb-4 leading-tight">
                {t.hero.title}
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 text-gray-600 font-normal">
                {t.hero.subtitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                {t.hero.description}
              </p>
              <div className="flex gap-4">
                <Link href={`/${lang}#${t.anchors.signup}`} className="btn-primary">
                  {t.hero.tryNow}
                </Link>
                <Link href={`/${lang}#${t.anchors.howItWorks}`} className="btn-secondary">
                  {t.hero.learnMore}
                </Link>
              </div>
            </div>
            <div className="hero-image w-full md:flex-1">
              <OptimizedImage 
                src="/assets/images/hero-bride-desktop.webp"
                alt={alts.heroBride}
                width={600}
                height={338}
                priority
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </BackgroundEffect>

      <section id={t.anchors.howItWorks} className="how-it-works py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">{t.howItWorks.title}</h2>
            <p className="text-center mx-auto text-[rgb(122,122,122)]">{t.howItWorks.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="step text-center p-6 rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)]">
              <div className="step-icon mb-6">
                <i className="fas fa-camera"></i>
              </div>
              <h3 className="text-xl mb-2">{t.howItWorks.steps.uploadPhoto.title}</h3>
              <p className="text-[rgb(122,122,122)]">{t.howItWorks.steps.uploadPhoto.description}</p>
            </div>
            <div className="step text-center p-6 rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)]">
              <div className="step-icon mb-6">
                <i className="fas fa-tshirt"></i>
              </div>
              <h3 className="text-xl mb-2">{t.howItWorks.steps.chooseDresses.title}</h3>
              <p className="text-[rgb(122,122,122)]">{t.howItWorks.steps.chooseDresses.description}</p>
            </div>
            <div className="step text-center p-6 rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)]">
              <div className="step-icon mb-6">
                <i className="fas fa-wand-magic-sparkles"></i>
              </div>
              <h3 className="text-xl mb-2">{t.howItWorks.steps.seeTransformation.title}</h3>
              <p className="text-[rgb(122,122,122)]">{t.howItWorks.steps.seeTransformation.description}</p>
            </div>
            <div className="step text-center p-6 rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)]">
              <div className="step-icon mb-6">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="text-xl mb-2">{t.howItWorks.steps.findIdeal.title}</h3>
              <p className="text-[rgb(122,122,122)]">{t.howItWorks.steps.findIdeal.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section id={t.anchors.benefits} className="bg-gray-50">
        <BackgroundEffect className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-4">{t.benefits.title}</h2>
              <p className="text-center mx-auto text-[rgb(122,122,122)] leading-[25.6px]">{t.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="benefit bg-white rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="image-wrapper overflow-hidden">
                  <Image 
                    src="/assets/images/benefit-time-desktop.webp"
                    alt={alts.benefitTime}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="benefit-content text-center py-4 px-6">
                  <h3 className="text-[rgb(90,90,90)] text-2xl mb-2">{t.benefits.items.time.title}</h3>
                  <p className="text-[rgb(122,122,122)] leading-[25.6px]">{t.benefits.items.time.description}</p>
                </div>
              </div>
              <div className="benefit bg-white rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="image-wrapper overflow-hidden">
                  <Image 
                    src="/assets/images/benefit-stress.webp"
                    alt={alts.benefitStress}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="benefit-content text-center py-4 px-6">
                  <h3 className="text-[rgb(90,90,90)] text-2xl mb-2">{t.benefits.items.stress.title}</h3>
                  <p className="text-[rgb(122,122,122)] leading-[25.6px]">{t.benefits.items.stress.description}</p>
                </div>
              </div>
              <div className="benefit bg-white rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="image-wrapper overflow-hidden">
                  <Image 
                    src="/assets/images/benefit-options.webp"
                    alt={alts.benefitOptions}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="benefit-content text-center py-4 px-6">
                  <h3 className="text-[rgb(90,90,90)] text-2xl mb-2">{t.benefits.items.options.title}</h3>
                  <p className="text-[rgb(122,122,122)] leading-[25.6px]">{t.benefits.items.options.description}</p>
                </div>
              </div>
              <div className="benefit bg-white rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="image-wrapper overflow-hidden">
                  <Image 
                    src="/assets/images/benefit-confidence.webp"
                    alt={alts.benefitConfidence}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="benefit-content text-center py-4 px-6">
                  <h3 className="text-[rgb(90,90,90)] text-2xl mb-2">{t.benefits.items.confidence.title}</h3>
                  <p className="text-[rgb(122,122,122)] leading-[25.6px]">{t.benefits.items.confidence.description}</p>
                </div>
              </div>
            </div>
          </div>
        </BackgroundEffect>
      </section>

      <section className="showcase py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">{t.showcase.title}</h2>
            <p className="text-center mx-auto text-[rgb(122,122,122)] leading-[25.6px]">{t.showcase.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="showcase-item bg-white p-6 rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.08)]">
              <div className="before-after grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="before relative overflow-hidden rounded-lg">
                  <span className="absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full text-sm">{t.showcase.labels.before}</span>
                  <div className="image-wrapper overflow-hidden rounded-lg">
                    <Image 
                      src="/assets/images/before-2.webp"
                      alt={alts.before2}
                      width={450}
                      height={450}
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="after relative overflow-hidden rounded-lg">
                  <span className="absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full text-sm">{t.showcase.labels.after}</span>
                  <div className="image-wrapper overflow-hidden rounded-lg">
                    <Image 
                      src="/assets/images/after-2.webp"
                      alt={alts.after2}
                      width={450}
                      height={450}
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="showcase-item bg-white p-6 rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.08)]">
              <div className="before-after grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="before relative overflow-hidden rounded-lg">
                  <span className="absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full text-sm">{t.showcase.labels.before}</span>
                  <div className="image-wrapper overflow-hidden rounded-lg">
                    <Image 
                      src="/assets/images/before-1.webp"
                      alt={alts.before1}
                      width={450}
                      height={450}
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="after relative overflow-hidden rounded-lg">
                  <span className="absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full text-sm">{t.showcase.labels.after}</span>
                  <div className="image-wrapper overflow-hidden rounded-lg">
                    <Image 
                      src="/assets/images/after-1.webp"
                      alt={alts.after1}
                      width={450}
                      height={450}
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id={t.anchors.testimonials} className="testimonials py-16 bg-gray-50 hidden">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">O Que Nossas Noivas Dizem</h2>
            <p className="text-center mx-auto text-[rgb(122,122,122)]">Experiências reais com o Perfect Wedding</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial bg-white p-6 rounded-lg shadow-sm">
              <div className="testimonial-content mb-6">
                <p className="text-gray-600 italic">"Economizei semanas de buscas! Experimentei mais de 50 vestidos virtualmente e fui direto para os 3 que mais gostei. Encontrei o vestido dos sonhos online na primeira visita ao ateliê!"</p>
              </div>
              <div className="testimonial-author flex items-center">
                <Image 
                  src="/assets/images/testimonial-1.webp"
                  alt="Mariana Silva - Noiva satisfeita com a experiência"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Mariana Silva</h4>
                  <p className="text-sm text-gray-600">Noiva de Junho/2023</p>
                </div>
              </div>
            </div>
            <div className="testimonial bg-white p-6 rounded-lg shadow-sm">
              <div className="testimonial-content mb-6">
                <p className="text-gray-600 italic">"Moro no interior e teria que viajar várias vezes para a capital para provar vestidos. Com o Perfect Wedding, já fui sabendo exatamente o que queria e economizei tempo e dinheiro!"</p>
              </div>
              <div className="testimonial-author flex items-center">
                <Image 
                  src="/assets/images/testimonial-2.webp"
                  alt="Carolina Mendes - Noiva que economizou tempo e dinheiro"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Carolina Mendes</h4>
                  <p className="text-sm text-gray-600">Noiva de Outubro/2023</p>
                </div>
              </div>
            </div>
            <div className="testimonial bg-white p-6 rounded-lg shadow-sm">
              <div className="testimonial-content mb-6">
                <p className="text-gray-600 italic">"Eu estava insegura sobre qual estilo combinaria comigo. O Perfect Wedding me permitiu experimentar estilos que eu nunca teria considerado e acabei me apaixonando por um modelo totalmente diferente do que imaginava!"</p>
              </div>
              <div className="testimonial-author flex items-center">
                <Image 
                  src="/assets/images/testimonial-3.webp"
                  alt="Fernanda Costa - Noiva que descobriu um estilo inesperado"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Fernanda Costa</h4>
                  <p className="text-sm text-gray-600">Noiva de Março/2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackgroundEffect className="py-16">
        <div className="container">
          <div id={t.anchors.signup} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="signup-content">
              <div className="text-center mb-12">
                <h2 className="text-4xl mb-4">{t.signup.title}</h2>
                <p className="text-center mx-auto text-[rgb(122,122,122)]">{t.signup.subtitle}</p>
              </div>
              {renderSignupForm()}
            </div>
            <div className="signup-image overflow-hidden rounded-lg">
              <Image 
                src="/assets/images/signup-bride.webp"
                alt={alts.signupBride}
                width={600}
                height={400}
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </BackgroundEffect>

      <section id={t.anchors.faq} className="faq py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">{t.faq.title}</h2>
            <p className="text-center mx-auto text-[rgb(122,122,122)]">{t.faq.subtitle}</p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {t.faq.questions.map((faq, index) => (
              <div 
                key={index}
                className={`faq-item bg-white rounded-lg shadow-[0px_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0px_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer py-4 px-6 ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                    <i className={`fas fa-chevron-down text-pink-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}></i>
                  </div>
                </div>
                {openFaq === index && (
                  <div className="text-gray-600 mt-4">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} t={t} />
      
      {/* Precarregar dados do blog em segundo plano */}
      <BlogPreloader lang={lang} />
    </>
  );
}
