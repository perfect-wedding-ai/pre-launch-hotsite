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
# Minificar CSS
npm run build:css

# Iniciar servidor local
npm start
```

## Desempenho

O site foi otimizado para obter pontuação máxima (100/100) no PageSpeed Insights, com foco em:

- First Contentful Paint (FCP): 0.9s
- Largest Contentful Paint (LCP): 1.7s
- Cumulative Layout Shift (CLS): 0.015
- Total Blocking Time (TBT): 0ms

Para mais detalhes sobre as otimizações implementadas, consulte o [documento de melhorias de desempenho](brides/MELHORIAS-DESEMPENHO.md).

## License

Copyright (c) 2025 Dyego Alekssander Maas

Todos os direitos reservados.

Este código é propriedade exclusiva do autor e não pode ser usado,
copiado, modificado ou distribuído sem permissão expressa por escrito.
