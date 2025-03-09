# Perfect Wedding - Site de Lançamento

Site de lançamento do Perfect Wedding, uma plataforma que permite noivas experimentarem vestidos de noiva virtualmente usando inteligência artificial.

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📦 Estrutura do Projeto

```
perfect-wedding-next/
├── src/
│   ├── app/
│   │   ├── [lang]/           # Rotas dinâmicas por idioma
│   │   │   ├── page.tsx      # Página principal
│   │   │   ├── layout.tsx    # Layout com configurações globais
│   │   │   ├── metadata.ts   # Metadados traduzidos
│   │   │   └── translations.ts # Traduções do site
│   │   └── globals.css       # Estilos globais
│   └── components/           # Componentes React
├── public/
│   ├── assets/
│   │   ├── images/          # Imagens otimizadas
│   │   └── icons/          # Ícones e favicon
└── ...
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

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Google Analytics e Verificação
GOOGLE_ANALYTICS_ID=seu-id-do-google-analytics
GOOGLE_SITE_VERIFICATION=seu-código-de-verificação

# URLs da API (exemplo)
NEXT_PUBLIC_API_URL=https://perfectwedding.ai/api
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
- Imagens otimizadas com next/image
- Estratégia "afterInteractive" para scripts não-críticos

## 🚀 Como Rodar

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/perfect-wedding.git
cd perfect-wedding/perfect-wedding-next
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
- `type-check`: Verifica tipos TypeScript

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Next.js Team](https://nextjs.org/)
- [Vercel](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com/)
