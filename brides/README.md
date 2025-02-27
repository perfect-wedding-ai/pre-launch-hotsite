# Perfect Wedding - Hotsite para Noivas

Este é um site estático para o hotsite "brides", focado em noivas que desejam testar vestidos de noiva usando inteligência artificial.

## Estrutura do Projeto

```
brides/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── hero-bride.jpg
│       ├── hero-bride.webp
│       ├── hero-bride-mobile.webp
│       ├── hero-bride-tablet.webp
│       ├── hero-bride-desktop.webp
│       ├── benefit-time.jpg
│       ├── benefit-time.webp
│       ├── benefit-stress.jpg
│       ├── benefit-options.jpg
│       ├── benefit-confidence.jpg
│       ├── before-1.jpg
│       ├── after-1.jpg
│       ├── before-2.jpg
│       ├── after-2.jpg
│       ├── testimonial-1.jpg
│       ├── testimonial-2.jpg
│       ├── testimonial-3.jpg
│       └── signup-bride.jpg
├── index.html
├── thank-you.html
├── optimize-images.js
├── test-performance.js
├── OTIMIZACAO-IMAGENS.md
├── MELHORIAS-DESEMPENHO.md
├── mailchimp-setup.md
└── README.md
```

## Descrição

O Perfect Wedding é uma plataforma que permite às noivas experimentar virtualmente diferentes vestidos de noiva usando inteligência artificial. O site apresenta:

- Uma página inicial atraente com uma chamada clara para ação
- Seção "Como Funciona" explicando o processo
- Seção de benefícios destacando as vantagens do serviço
- Exemplos visuais de antes/depois
- Depoimentos de usuárias
- Formulário de inscrição para testes gratuitos (integrado com Mailchimp)
- Seção de perguntas frequentes
- Página de agradecimento após inscrição

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS para fácil personalização de cores)
- JavaScript (vanilla)
- Fontes do Google (Playfair Display e Poppins)
- Ícones do Font Awesome
- Integração com Mailchimp para gerenciamento de leads
- Node.js com Sharp para otimização de imagens
- Lighthouse para análise de desempenho

## Como Executar

Por ser um site estático, basta abrir o arquivo `index.html` em qualquer navegador moderno.

### Scripts de Utilidade

O projeto inclui scripts úteis para otimização e teste:

```bash
# Otimizar imagens (gera versões WebP e responsivas)
npm run optimize-images

# Testar desempenho com Lighthouse
npm run test-performance
```

## Otimização de Desempenho

O site foi otimizado para obter uma alta pontuação no PageSpeed Insights:

- **Performance Score**: 86/100
- **First Contentful Paint**: 1.4s
- **Largest Contentful Paint**: 2.7s
- **Cumulative Layout Shift**: 0.211

As principais otimizações incluem:

1. **Imagens Responsivas**: Versões otimizadas para mobile, tablet e desktop
2. **Formato WebP**: Compressão moderna para reduzir o tamanho dos arquivos
3. **Lazy Loading**: Carregamento preguiçoso para imagens abaixo da dobra
4. **Prevenção de Layout Shifts**: Uso de atributos width/height e aspect-ratio

Para mais detalhes sobre as otimizações, consulte:
- `OTIMIZACAO-IMAGENS.md` - Documentação sobre o sistema de otimização de imagens
- `MELHORIAS-DESEMPENHO.md` - Detalhes sobre as melhorias de desempenho implementadas

## Personalização

### Cores

As cores principais do site são definidas como variáveis CSS no início do arquivo `styles.css`. Para alterar o esquema de cores, basta modificar esses valores:

```css
:root {
    --primary-color: #f8c8dc; /* Rosa claro pastel */
    --secondary-color: #e2f0cb; /* Verde claro pastel */
    --accent-color: #ffdfd3; /* Pêssego pastel */
    --dark-accent: #d9a6b3; /* Rosa escuro pastel */
    /* ... outras variáveis ... */
}
```

### Imagens

Para substituir as imagens, mantenha os mesmos nomes de arquivo ou atualize as referências no HTML. Após adicionar novas imagens, execute o script de otimização:

```bash
npm run optimize-images
```

## Integração com Mailchimp

O formulário de inscrição está configurado para integração com o Mailchimp, permitindo:

- Captura de leads diretamente para sua lista de e-mail marketing
- Campos personalizados para nome, e-mail, telefone e data do casamento
- Redirecionamento para uma página de agradecimento personalizada
- Feedback visual para o usuário

Para configurar a integração com o Mailchimp, siga as instruções detalhadas no arquivo `mailchimp-setup.md`.

## Próximos Passos

1. Adicionar imagens reais geradas por IA
2. Implementar análise de dados para rastrear conversões
3. Criar versão em inglês para alcance internacional
4. Adicionar integração com CRM para gerenciamento de leads mais avançado
5. Continuar otimizando o desempenho para atingir pontuação 90+ no PageSpeed Insights 