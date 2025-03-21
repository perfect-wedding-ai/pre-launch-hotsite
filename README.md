[![Netlify Status](https://api.netlify.com/api/v1/badges/37be8ce8-f4d0-471a-a1b7-9c62eb22239b/deploy-status?branch=main)](https://app.netlify.com/sites/perfectwedding/deploys)

# Perfect Wedding - Site de Lançamento

Site de lançamento do Perfect Wedding, uma plataforma que permite noivas experimentarem vestidos de noiva virtualmente usando inteligência artificial.

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Font Awesome](https://fontawesome.com/)
- [Contentful CMS](https://www.contentful.com/)
- [React Query](https://tanstack.com/query/latest)
- [js-cookie](https://github.com/js-cookie/js-cookie)
- [date-fns](https://date-fns.org/)
- [Sharp](https://sharp.pixelplumbing.com/)

## 📦 Estrutura do Projeto

```
perfect-wedding-next/
├── .github/              # Configurações e workflows do GitHub
├── .next/                # Build compilado do Next.js
├── .venv/                # Ambiente virtual Python para ferramentas
├── docs/                 # Documentação do projeto
├── public/               # Arquivos estáticos
├── src/
│   ├── app/
│   │   ├── [lang]/           # Rotas dinâmicas por idioma
│   │   │   ├── page.tsx      # Página principal
│   │   │   ├── layout.tsx    # Layout com configurações globais
│   │   │   ├── metadata.ts   # Metadados traduzidos
│   │   │   ├── translations.ts # Traduções do site
│   │   │   ├── blog/         # Rotas para o blog
│   │   │   ├── privacy-policy/ # Página de política de privacidade
│   │   │   └── thank-you/    # Página de agradecimento
│   │   ├── api/              # Rotas da API
│   │   ├── globals.css       # Estilos globais
│   │   ├── head.tsx          # Componente de cabeçalho HTML
│   │   └── providers.tsx     # Provedores de contexto
│   ├── components/           # Componentes React
│   │   ├── ui/               # Componentes UI reutilizáveis (Shadcn)
│   │   ├── blog/             # Componentes específicos do blog
│   │   ├── Header.tsx        # Componente de cabeçalho
│   │   ├── Footer.tsx        # Componente de rodapé
│   │   ├── Hero.tsx          # Componente hero da página inicial
│   │   ├── CookieConsent.tsx # Componente de consentimento de cookies
│   │   ├── LanguageSelector.tsx # Seletor de idiomas
│   │   ├── OptimizedImage.tsx # Componente de otimização de imagens
│   │   ├── BackgroundEffect.tsx # Efeito de fundo animado
│   │   ├── BlogPreloader.tsx # Preloader para o blog
│   │   └── ScrollbarPreserver.tsx # Preserva a posição da scrollbar
│   ├── utils/                # Funções utilitárias
│   ├── lib/                  # Bibliotecas e configurações
│   ├── middleware.ts         # Middleware do Next.js
│   └── config/               # Configurações da aplicação
├── tools/                    # Ferramentas para desenvolvimento
├── .env.example              # Exemplo de variáveis de ambiente
├── .env.local                # Variáveis de ambiente locais
├── eslint.config.mjs         # Configuração do ESLint
├── jest.config.js            # Configuração de testes com Jest
├── next.config.js            # Configuração do Next.js
├── netlify.toml              # Configuração de deploy no Netlify
├── postcss.config.mjs        # Configuração do PostCSS
├── project-planning.md       # Documento de planejamento do projeto
├── tailwind.config.ts        # Configuração do Tailwind CSS
└── tsconfig.json             # Configuração do TypeScript
```

## 🌍 Internacionalização

O site suporta três idiomas:
- 🇧🇷 Português (pt-BR)
- 🇺🇸 Inglês (en-US)
- 🇪🇸 Espanhol (es-ES)

As URLs são estruturadas com o código do idioma:
- `/pt` - Português
- `/en` - Inglês
- `/es` - Espanhol

### Seleção de Idioma
- Um seletor de idioma está disponível no menu suspenso do usuário no cabeçalho
- A preferência de idioma do usuário é salva em um cookie (se o consentimento for dado)
- Caso não haja preferência salva, o idioma é detectado automaticamente pelo navegador

## 🍪 Sistema de Consentimento de Cookies

O site implementa um sistema de consentimento de cookies completo em conformidade com as regulamentações da UE:

- Banner de aviso que aparece na primeira visita
- Opções para aceitar ou recusar cookies
- Link para a política de privacidade
- Persistência da escolha do usuário por 6 meses
- Integração com o sistema de seleção de idioma (preferência só é salva com consentimento)

## 📊 Contentful Schema

A integração com o Contentful utiliza os seguintes modelos de conteúdo:

### Blog Post

```json
{
  "name": "Blog post",
  "description": "Blog post, with title, body, image, tags, metadescription, category, recommended posts",
  "displayField": "slug",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Symbol",
      "localized": true,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "body",
      "name": "Body",
      "type": "RichText",
      "localized": true,
      "required": true,
      "validations": [
        {
          "enabledMarks": [
            "bold",
            "italic",
            "underline",
            "code"
          ],
          "message": "Only bold, italic, underline, and code marks are allowed"
        },
        {
          "enabledNodeTypes": [
            "heading-1",
            "heading-2",
            "heading-3",
            "heading-4",
            "heading-5",
            "heading-6",
            "ordered-list",
            "unordered-list",
            "hr",
            "blockquote",
            "embedded-entry-block",
            "embedded-asset-block",
            "hyperlink",
            "entry-hyperlink",
            "asset-hyperlink",
            "embedded-entry-inline"
          ],
          "message": "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, link to Url, link to entry, link to asset, and inline entry nodes are allowed"
        },
        {
          "nodes": {}
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "image",
      "name": "Image",
      "type": "Link",
      "localized": true,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "linkType": "Asset"
    },
    {
      "id": "tags",
      "name": "Tags",
      "type": "Array",
      "localized": true,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "items": {
        "type": "Symbol",
        "validations": []
      }
    },
    {
      "id": "metadescription",
      "name": "Meta description",
      "type": "Text",
      "localized": true,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "category",
      "name": "Category",
      "type": "Link",
      "localized": true,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "linkType": "Entry"
    },
    {
      "id": "publishDate",
      "name": "Publish Date",
      "type": "Date",
      "localized": true,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "lastUpdateDate",
      "name": "Last Update Date",
      "type": "Date",
      "localized": true,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "recommendedPosts",
      "name": "Recommended posts",
      "type": "Array",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "items": {
        "type": "Link",
        "validations": [],
        "linkType": "Entry"
      }
    },
    {
      "id": "slug",
      "name": "slug",
      "type": "Symbol",
      "localized": true,
      "required": true,
      "validations": [
        {
          "unique": true
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "canonicalSlug",
      "name": "canonicalSlug",
      "type": "Symbol",
      "localized": false,
      "required": true,
      "validations": [
        {
          "unique": true
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "canonicalLocale",
      "name": "canonicalLocale",
      "type": "Symbol",
      "localized": false,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "keywords",
      "name": "keywords",
      "type": "Array",
      "localized": true,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "items": {
        "type": "Symbol",
        "validations": []
      }
    },
    {
      "id": "producedByAi",
      "name": "producedByAI",
      "type": "Boolean",
      "localized": false,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false
    }
  ],
  "sys": {
    "space": {
      "sys": {
        "type": "Link",
        "linkType": "Space",
        "id": "dzhp8jiscbno"
      }
    },
    "id": "blogPost",
    "type": "ContentType",
    "createdAt": "2025-03-10T20:12:57.579Z",
    "updatedAt": "2025-03-21T14:29:51.100Z",
    "environment": {
      "sys": {
        "id": "master",
        "type": "Link",
        "linkType": "Environment"
      }
    },
    "publishedVersion": 23,
    "publishedAt": "2025-03-21T14:29:51.100Z",
    "firstPublishedAt": "2025-03-10T20:12:57.926Z",
    "createdBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "16aKC0qjpJnQ81qeHF89Kg"
      }
    },
    "updatedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "16aKC0qjpJnQ81qeHF89Kg"
      }
    },
    "publishedCounter": 12,
    "version": 24,
    "publishedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "16aKC0qjpJnQ81qeHF89Kg"
      }
    },
    "urn": "crn:contentful:::content:spaces/dzhp8jiscbno/environments/master/content_types/blogPost"
  }
}
```

#### Uso de metadados no JSON-LD para SEO

Os artigos do blog estão configurados para usar os dados do Contentful em formato JSON-LD para melhorar o SEO:

- **title**: Usado como `headline`
- **image**: Usado como imagem principal do artigo
- **tags**: Convertidos para `keywords` para melhor indexação
- **keywords**: Combinados com tags para criar uma lista completa de `keywords`
- **category**: Usado como `articleSection`
- **metadescription**: Usado como `description`
- **publishDate**: Usado como `datePublished`
- **lastUpdateDate**: Usado como `dateModified`
- **slug**: Usado para compor URLs e como `identifier`
- **canonicalSlug**: Usado para compor URLs canônicas
- **canonicalLocale**: Define o locale original/canônico do conteúdo para SEO

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Google Analytics e Verificação
GOOGLE_ANALYTICS_ID=seu-id-do-google-analytics
GOOGLE_SITE_VERIFICATION=seu-código-de-verificação

# URLs da API (exemplo)
NEXT_PUBLIC_API_URL=https://perfectwedding.ai/api
NEXT_PUBLIC_BASE_URL=https://perfectwedding.ai

# Contentful
CONTENTFUL_SPACE_ID=seu-space-id
CONTENTFUL_ACCESS_TOKEN=seu-access-token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=seu-preview-token
CONTENTFUL_REVALIDATE_SECRET=seu-segredo-de-revalidação
CONTENTFUL_ENVIRONMENT_ID=seu-environment-id
CONTENTFUL_MANAGEMENT_TOKEN=seu-token-de-gerenciamento

# Netlify (apenas para deploy)
NETLIFY_AUTH_TOKEN=seu-netlify-auth-token
NETLIFY_SITE_ID=seu-netlify-site-id

# Configurações de idioma
NEXT_PUBLIC_DEFAULT_LOCALE=pt

# Outras configurações
NEXT_PUBLIC_SITE_URL=https://perfectwedding.ai
COOKIE_CONSENT_VERSION=1
NODE_ENV=development
```

### SEO e Metadados

O projeto inclui:
- Metadados dinâmicos por idioma
- Tags OpenGraph para compartilhamento em redes sociais
- Schema.org markup para rich snippets
- Sitemap e robots.txt automáticos
- Canonical URLs e hreflang tags

### Performance

- Fontes otimizadas com next/font
- Carregamento assíncrono de scripts
- Imagens otimizadas com next/image e Sharp
- Estratégia "afterInteractive" para scripts não-críticos
- Otimização para SSR com compressão e SWC minify
- Uso do Critters para CSS crítico

## 🚀 Como Rodar

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/perfect-wedding.git
cd perfect-wedding/pre-launch-hotsite
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
# Edite .env.local com suas configurações
```

4. Rode o projeto em desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

5. Para build de produção
```bash
npm run build
# ou
yarn build
```

## 📝 Scripts Disponíveis

- `dev`: Roda o projeto em modo desenvolvimento
- `build`: Gera build de produção
- `start`: Inicia o servidor de produção
- `lint`: Executa verificação de lint
- `tests`: Executa os testes com Jest

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Dyego Alekssander Maas - [@dyegomaas](https://github.com/dyegomaas)

## 🙏 Agradecimentos

- [Next.js Team](https://nextjs.org/)
- [Vercel](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com/)
- [Netlify](https://netlify.com)
- [Contentful](https://www.contentful.com/)
- [Shadcn UI](https://ui.shadcn.com/)
