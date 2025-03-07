// Otimização extrema para LCP - Executado imediatamente
(function() {
    // Função para garantir que o LCP seja renderizado imediatamente
    function forceRenderLCP() {
        // Forçar o navegador a renderizar o texto LCP imediatamente
        const lcpElement = document.getElementById('lcp-content');
        if (lcpElement) {
            // Aplicar estilos críticos diretamente
            lcpElement.style.cssText = `
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                font-size: 18px;
                line-height: 1.6;
                color: #666666;
                display: block;
                max-width: 600px;
                margin-bottom: 2rem;
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
                animation: none !important;
                visibility: visible !important;
                contain: none !important;
                will-change: auto;
                content-visibility: visible;
            `;
            
            // Forçar repaint
            void lcpElement.offsetWidth;
            
            // Forçar o navegador a priorizar este elemento
            lcpElement.setAttribute('importance', 'high');
        }
    }
    
    // Executar imediatamente
    forceRenderLCP();
    
    // Executar novamente quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceRenderLCP);
    }
    
    // Executar novamente após o carregamento completo
    window.addEventListener('load', forceRenderLCP);
    
    // Executar a cada 50ms nos primeiros 500ms para garantir
    for (let i = 1; i <= 10; i++) {
        setTimeout(forceRenderLCP, i * 50);
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form Submission
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            // Não vamos mais prevenir o envio do formulário para permitir que o Mailchimp o processe
            // e.preventDefault();
            
            const name = document.getElementById('name').value;
            
            // Armazenar o nome para exibir na mensagem de sucesso após o retorno
            if (name) {
                localStorage.setItem('perfectWeddingUserName', name);
            }
            
            // O restante do código de manipulação do formulário será executado pelo Mailchimp
            
            // Opcionalmente, podemos adicionar um evento para quando o usuário retornar da página do Mailchimp
            // Isso pode ser implementado em uma página de agradecimento personalizada
        });
    }
    
    // Verificar se o usuário está retornando da página de inscrição do Mailchimp
    const checkForReturnFromMailchimp = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const fromMailchimp = urlParams.get('mailchimp');
        
        if (fromMailchimp === 'success') {
            const userName = localStorage.getItem('perfectWeddingUserName') || 'Noiva';
            const signupSection = document.getElementById('cadastro');
            
            if (signupSection) {
                const signupContent = signupSection.querySelector('.signup-content');
                
                if (signupContent) {
                    // Criar elemento de mensagem
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <h3>Obrigado, ${userName}!</h3>
                        <p>Seu cadastro foi realizado com sucesso. Em breve entraremos em contato para iniciar sua experiência com o Perfect Wedding.</p>
                    `;
                    
                    // Substituir o conteúdo pela mensagem
                    signupContent.innerHTML = '';
                    signupContent.appendChild(successMessage);
                    
                    // Estilizar a mensagem
                    successMessage.style.textAlign = 'center';
                    successMessage.style.padding = '30px';
                    successMessage.style.backgroundColor = 'var(--light-bg)';
                    successMessage.style.borderRadius = 'var(--border-radius)';
                    successMessage.style.boxShadow = 'var(--shadow)';
                }
            }
        }
    };
    
    // Executar verificação quando a página carregar
    window.addEventListener('load', checkForReturnFromMailchimp);
    
    // Smooth Scrolling para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header fixo com mudança de estilo ao rolar
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.padding = '20px 0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animação de entrada para elementos quando entram na viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.step, .benefit, .testimonial, .showcase-item, .section-header, .signup-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Garantir que a imagem principal seja carregada com prioridade
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        // Forçar carregamento prioritário
        heroImage.fetchPriority = 'high';
        
        // Adicionar evento para garantir que a imagem seja exibida assim que carregada
        heroImage.onload = function() {
            this.style.opacity = '1';
        };
        
        // Definir estilo inicial
        heroImage.style.opacity = '1';
    }
    
    // Inicializar elementos com opacidade 0
    document.querySelectorAll('.step, .benefit, .testimonial, .showcase-item, .section-header, .signup-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Garantir que a seção hero e seu conteúdo apareçam imediatamente
    document.querySelectorAll('.hero-content, .hero-image').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'none';
    });
    
    // Executar animação no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Testimonials Slider - navegação por botões
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        // Criar botões de navegação
        const sliderNav = document.createElement('div');
        sliderNav.className = 'slider-nav';
        sliderNav.innerHTML = `
            <button class="slider-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="slider-next"><i class="fas fa-chevron-right"></i></button>
        `;
        
        // Adicionar botões após o slider
        testimonialsSlider.parentNode.insertBefore(sliderNav, testimonialsSlider.nextSibling);
        
        // Estilizar botões
        const sliderButtons = document.querySelectorAll('.slider-nav button');
        sliderButtons.forEach(button => {
            button.style.width = '40px';
            button.style.height = '40px';
            button.style.borderRadius = '50%';
            button.style.backgroundColor = 'var(--primary-color)';
            button.style.color = 'var(--white)';
            button.style.border = 'none';
            button.style.margin = '0 5px';
            button.style.cursor = 'pointer';
            button.style.transition = 'all 0.3s ease';
        });
        
        // Estilizar container de botões
        sliderNav.style.display = 'flex';
        sliderNav.style.justifyContent = 'center';
        sliderNav.style.marginTop = '30px';
        
        // Funcionalidade dos botões
        const prevButton = document.querySelector('.slider-prev');
        const nextButton = document.querySelector('.slider-next');
        
        prevButton.addEventListener('click', () => {
            testimonialsSlider.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', () => {
            testimonialsSlider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
    
    // Adicionar efeito de hover nos botões
    document.querySelectorAll('.slider-nav button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
    
    // Adicionar indicadores de posição para o slider de depoimentos
    if (testimonialsSlider) {
        const testimonials = testimonialsSlider.querySelectorAll('.testimonial');
        
        if (testimonials.length > 0) {
            // Criar container de indicadores
            const indicators = document.createElement('div');
            indicators.className = 'slider-indicators';
            indicators.style.display = 'flex';
            indicators.style.justifyContent = 'center';
            indicators.style.gap = '8px';
            indicators.style.marginTop = '15px';
            
            // Adicionar indicadores
            for (let i = 0; i < testimonials.length; i++) {
                const indicator = document.createElement('span');
                indicator.className = i === 0 ? 'indicator active' : 'indicator';
                indicator.style.width = '10px';
                indicator.style.height = '10px';
                indicator.style.borderRadius = '50%';
                indicator.style.backgroundColor = i === 0 ? 'var(--primary-color)' : 'var(--light-bg)';
                indicator.style.cursor = 'pointer';
                indicator.style.transition = 'all 0.3s ease';
                
                indicator.addEventListener('click', () => {
                    // Calcular posição para scroll
                    const testimonialWidth = testimonials[0].offsetWidth;
                    const gap = 30; // gap entre os depoimentos
                    const scrollPosition = i * (testimonialWidth + gap);
                    
                    testimonialsSlider.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar indicador ativo
                    document.querySelectorAll('.indicator').forEach((ind, index) => {
                        ind.style.backgroundColor = index === i ? 'var(--primary-color)' : 'var(--light-bg)';
                    });
                });
                
                indicators.appendChild(indicator);
            }
            
            // Adicionar indicadores após os botões de navegação
            const sliderNav = document.querySelector('.slider-nav');
            if (sliderNav) {
                sliderNav.parentNode.insertBefore(indicators, sliderNav.nextSibling);
            } else {
                testimonialsSlider.parentNode.appendChild(indicators);
            }
            
            // Atualizar indicador ativo ao rolar
            testimonialsSlider.addEventListener('scroll', () => {
                const scrollPosition = testimonialsSlider.scrollLeft;
                const testimonialWidth = testimonials[0].offsetWidth;
                const gap = 30;
                
                const activeIndex = Math.round(scrollPosition / (testimonialWidth + gap));
                
                document.querySelectorAll('.indicator').forEach((ind, index) => {
                    ind.style.backgroundColor = index === activeIndex ? 'var(--primary-color)' : 'var(--light-bg)';
                });
            });
        }
    }
    
    // Otimização específica para o LCP - texto do hero
    const heroParagraph = document.querySelector('.hero-content p');
    if (heroParagraph) {
        // Aplicar estilos diretamente para garantir renderização imediata
        heroParagraph.style.cssText = 'opacity: 1 !important; transform: none !important; transition: none !important; animation: none !important; display: block; will-change: auto;';
        
        // Forçar repaint do elemento
        void heroParagraph.offsetWidth;
    }
    
    // Garantir que todos os elementos da seção hero sejam renderizados imediatamente
    document.querySelectorAll('.hero-content, .hero-image, .hero-content h1, .hero-content h2, .hero-content p').forEach(element => {
        element.style.cssText = 'opacity: 1 !important; transform: translateY(0) !important; transition: none !important; animation: none !important;';
        
        // Forçar repaint
        void element.offsetWidth;
    });
    
    // Garantir novamente que o LCP seja otimizado
    const lcpElement = document.getElementById('lcp-content');
    if (lcpElement) {
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
}); 