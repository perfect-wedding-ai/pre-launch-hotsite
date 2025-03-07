import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="fixed w-full top-0 left-0 z-[1000] bg-white py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="logo">
              <h1 className="text-[28.8px] m-0 text-[rgb(90,90,90)]">Perfect Wedding</h1>
            </div>
            <nav>
              <ul className="flex gap-6">
                <li><Link href="#como-funciona" className="nav-link">Como Funciona</Link></li>
                <li><Link href="#beneficios" className="nav-link">Benefícios</Link></li>
                <li><Link href="#faq" className="nav-link">Perguntas Frequentes</Link></li>
              </ul>
            </nav>
            <div className="cta-button">
              <Link href="#cadastro" className="btn-primary">Experimente Grátis</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="hero pt-24 pb-16 bg-light-bg">
        <div className="container">
          <div className="flex items-center justify-between relative z-10">
            <div className="hero-content flex-1 pr-12">
              <h1 className="text-5xl mb-4 leading-tight">
                Experimente Vestidos de Noiva Virtualmente
              </h1>
              <h2 className="text-2xl mb-6 text-gray-600 font-normal">
                Descubra o vestido dos seus sonhos sem sair de casa
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Economize tempo e encontre o vestido perfeito antes mesmo de ir ao ateliê. 
                Nossa tecnologia de inteligência artificial permite que você experimente 
                dezenas de modelos exclusivos em segundos com nossa prova virtual de vestidos.
              </p>
              <div className="flex gap-4">
                <Link href="#cadastro" className="btn-primary">
                  Experimente Agora
                </Link>
                <Link href="#como-funciona" className="btn-secondary">
                  Saiba Mais
                </Link>
              </div>
            </div>
            <div className="hero-image flex-1">
              <Image 
                src="/assets/images/hero-bride-desktop.webp"
                alt="Noiva experimentando vestido virtual com tecnologia de IA"
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
            <h2 className="text-4xl mb-4">Como Funciona o Teste de Vestidos Online</h2>
            <p className="text-xl text-gray-600">Experimente vestidos de noiva virtualmente com apenas alguns cliques</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="step text-center">
              <div className="step-icon mb-4 text-4xl text-primary">
                <i className="fas fa-camera"></i>
              </div>
              <h3 className="text-xl mb-2">Envie sua Foto</h3>
              <p className="text-gray-600">Faça o upload de uma foto sua em posição natural para iniciar seu ensaio virtual de vestidos</p>
            </div>
            <div className="step text-center">
              <div className="step-icon mb-4 text-4xl text-primary">
                <i className="fas fa-tshirt"></i>
              </div>
              <h3 className="text-xl mb-2">Escolha os Vestidos</h3>
              <p className="text-gray-600">Navegue por nossa coleção de centenas de modelos exclusivos em nosso ateliê virtual</p>
            </div>
            <div className="step text-center">
              <div className="step-icon mb-4 text-4xl text-primary">
                <i className="fas fa-magic"></i>
              </div>
              <h3 className="text-xl mb-2">Veja a Transformação</h3>
              <p className="text-gray-600">Nossa tecnologia para noivas cria imagens realistas de você usando os vestidos escolhidos</p>
            </div>
            <div className="step text-center">
              <div className="step-icon mb-4 text-4xl text-primary">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="text-xl mb-2">Descubra o Vestido Ideal</h3>
              <p className="text-gray-600">Salve seus favoritos e agende visitas apenas para os modelos que você realmente amou</p>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="benefits py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Benefícios</h2>
            <p className="text-xl text-gray-600">Por que usar o Perfect Wedding para encontrar seu vestido de noiva</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="benefit">
              <Image 
                src="/assets/images/benefit-time-desktop.webp"
                alt="Ilustração mostrando economia de tempo ao experimentar vestidos virtualmente"
                width={400}
                height={200}
                className="rounded-lg mb-4"
              />
              <div className="benefit-content">
                <h3 className="text-2xl mb-2">Economize Tempo</h3>
                <p className="text-gray-600">Experimente dezenas de vestidos em minutos, não em semanas</p>
              </div>
            </div>
            <div className="benefit">
              <Image 
                src="/assets/images/benefit-stress.webp"
                alt="Noiva sorrindo, representando menos estresse com a prova virtual de vestidos"
                width={400}
                height={200}
                className="rounded-lg mb-4"
              />
              <div className="benefit-content">
                <h3 className="text-2xl mb-2">Menos Estresse</h3>
                <p className="text-gray-600">Evite visitas cansativas a múltiplas lojas e ateliês</p>
              </div>
            </div>
            <div className="benefit">
              <Image 
                src="/assets/images/benefit-options.webp"
                alt="Diversos modelos de vestidos de noiva exibidos, destacando a variedade exclusiva"
                width={400}
                height={200}
                className="rounded-lg mb-4"
              />
              <div className="benefit-content">
                <h3 className="text-2xl mb-2">Mais Opções</h3>
                <p className="text-gray-600">Acesso a estilos exclusivos que podem não estar disponíveis localmente</p>
              </div>
            </div>
            <div className="benefit">
              <Image 
                src="/assets/images/benefit-confidence.webp"
                alt="Noiva confiante após experimentar vestidos virtualmente antes da prova real"
                width={400}
                height={200}
                className="rounded-lg mb-4"
              />
              <div className="benefit-content">
                <h3 className="text-2xl mb-2">Tenha Mais Confiança</h3>
                <p className="text-gray-600">Vá às provas reais já sabendo o que combina com você</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Veja o Perfect Wedding em Ação</h2>
            <p className="text-xl text-gray-600">Transformações reais usando nossa tecnologia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="showcase-item">
              <div className="before-after grid grid-cols-2 gap-4">
                <div className="before relative">
                  <Image 
                    src="/assets/images/before-1.webp"
                    alt="Antes da prova virtual de vestido de noiva"
                    width={450}
                    height={450}
                    className="rounded-lg"
                  />
                  <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm">Antes</span>
                </div>
                <div className="after relative">
                  <Image 
                    src="/assets/images/after-1.webp"
                    alt="Depois da prova virtual de vestido de noiva"
                    width={450}
                    height={450}
                    className="rounded-lg"
                  />
                  <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm">Depois</span>
                </div>
              </div>
            </div>
            <div className="showcase-item">
              <div className="before-after grid grid-cols-2 gap-4">
                <div className="before relative">
                  <Image 
                    src="/assets/images/before-2.webp"
                    alt="Antes da prova virtual de vestido de noiva"
                    width={450}
                    height={450}
                    className="rounded-lg"
                  />
                  <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm">Antes</span>
                </div>
                <div className="after relative">
                  <Image 
                    src="/assets/images/after-2.webp"
                    alt="Depois da prova virtual de vestido de noiva"
                    width={450}
                    height={450}
                    className="rounded-lg"
                  />
                  <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm">Depois</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="testimonials py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">O Que Nossas Noivas Dizem</h2>
            <p className="text-xl text-gray-600">Experiências reais com o Perfect Wedding</p>
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

      <section id="cadastro" className="signup py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="signup-content">
              <h2 className="text-4xl mb-4">Experimente Gratuitamente</h2>
              <p className="text-xl text-gray-600 mb-8">Seja uma das primeiras a testar nossa tecnologia revolucionária de prova virtual de vestidos</p>
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
                    placeholder="Seu Nome" 
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    id="email" 
                    name="EMAIL" 
                    placeholder="Seu E-mail" 
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                  <input type="text" name="b_873506_f687178ad2" tabIndex={-1} />
                </div>
                <input type="hidden" name="REDIRECT" value="https://perfectwedding.netlify.app/thank-you.html" />
                <button type="submit" className="btn-primary w-full">
                  Quero Experimentar
                </button>
              </form>
            </div>
            <div className="signup-image">
              <Image 
                src="/assets/images/signup-bride.webp"
                alt="Noiva feliz após encontrar o vestido perfeito"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600">Tire suas dúvidas sobre o Perfect Wedding e nossa tecnologia para noivas</p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="faq-item bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Como funciona a prova virtual de vestidos de noiva?</h3>
              <p className="text-gray-600">Nossa tecnologia de inteligência artificial analisa sua foto e cria imagens realistas de como você ficaria usando diferentes vestidos de noiva. O processo é simples: você envia uma foto, escolhe os vestidos que deseja experimentar em nosso ateliê virtual e nossa IA gera as imagens em poucos segundos.</p>
            </div>
            <div className="faq-item bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">As imagens são realistas?</h3>
              <p className="text-gray-600">Sim! Nossa tecnologia de ponta cria imagens extremamente realistas, considerando seu tipo de corpo, tom de pele e características físicas para mostrar como o vestido ficaria em você de verdade.</p>
            </div>
            <div className="faq-item bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Quanto custa usar o Perfect Wedding?</h3>
              <p className="text-gray-600">Atualmente estamos em fase de testes e oferecendo acesso gratuito para um número limitado de noivas. Cadastre-se agora para garantir sua vaga!</p>
            </div>
            <div className="faq-item bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Posso experimentar vestidos de qualquer marca?</h3>
              <p className="text-gray-600">Nossa biblioteca inclui dezenas de modelos exclusivos de diversos estilos. Estamos constantemente expandindo nossa coleção para incluir mais opções e marcas.</p>
            </div>
            <div className="faq-item bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Como faço para comprar o vestido depois?</h3>
              <p className="text-gray-600">O Perfect Wedding é uma ferramenta para ajudar você a descobrir o estilo perfeito antes de visitar ateliês. Após encontrar os modelos que mais gostou, fornecemos informações sobre onde encontrá-los ou modelos similares em lojas e ateliês parceiros.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="footer-logo">
              <h2 className="text-2xl mb-4">Perfect Wedding</h2>
              <p className="text-gray-400">Encontre o vestido dos seus sonhos online com a ajuda da inteligência artificial</p>
            </div>
            <div className="footer-links">
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link href="#como-funciona" className="text-gray-400 hover:text-white transition-colors">Como Funciona</Link></li>
                <li><Link href="#beneficios" className="text-gray-400 hover:text-white transition-colors">Benefícios</Link></li>
                <li><Link href="#faq" className="text-gray-400 hover:text-white transition-colors">Perguntas Frequentes</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="flex items-center gap-2 text-gray-400 mb-4">
                <i className="fas fa-envelope"></i>
                contato@perfectwedding.ai
              </p>
              <div className="social-media flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram do Perfect Wedding">
                  <i className="fab fa-instagram text-2xl"></i>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook do Perfect Wedding">
                  <i className="fab fa-facebook text-2xl"></i>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Pinterest do Perfect Wedding">
                  <i className="fab fa-pinterest text-2xl"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom text-center text-gray-400 border-t border-gray-800 pt-8">
            <p className="mb-2">&copy; 2025 Perfect Wedding AI - Tecnologia para Noivas. Todos os direitos reservados.</p>
            <p>Experimente vestidos de noiva virtualmente | Descubra seu vestido ideal | Ateliê virtual de vestidos</p>
          </div>
        </div>
      </footer>
    </>
  );
}
