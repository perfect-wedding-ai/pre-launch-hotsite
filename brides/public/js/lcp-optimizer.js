// Arquivo dedicado à otimização do LCP
// Este arquivo deve ser carregado o mais cedo possível

// IIFE para evitar poluição do escopo global
(function() {
    // Função para otimizar o LCP
    function optimizeLCP() {
        const lcpElement = document.getElementById('lcp-content');
        if (lcpElement) {
            // Aplicar estilos críticos diretamente
            lcpElement.style.cssText = `
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-size: 1.1rem;
                line-height: 1.6;
                color: #666666;
                display: block;
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
                animation: none !important;
                visibility: visible !important;
                contain: none !important;
            `;
            
            // Forçar repaint
            void lcpElement.offsetWidth;
        }
    }
    
    // Executar o mais cedo possível
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeLCP);
    } else {
        optimizeLCP();
    }
    
    // Executar novamente após o carregamento completo
    window.addEventListener('load', optimizeLCP);
    
    // Executar a cada 100ms nos primeiros 2 segundos para garantir
    let attempts = 0;
    const interval = setInterval(function() {
        optimizeLCP();
        attempts++;
        if (attempts >= 20) {
            clearInterval(interval);
        }
    }, 100);
})(); 