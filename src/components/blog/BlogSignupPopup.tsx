"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import BackgroundEffect from '@/components/BackgroundEffect';

interface BlogSignupPopupProps {
  lang: string;
  t: any;
}

const BlogSignupPopup: React.FC<BlogSignupPopupProps> = ({ lang, t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Verificar se o usuário já viu o popup nesta sessão
    const hasSeenPopupSession = sessionStorage.getItem('hasSeenBlogPopup');
    
    if (hasSeenPopupSession) {
      setHasSeenPopup(true);
    }
    
    const handleScroll = () => {
      // Mostrar o popup quando o usuário rolar até 75% da página
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      const threshold = scrollHeight * 0.75;
      
      if (currentScroll > threshold && !hasSeenPopup) {
        setIsVisible(true);
        setHasSeenPopup(true);
        sessionStorage.setItem('hasSeenBlogPopup', 'true');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasSeenPopup]);

  const closePopup = () => {
    setIsVisible(false);
  };

  // No servidor, não renderizamos nada
  if (!mounted) return null;

  if (!isVisible) return null;

  // Renderização do popup apenas no cliente
  return (
    <div className="fixed bottom-6 left-0 right-0 mx-auto max-w-xl z-50 blog-popup-appear">
      <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
        <BackgroundEffect className="rounded-2xl">
          <div className="p-6 relative">
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 transition-colors hover:bg-pink-50 rounded-full"
              aria-label={t.blog.popupCloseButton || "Fechar"}
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/3 relative">
                <div className="overflow-hidden rounded-lg">
                  <Image 
                    src="/assets/images/hero-bride-desktop.webp" 
                    alt={t.blog.popupImageAlt || "Noiva usando o Perfect Wedding"}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-pink-100 text-pink-700 p-2 rounded-full shadow-sm animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"/>
                  </svg>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2 font-playfair">
                  {t.blog.popupTitle || "Experimente Vestidos de Noiva Virtualmente"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t.blog.popupDescription || "Encontre o vestido perfeito sem sair de casa com nossa tecnologia de IA."}
                </p>
                
                <form 
                  id="popup-signup-form" 
                  className="space-y-3"
                  action="https://gmail.us8.list-manage.com/subscribe/post?u=67483d6202e3116de901adf0e&amp;id=f687178ad2"
                  method="post"
                >
                  <div>
                    <input 
                      type="text" 
                      id="popup-name" 
                      name="FNAME" 
                      placeholder={t.signup.form.name}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      id="popup-email" 
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
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary flex-1 hover:scale-105 transition-transform duration-300">
                      {t.blog.popupButton || "Quero Testar"}
                    </button>
                    <Link href={`/${lang}#${t.anchors.howItWorks}`} className="btn-secondary hover:bg-pink-50 transition-all duration-300">
                      {t.blog.popupLearnMore || "Saiba Mais"}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </BackgroundEffect>
      </div>
    </div>
  );
};

export default BlogSignupPopup; 