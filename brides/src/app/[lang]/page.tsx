"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { imageAlts, translations } from './translations';

export default function Home({ params }: { params: { lang: 'pt' | 'en' | 'es' } }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const lang = params?.lang || 'pt';
  const alts = imageAlts[lang as keyof typeof imageAlts] || imageAlts.pt;
  const t = translations[lang as keyof typeof translations] || translations.pt;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

        .hero {
          overflow: hidden;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: -10%;
          left: -5%;
          width: 600px;
          height: 600px;
          border-radius: 9999px;
          background-color: #FFC0CB;
          opacity: 0.15;
          filter: blur(90px);
          z-index: 0;
          pointer-events: none;
        }
        
        .hero::after {
          content: '';
          position: absolute;
          bottom: -10%;
          right: -5%;
          width: 500px;
          height: 500px;
          border-radius: 9999px;
          background-color: #FFC0CB;
          opacity: 0.15;
          filter: blur(90px);
          z-index: 0;
          pointer-events: none;
        }
        
        .benefits {
          overflow: hidden;
        }
        
        .benefits::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -5%;
          width: 400px;
          height: 400px;
          border-radius: 9999px;
          background-color: #FFC0CB;
          opacity: 0.15;
          filter: blur(90px);
          z-index: 0;
          pointer-events: none;
        }
        
        .benefits::after {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -5%;
          width: 500px;
          height: 500px;
          border-radius: 9999px;
          background-color: #FFC0CB;
          opacity: 0.15;
          filter: blur(90px);
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      <header className="fixed w-full top-0 left-0 z-[1000] bg-white py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="logo">
              <h1 className="text-[28.8px] m-0 text-[rgb(90,90,90)]">Perfect Wedding</h1>
            </div>
            <nav>
              <ul className="flex gap-6">
                <li><Link href="#como-funciona" className="nav-link">{t.nav.howItWorks}</Link></li>
                <li><Link href="#beneficios" className="nav-link">{t.nav.benefits}</Link></li>
                <li><Link href="#faq" className="nav-link">{t.nav.faq}</Link></li>
              </ul>
            </nav>
            <div className="cta-button">
              <Link href="#cadastro" className="btn-primary">{t.nav.tryFree}</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="hero pt-24 pb-16 bg-light-bg relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,192,203,0.2)_0%,rgba(255,192,203,0)_70%)]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,192,203,0.2)_0%,rgba(255,192,203,0)_70%)]"></div>
        </div>
        <div className="container relative z-[1]">
          <div className="flex items-center justify-between relative z-10">
            <div className="hero-content flex-1 pr-12">
              <h1 className="text-5xl mb-4 leading-tight">
                {t.hero.title}
              </h1>
              <h2 className="text-2xl mb-6 text-gray-600 font-normal">
                {t.hero.subtitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                {t.hero.description}
              </p>
              <div className="flex gap-4">
                <Link href="#cadastro" className="btn-primary">
                  {t.hero.tryNow}
                </Link>
                <Link href="#como-funciona" className="btn-secondary">
                  {t.hero.learnMore}
                </Link>
              </div>
            </div>
            <div className="hero-image flex-1">
              <Image 
                src="/assets/images/hero-bride-desktop.webp"
                alt={alts.heroBride}
                width={600}
                height={338}
                priority
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="how-it-works py-16">
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

      <section id="beneficios" className="benefits py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,192,203,0.2)_0%,rgba(255,192,203,0)_70%)]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,192,203,0.2)_0%,rgba(255,192,203,0)_70%)]"></div>
        </div>
        <div className="container relative z-[1]">
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
            <div className="benefit bg-white p-6 rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.08)]">
              <div className="image-wrapper overflow-hidden rounded-lg">
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
          </div>
        </div>
      </section>

      <section id="depoimentos" className="testimonials py-16 bg-gray-50 hidden">
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

      <section id="cadastro" className="signup py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,192,203,0.2)_0%,rgba(255,192,203,0)_70%)]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,192,203,0.2)_0%,rgba(255,192,203,0)_70%)]"></div>
        </div>
        <div className="container relative z-[1]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="signup-content">
              <div className="text-center mb-12">
                <h2 className="text-4xl mb-4">{t.signup.title}</h2>
                <p className="text-center mx-auto text-[rgb(122,122,122)]">{t.signup.subtitle}</p>
              </div>
              <form 
                id="signup-form" 
                className="space-y-4"
                action="https://gmail.us8.list-manage.com/subscribe/post?u=67483d6202e3116de901adf0e&amp;id=f687178ad2"
                method="post"
                target="_blank"
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
      </section>

      <section id="faq" className="faq py-16 bg-gray-50">
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

      <footer className="bg-white text-gray-600 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="footer-logo">
              <h2 id="footer-title" className="text-2xl text-[rgb(90,90,90)] after:content-none">Perfect Wedding</h2>
              <p className="text-[rgb(90,90,90)]">{t.footer.description}</p>
            </div>
            <div className="footer-links">
              <h3 className="text-lg text-[rgb(90,90,90)] mb-4 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-[2px] after:bg-[rgb(255,192,203)]">{t.footer.quickLinks.title}</h3>
              <ul className="space-y-2">
                <li><Link href="#como-funciona" className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.howItWorks}</Link></li>
                <li><Link href="#beneficios" className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.benefits}</Link></li>
                <li><Link href="#faq" className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.faq}</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3 className="text-lg text-[rgb(90,90,90)] mb-4 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-[2px] after:bg-[rgb(255,192,203)]">{t.footer.contact.title}</h3>
              <p className="pl-[2px] text-[rgb(90,90,90)]">{t.footer.contact.email}</p>
            </div>
          </div>
          <div className="footer-bottom text-center border-t border-gray-200 pt-8 mt-12 flex flex-col items-center">
            <p className="mb-2 text-[rgb(90,90,90)] text-sm font-['Playfair Display'] text-center max-w-4xl mx-auto">{t.footer.copyright.text}</p>
            <p className="text-[rgb(90,90,90)] text-sm font-['Playfair Display'] text-center max-w-4xl mx-auto">{t.footer.copyright.tagline}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
