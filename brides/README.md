# DressAI - Hotsite para Noivas

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
│       ├── benefit-time.jpg
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
└── README.md
```

## Descrição

O DressAI é uma plataforma que permite às noivas experimentar virtualmente diferentes vestidos de noiva usando inteligência artificial. O site apresenta:

- Uma página inicial atraente com uma chamada clara para ação
- Seção "Como Funciona" explicando o processo
- Seção de benefícios destacando as vantagens do serviço
- Exemplos visuais de antes/depois
- Depoimentos de usuárias
- Formulário de inscrição para testes gratuitos
- Seção de perguntas frequentes

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS para fácil personalização de cores)
- JavaScript (vanilla)
- Fontes do Google (Playfair Display e Poppins)
- Ícones do Font Awesome

## Como Executar

Por ser um site estático, basta abrir o arquivo `index.html` em qualquer navegador moderno.

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

Para substituir as imagens, mantenha os mesmos nomes de arquivo ou atualize as referências no HTML.

## Próximos Passos

1. Adicionar imagens reais geradas por IA
2. Implementar backend para o formulário de inscrição
3. Adicionar análise de dados para rastrear conversões
4. Criar versão em inglês para alcance internacional 