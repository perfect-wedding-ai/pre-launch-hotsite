# Otimização de Imagens - Perfect Wedding

Este documento descreve como otimizar as imagens do site Perfect Wedding para melhorar o desempenho e a experiência do usuário.

## Problema Identificado

O Google Page Insights reportou que as imagens do site estão consumindo muitos dados, o que pode afetar negativamente:

- Tempo de carregamento da página
- Consumo de dados em dispositivos móveis
- Pontuação de desempenho (LCP - Largest Contentful Paint)

Economia potencial identificada: **393 KiB**

## Solução Implementada

Implementamos uma solução completa para otimização de imagens que inclui:

1. **Redimensionamento responsivo**: Criação de versões otimizadas para diferentes tamanhos de tela
2. **Lazy loading**: Carregamento das imagens apenas quando necessário
3. **Compressão inteligente**: Redução do tamanho dos arquivos mantendo a qualidade visual

## Como Usar

### Opção 1: Script Bash (requer ImageMagick)

```bash
# Instalar ImageMagick (se necessário)
# Ubuntu/Debian
sudo apt-get install imagemagick

# macOS
brew install imagemagick

# Executar o script
cd brides
chmod +x optimize-images.sh
./optimize-images.sh
```

### Opção 2: Script Node.js (requer Node.js)

```bash
# Instalar dependências
cd brides
npm install

# Executar o script
npm run optimize-images
```

## Estrutura de Arquivos Gerados

Para cada imagem original, serão geradas três versões otimizadas:

- **[nome-arquivo]-mobile.webp**: Otimizada para dispositivos móveis (480px de largura)
- **[nome-arquivo]-tablet.webp**: Otimizada para tablets (768px de largura)
- **[nome-arquivo]-desktop.webp**: Otimizada para desktop (1200px de largura)

## Implementação Técnica

1. **HTML**: Adicionamos atributos `width`, `height` e `loading="lazy"` a todas as imagens
2. **JavaScript**: Implementamos um script que:
   - Detecta o tamanho da tela do usuário
   - Carrega a versão apropriada da imagem
   - Implementa lazy loading para imagens fora da viewport

3. **CSS**: Mantivemos o CSS existente que já estava bem otimizado

## Resultados Esperados

- Redução de ~393 KiB no tamanho total da página
- Melhoria significativa no LCP (Largest Contentful Paint)
- Carregamento mais rápido em conexões lentas
- Menor consumo de dados em dispositivos móveis

## Manutenção

Ao adicionar novas imagens ao site:

1. Coloque a imagem original em `assets/images/`
2. Execute um dos scripts de otimização
3. As versões otimizadas serão geradas automaticamente
4. Use a imagem no HTML com os atributos apropriados:
   ```html
   <img src="assets/images/nova-imagem.webp" alt="Descrição da imagem" width="400" height="300" loading="lazy">
   ```

O script JavaScript `image-optimizer.js` cuidará de carregar a versão correta para cada dispositivo. 