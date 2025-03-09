/**
 * Perfect Wedding - Otimizador de Imagens
 * 
 * Este script implementa:
 * 1. Lazy loading para imagens
 * 2. Carregamento de imagens responsivas baseado no tamanho da tela
 * 3. Substituição dinâmica de imagens por versões otimizadas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configuração de tamanhos para diferentes dispositivos
    const imageSizes = {
        mobile: {
            width: 480,
            suffix: '-mobile'
        },
        tablet: {
            width: 768,
            suffix: '-tablet'
        },
        desktop: {
            width: 1200,
            suffix: '-desktop'
        }
    };

    // Função para determinar qual tamanho de imagem usar
    function getImageSize() {
        const width = window.innerWidth;
        if (width <= imageSizes.mobile.width) {
            return imageSizes.mobile;
        } else if (width <= imageSizes.tablet.width) {
            return imageSizes.tablet;
        } else {
            return imageSizes.desktop;
        }
    }

    // Função para modificar o src da imagem para a versão otimizada
    function getOptimizedImageSrc(originalSrc, size) {
        // Verifica se a imagem já é uma versão otimizada
        if (originalSrc.includes('-mobile') || originalSrc.includes('-tablet') || originalSrc.includes('-desktop')) {
            return originalSrc;
        }

        // Divide o caminho da imagem para inserir o sufixo antes da extensão
        const lastDotIndex = originalSrc.lastIndexOf('.');
        if (lastDotIndex === -1) return originalSrc; // Se não tiver extensão, retorna o original

        const basePath = originalSrc.substring(0, lastDotIndex);
        const extension = originalSrc.substring(lastDotIndex);

        return `${basePath}${size.suffix}${extension}`;
    }

    // Função para aplicar lazy loading e imagens responsivas
    function setupImages() {
        const images = document.querySelectorAll('img');
        const currentSize = getImageSize();

        images.forEach(img => {
            // Identificar imagens críticas (acima da dobra)
            const isHeroImage = img.closest('.hero-image') !== null;
            const isFirstBenefitImage = img.closest('.benefits-grid .benefit:first-child') !== null;
            const isCriticalImage = isHeroImage || isFirstBenefitImage;
            
            // Aplicar lazy loading apenas em imagens não críticas
            if (!img.hasAttribute('loading') && !isCriticalImage) {
                img.setAttribute('loading', 'lazy');
            }

            // Adicionar srcset para imagens responsivas se não for um ícone ou imagem muito pequena
            if (!img.classList.contains('icon') && !img.parentElement.classList.contains('testimonial-author')) {
                const originalSrc = img.getAttribute('src');
                
                // Para imagens críticas, não modificamos o src, apenas adicionamos srcset
                if (!isCriticalImage) {
                    const optimizedSrc = getOptimizedImageSrc(originalSrc, currentSize);
                    // Atualiza o src para a versão otimizada
                    img.setAttribute('src', optimizedSrc);
                }
                
                // Adiciona srcset para diferentes tamanhos
                const mobileSrc = getOptimizedImageSrc(originalSrc, imageSizes.mobile);
                const tabletSrc = getOptimizedImageSrc(originalSrc, imageSizes.tablet);
                const desktopSrc = getOptimizedImageSrc(originalSrc, imageSizes.desktop);
                
                img.setAttribute('srcset', 
                    `${mobileSrc} ${imageSizes.mobile.width}w, 
                     ${tabletSrc} ${imageSizes.tablet.width}w, 
                     ${desktopSrc} ${imageSizes.desktop.width}w`
                );
                
                img.setAttribute('sizes', 
                    `(max-width: ${imageSizes.mobile.width}px) ${imageSizes.mobile.width}px, 
                     (max-width: ${imageSizes.tablet.width}px) ${imageSizes.tablet.width}px, 
                     ${imageSizes.desktop.width}px`
                );
            }
        });
    }

    // Configurar as imagens inicialmente
    setupImages();

    // Reconfigurar as imagens quando a janela for redimensionada
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupImages, 200);
    });
}); 