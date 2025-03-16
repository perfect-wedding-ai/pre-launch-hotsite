"use client"

import { useEffect } from 'react';

/**
 * Componente que garante que a scrollbar seja sempre visível
 * independentemente de outros componentes tentarem ocultá-la
 */
export default function ScrollbarPreserver() {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    
    // Adiciona classe ao body para preservar o espaço da scrollbar
    if (scrollbarWidth > 0) {
      document.documentElement.classList.add('has-scrollbar');
    }

    // Força a scrollbar ser sempre visível
    document.body.style.overflowY = 'scroll';
    document.body.style.paddingRight = '0px !important'; 
    document.body.style.marginRight = '0px !important';
    
    // Cria um MutationObserver para detectar mudanças no body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' && 
          mutation.attributeName === 'style' &&
          mutation.target === document.body
        ) {
          // Se o estilo do body for alterado, restauramos nossos estilos
          requestAnimationFrame(() => {
            document.body.style.overflowY = 'scroll';
            document.body.style.paddingRight = '0px';
            document.body.style.marginRight = '0px';
          });
        }
      });
    });
    
    // Inicia a observação do body
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    });
    
    return () => {
      // Limpa o observer quando o componente for desmontado
      observer.disconnect();
      document.documentElement.classList.remove('has-scrollbar');
    };
  }, []);
  
  // Este componente não renderiza nada visível
  return null;
} 