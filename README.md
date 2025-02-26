# Pre-launch Brides Hotsite

Site de pré-lançamento para o Perfect Wedding, otimizado para máximo desempenho e experiência do usuário.

## Documentação

- [Melhores práticas para prompting de IA generativa para imagens](docs/generative-image-best-practices.md)
- [Melhorias de Desempenho](brides/MELHORIAS-DESEMPENHO.md)

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
# Build completo (minificar CSS e JavaScript)
npm run build

# Minificar apenas CSS
npm run build:css

# Iniciar servidor local com compressão gzip
npm start
```

## Desempenho

O site foi otimizado para obter pontuação máxima (100/100) no PageSpeed Insights, com foco em:

- First Contentful Paint (FCP): 0.9s
- Largest Contentful Paint (LCP): 1.7s
- Cumulative Layout Shift (CLS): 0.015
- Total Blocking Time (TBT): 0ms

Para mais detalhes sobre as otimizações implementadas, consulte o [documento de melhorias de desempenho](brides/MELHORIAS-DESEMPENHO.md).

## Otimizações de Desempenho

O site foi otimizado para obter pontuação máxima no PageSpeed Insights:

- **CSS Minificado**: Todo o CSS é minificado durante o build para reduzir o tamanho dos arquivos.
- **JavaScript Minificado**: Os arquivos JavaScript são minificados usando Terser para carregamento mais rápido.
- **Imagens Otimizadas**: Todas as imagens são convertidas para WebP e otimizadas para diferentes tamanhos de tela.
- **Carregamento Crítico**: CSS crítico é carregado inline para renderização rápida da primeira visualização.
- **Lazy Loading**: Imagens abaixo da dobra são carregadas apenas quando necessário.
- **Favicon Personalizado**: Gerado com [favicon.io](https://favicon.io/favicon-generator/) para garantir compatibilidade com todos os dispositivos.

Para mais detalhes sobre as otimizações implementadas, consulte o arquivo `brides/MELHORIAS-DESEMPENHO.md`.

## Implantação no Netlify

O projeto está configurado para implantação otimizada no Netlify através do arquivo `netlify.toml`, que inclui:

- Compressão de texto (Brotli e Gzip) para reduzir o tamanho dos arquivos
- Cabeçalhos de cache otimizados para diferentes tipos de arquivos
- Configurações de segurança recomendadas
- Processamento automático de CSS, JavaScript e imagens

### Como implantar

1. Faça o fork ou clone deste repositório
2. Conecte o repositório ao Netlify
3. O Netlify detectará automaticamente as configurações no arquivo `netlify.toml`
4. A build será executada e o site será publicado com todas as otimizações

Para mais detalhes sobre a configuração do Netlify, consulte o [documento de melhorias de desempenho](brides/MELHORIAS-DESEMPENHO.md#configuração-do-netlify).

## License

Copyright (c) 2025 Dyego Alekssander Maas

Todos os direitos reservados.

Este código é propriedade exclusiva do autor e não pode ser usado,
copiado, modificado ou distribuído sem permissão expressa por escrito.
