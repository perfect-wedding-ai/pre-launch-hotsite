# Perfect Wedding - Hotsite para Noivas

Este é um site estático para o hotsite "brides", focado em noivas que desejam testar vestidos de noiva usando inteligência artificial.

## Estrutura do Projeto

```
brides/
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── min/
│   │       └── styles.min.css
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
├── build.js
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
- clean-css-cli para minificação de CSS
- Netlify para hospedagem com otimizações avançadas

## Requisitos

- Node.js (versão 14 ou superior)
- NPM (versão 6 ou superior)

## Instalação

```bash
# Instalar dependências
npm install

# Instalar clean-css-cli globalmente (necessário para o build)
npm install -g clean-css-cli
```

## Scripts Disponíveis

```bash
# Minificar CSS
npm run build:css

# Iniciar servidor local
npm start

# Otimizar imagens (gera versões WebP e responsivas)
npm run optimize-images

# Testar desempenho com Lighthouse
npm run test-performance
```

## Processo de Build

O projeto utiliza um processo de build automatizado para otimizar o CSS:

1. O script `build.js` minifica o arquivo CSS principal
2. O CSS minificado é salvo em `assets/css/min/styles.min.css`
3. O HTML carrega o CSS minificado com preload para melhor desempenho

Para executar o build:

```bash
npm run build:css
```

## Implantação no Netlify

O projeto está configurado para implantação otimizada no Netlify através do arquivo `netlify.toml` na raiz do projeto:

### Principais Configurações

- **Diretório de Publicação**: `brides/`
- **Comando de Build**: `npm run build:css`
- **Compressão de Texto**: Brotli e Gzip habilitados para todos os recursos
- **Cabeçalhos de Cache**: Configurados para diferentes tipos de arquivos
- **Processamento Automático**: CSS, JavaScript, HTML e imagens

### Como Implantar

1. Faça o fork ou clone deste repositório
2. Conecte o repositório ao Netlify
3. O Netlify detectará automaticamente as configurações no arquivo `netlify.toml`
4. A build será executada e o site será publicado com todas as otimizações

Para mais detalhes sobre a configuração do Netlify, consulte o [documento de melhorias de desempenho](MELHORIAS-DESEMPENHO.md#configuração-do-netlify).

## Como Executar

Para iniciar um servidor local e visualizar o site:

```bash
npm start
```

Em seguida, acesse `http://localhost:8080/brides/` no seu navegador.

## Otimização de Desempenho

O site foi otimizado para obter pontuação máxima no PageSpeed Insights:

- **Performance Score**: 100/100
- **First Contentful Paint**: 0.9s
- **Largest Contentful Paint**: 1.7s
- **Cumulative Layout Shift**: 0.015
- **Total Blocking Time**: 0ms

As principais otimizações incluem:

1. **Imagens Responsivas**: Versões otimizadas para mobile, tablet e desktop
2. **Formato WebP**: Compressão moderna para reduzir o tamanho dos arquivos
3. **CSS Crítico Inline**: Estilos críticos incorporados diretamente no HTML
4. **CSS Minificado**: Redução do tamanho do arquivo CSS
5. **Preload de Recursos**: Carregamento prioritário para imagens e CSS críticos
6. **Prevenção de Layout Shifts**: Uso de atributos width/height e aspect-ratio
7. **Compressão de Texto**: Brotli e Gzip para reduzir o tamanho dos arquivos transferidos

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

Após fazer alterações no CSS, execute o build para atualizar a versão minificada:

```bash
npm run build:css
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
5. Implementar otimização de JavaScript 