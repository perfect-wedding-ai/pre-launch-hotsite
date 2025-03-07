/**
 * Script de Lazy Loading e Imagens Responsivas para o Perfect Wedding
 * 
 * Este script implementa:
 * 1. Carregamento preguiçoso (lazy loading) de imagens
 * 2. Carregamento de imagens responsivas baseado no tamanho da tela
 * 3. Uso preferencial de WebP com fallback para formatos tradicionais
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações
  const config = {
    // Tamanhos de tela para imagens responsivas
    breakpoints: {
      mobile: 480,
      tablet: 768,
      desktop: 1200
    },
    // Margem para começar a carregar antes da imagem entrar na viewport
    rootMargin: '50px 0px',
    // Caminho base para as imagens
    imagePath: '/assets/images/'
  };

  // Verifica suporte a WebP
  const supportsWebP = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };
  
  const hasWebP = supportsWebP();
  console.log(`Suporte a WebP: ${hasWebP ? 'Sim' : 'Não'}`);

  // Determina o sufixo de tamanho com base na largura da tela
  const getSizeSuffix = () => {
    const width = window.innerWidth;
    if (width <= config.breakpoints.mobile) return 'mobile';
    if (width <= config.breakpoints.tablet) return 'tablet';
    return 'desktop';
  };

  // Obtém o caminho da imagem responsiva
  const getResponsiveImagePath = (originalSrc, sizeSuffix) => {
    const path = originalSrc.split('/');
    const filename = path.pop();
    const [name, ext] = filename.split('.');
    
    // Verifica se já é uma imagem responsiva
    if (name.includes('-mobile') || name.includes('-tablet') || name.includes('-desktop')) {
      return originalSrc;
    }
    
    // Constrói o caminho para a imagem responsiva
    const newFilename = `${name}-${sizeSuffix}.${hasWebP ? 'webp' : ext}`;
    return [...path, newFilename].join('/');
  };

  // Função para carregar a imagem
  const loadImage = (img) => {
    const originalSrc = img.dataset.src;
    if (!originalSrc) return;
    
    const sizeSuffix = getSizeSuffix();
    const responsiveSrc = getResponsiveImagePath(originalSrc, sizeSuffix);
    
    // Tenta carregar a imagem responsiva
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = responsiveSrc;
      img.classList.add('loaded');
    };
    tempImg.onerror = () => {
      // Fallback para a imagem original se a responsiva não existir
      console.warn(`Imagem responsiva não encontrada: ${responsiveSrc}, usando original.`);
      img.src = originalSrc;
      img.classList.add('loaded');
    };
    tempImg.src = responsiveSrc;
  };

  // Configura o Intersection Observer para lazy loading
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: config.rootMargin
  });

  // Aplica lazy loading a todas as imagens com data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });

  // Recarrega imagens quando a janela é redimensionada (para responsividade)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.querySelectorAll('img.loaded').forEach(img => {
        if (img.dataset.src) {
          const sizeSuffix = getSizeSuffix();
          const responsiveSrc = getResponsiveImagePath(img.dataset.src, sizeSuffix);
          
          // Só atualiza se for diferente da src atual
          if (img.src !== responsiveSrc) {
            img.src = responsiveSrc;
          }
        }
      });
    }, 250); // Debounce de 250ms
  });

  console.log('Lazy loading e imagens responsivas inicializados.');
}); 