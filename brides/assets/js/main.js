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
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const weddingDate = document.getElementById('wedding-date').value;
            
            // Aqui você adicionaria o código para enviar os dados para um servidor
            // Por enquanto, vamos apenas mostrar uma mensagem de sucesso
            
            // Criar elemento de mensagem
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Obrigado, ${name}!</h3>
                <p>Seu cadastro foi realizado com sucesso. Em breve entraremos em contato para iniciar sua experiência com o DressAI.</p>
            `;
            
            // Substituir o formulário pela mensagem
            signupForm.innerHTML = '';
            signupForm.appendChild(successMessage);
            
            // Estilizar a mensagem
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '30px';
            successMessage.style.backgroundColor = 'var(--light-bg)';
            successMessage.style.borderRadius = 'var(--border-radius)';
            successMessage.style.boxShadow = 'var(--shadow)';
        });
    }
    
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
        const elements = document.querySelectorAll('.step, .benefit, .testimonial, .showcase-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar elementos com opacidade 0
    document.querySelectorAll('.step, .benefit, .testimonial, .showcase-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Executar animação no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}); 