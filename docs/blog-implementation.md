# Implementação do Blog Perfect Wedding

Este documento descreve a implementação da seção de blog do hotsite multi-idioma do Perfect Wedding, integrada com o Contentful CMS.

## Estrutura de Arquivos

```
src/
├── app/
│   ├── [lang]/
│   │   ├── blog/
│   │   │   ├── page.tsx                # Página de listagem do blog
│   │   │   └── [slug]/
│   │   │       ├── page.tsx            # Página de detalhe do post
│   │   │       └── not-found.tsx       # Página 404 para posts não encontrados
│   │   │
│   └── api/
│       └── revalidate/
│           └── route.ts                # Endpoint para revalidação via webhook do Contentful
├── components/
│   └── blog/
│       ├── BlogCard.tsx                # Componente para exibir cards de posts
│       ├── BlogFilters.tsx             # Componente para filtros de categoria e tag
│       ├── BlogHeader.tsx              # Componente para cabeçalho do blog
│       ├── Pagination.tsx              # Componente para paginação
│       ├── RelatedPosts.tsx            # Componente para posts relacionados
│       └── RichTextRenderer.tsx        # Componente para renderizar conteúdo Rich Text
└── lib/
    └── contentful/
        ├── client.ts                   # Cliente para integração com a API do Contentful
        └── types.ts                    # Tipos TypeScript para o Contentful
```

## Integração com o Contentful

### Variáveis de Ambiente

As seguintes variáveis de ambiente são necessárias para a integração com o Contentful:

```
CONTENTFUL_SPACE_ID=your-contentful-space-id
CONTENTFUL_ACCESS_TOKEN=your-contentful-access-token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your-contentful-preview-access-token
CONTENTFUL_REVALIDATE_SECRET=your-contentful-revalidate-secret
```

### Modelo de Conteúdo

O blog utiliza os seguintes modelos de conteúdo no Contentful:

1. **Blog Post**:
   - `title`: Título do post (Symbol, obrigatório)
   - `body`: Corpo do post (Rich Text, obrigatório)
   - `image`: Imagem de destaque (Link para Asset, opcional)
   - `tags`: Tags do post (Array de Symbol, obrigatório)
   - `metadescription`: Meta descrição para SEO (Text, opcional)
   - `category`: Categoria do post (Link para Entry, opcional)
   - `publishDate`: Data de publicação (Date, obrigatório)
   - `lastUpdateDate`: Data da última atualização (Date, obrigatório)
   - `recommendedPosts`: Posts recomendados (Array de Links para Entry, opcional)
   - `slug`: URL amigável do post (Symbol, obrigatório)

2. **Category**:
   - `name`: Nome da categoria (Symbol, obrigatório)
   - `slug`: URL amigável da categoria (Symbol, obrigatório)
   - `description`: Descrição da categoria (Text, opcional)

## Funcionalidades Implementadas

### Multi-idioma

- O blog suporta múltiplos idiomas, seguindo a estrutura de rotas `/[lang]/blog`.
- O conteúdo é filtrado com base no idioma ativo, obtido via parâmetro de rota.
- As traduções de interface são implementadas diretamente nos componentes.

### Listagem de Posts

- Exibição de posts em formato de grid com cards.
- Paginação para navegar entre páginas de posts.
- Filtros por categoria e tag.
- Exibição de imagem, título, resumo, data, tags e categoria em cada card.

### Detalhe do Post

- Exibição completa do post com título, imagem, data, conteúdo Rich Text.
- Exibição de posts relacionados com base nas tags.
- Navegação de volta para a listagem.

### SEO

- Metadados dinâmicos para cada página (título, descrição, Open Graph, Twitter Cards).
- Dados estruturados JSON-LD para posts do blog.
- URLs amigáveis via slugs.
- Imagens otimizadas com o componente Image do Next.js.

### Revalidação de Conteúdo

- Endpoint de API para revalidação via webhook do Contentful.
- Revalidação de páginas específicas quando o conteúdo é atualizado.

## Configuração do Webhook no Contentful

Para configurar o webhook de revalidação no Contentful:

1. Acesse o painel do Contentful > Settings > Webhooks.
2. Crie um novo webhook com as seguintes configurações:
   - Name: Revalidate Blog
   - URL: https://perfectwedding.ai/api/revalidate
   - Triggers: Select specific triggering events
     - Content Type: Blog Post, Category
     - Events: Create, Save, Auto Save, Archive, Unarchive, Publish, Unpublish
   - Headers: 
     - x-contentful-webhook-secret: [valor da variável CONTENTFUL_REVALIDATE_SECRET]

## Considerações de Performance

- Uso de Static Site Generation (SSG) para páginas de listagem e detalhe.
- Incremental Static Regeneration (ISR) via revalidação para atualizações de conteúdo.
- Otimização de imagens com o componente Image do Next.js.
- Paginação para limitar o número de posts carregados por vez.

## Próximos Passos

- Implementação de pesquisa de posts.
- Melhorias na acessibilidade.
- Testes automatizados para componentes e integração com o Contentful.
- Análise de performance e otimizações adicionais. 