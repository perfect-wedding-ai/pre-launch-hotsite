# Documentação de Otimização de Imagens - Perfect Wedding

## Visão Geral

Este documento descreve o sistema de otimização de imagens implementado para o site Perfect Wedding. O sistema foi projetado para melhorar significativamente o desempenho do site, reduzindo o tamanho das imagens e implementando técnicas modernas de carregamento.

## Benefícios

- **Redução de tamanho**: Conversão para WebP reduz o tamanho em até 85-95%
- **Carregamento mais rápido**: Imagens menores = carregamento mais rápido
- **Responsividade**: Diferentes tamanhos de imagem para diferentes dispositivos
- **Lazy Loading**: Imagens carregadas apenas quando necessárias
- **Melhor SEO**: Google prioriza sites com melhor desempenho
- **Preservação da proporção**: Imagens mantêm sua proporção original, evitando distorções

## Componentes do Sistema

### 1. Script de Otimização de Imagens (Node.js)

Localização: `optimize-images.js`

Este script Node.js processa todas as imagens no diretório `assets/images` e:

1. Converte imagens para o formato WebP (mantendo os originais)
2. Cria versões responsivas para diferentes tamanhos de tela:
   - Mobile (480px)
   - Tablet (768px)
   - Desktop (1200px)
3. Aplica compressão com qualidade de 80%
4. Preserva a proporção original das imagens (aspect ratio)
5. Tratamento especial para imagens widescreen (como hero-bride e signup-bride)

**Como usar:**

```bash
cd brides
node optimize-images.js
```

### 2. Script de Lazy Loading e Imagens Responsivas (JavaScript)

Localização: `assets/js/lazy-loading.js`

Este script front-end implementa:

1. **Lazy Loading**: Carrega imagens apenas quando elas entram na viewport
2. **Detecção de Dispositivo**: Identifica o tamanho da tela do usuário
3. **Carregamento Responsivo**: Carrega a versão da imagem apropriada para o dispositivo
4. **Detecção de WebP**: Verifica se o navegador suporta WebP

**Como usar no HTML:**

```html
<!-- Adicione o atributo data-src em vez de src -->
<img data-src="assets/images/exemplo.jpg" alt="Descrição">

<!-- Inclua o script no final do body -->
<script src="assets/js/lazy-loading.js"></script>
```

## Estatísticas de Otimização

| Imagem | Original (JPG) | WebP | Redução |
|--------|---------------|------|---------|
| hero-bride | 293.4 KB | 45.0 KB | 85% |
| hero-bride-mobile | 293.4 KB | 13.0 KB | 96% |
| testimonial-1 | 280.0 KB | 48.7 KB | 83% |

## Convenções de Nomenclatura

As imagens otimizadas seguem esta convenção de nomenclatura:

- **Original**: `nome-da-imagem.jpg`
- **WebP**: `nome-da-imagem.webp`
- **Responsivas**:
  - `nome-da-imagem-mobile.webp`
  - `nome-da-imagem-tablet.webp`
  - `nome-da-imagem-desktop.webp`

## Implementação no Site

Para implementar o sistema de imagens otimizadas no site:

1. **Otimize as imagens**:
   ```bash
   node optimize-images.js
   ```

2. **Modifique o HTML**:
   - Substitua `src` por `data-src` em todas as tags `<img>`
   - Exemplo: `<img data-src="assets/images/hero-bride.jpg" alt="Hero">`

3. **Adicione o script**:
   ```html
   <script src="assets/js/lazy-loading.js"></script>
   ```

4. **Adicione CSS para transição suave** (opcional):
   ```css
   img {
     opacity: 0;
     transition: opacity 0.3s ease-in-out;
   }
   img.loaded {
     opacity: 1;
   }
   ```

## Tratamento de Imagens Especiais

O script de otimização identifica automaticamente imagens widescreen (como hero-bride e signup-bride) e aplica configurações especiais para preservar sua proporção:

- Usa o modo `fit: 'cover'` para manter a proporção original
- Não corta a imagem, mantendo-a centralizada
- Evita distorções em imagens com proporções diferentes do quadrado

Para adicionar mais imagens à lista de tratamento especial, edite a linha no script:

```javascript
// Verifica se a imagem é widescreen
const isWidescreen = baseName === 'hero-bride' || baseName === 'signup-bride';
```

## Preservando Proporções das Imagens

Para garantir que todas as imagens mantenham suas proporções originais e sejam exibidas corretamente, implementamos duas abordagens complementares:

### 1. Preservando Proporções no HTML

Para garantir que as imagens mantenham suas proporções naturais no navegador e evitar layout shifts (CLS):

- **Use atributos `width` e `height` explícitos**: Especificar ambos os atributos permite que o navegador reserve o espaço correto antes do carregamento da imagem.
   - Correto: `<img src="imagem.webp" width="600" height="338" loading="lazy">`
   - Importante: Mantenha a proporção correta entre width e height

- **Use CSS para garantir responsividade**: Mesmo com dimensões explícitas, use CSS para garantir que as imagens sejam responsivas:
  ```css
  img {
    max-width: 100%;
    height: auto;
  }
  ```

- **Defina aspect-ratio no CSS**: Para os contêineres de imagens, defina a proporção para evitar layout shifts:
  ```css
  .image-container {
    aspect-ratio: 16/9;
    min-height: 300px;
  }
  ```

> **IMPORTANTE**: Definir atributos `width` e `height` explícitos nas tags `<img>` é essencial para evitar layout shifts (CLS), mas certifique-se de que as proporções estejam corretas para evitar distorções.

### 2. Garantindo Preenchimento Completo dos Contêineres

Para garantir que as imagens preencham completamente seus contêineres sem mostrar bordas pretas:

1. **Use `object-fit: cover` para imagens que precisam preencher completamente o contêiner**:
   ```css
   .benefit img, .before img, .after img, .hero-image img, .signup-image img {
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
   ```

2. **Configure os contêineres de imagem corretamente**:
   ```css
   .hero-image, .signup-image {
     overflow: hidden;
     border-radius: 10px;
     box-shadow: var(--shadow);
     display: flex;
     justify-content: center;
     align-items: center;
   }
   ```

3. **Defina alturas fixas para contêineres específicos**:
   ```css
   .benefit img {
     height: 200px;
   }
   
   .before, .after {
     height: 300px;
   }
   ```

4. **Garanta que os contêineres tenham `overflow: hidden`** para evitar que partes da imagem vazem para fora do contêiner quando redimensionadas.

Esta abordagem garante que:
- As imagens preencham completamente seus contêineres sem mostrar bordas pretas
- As proporções sejam mantidas sem distorções
- O layout permaneça consistente em diferentes tamanhos de tela
- Não ocorram layout shifts durante o carregamento da página

## Exemplos de Configuração

### CSS para Imagens de Benefícios (Quadradas)

```css
.benefit {
    overflow: hidden;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
}

.benefit img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.5s ease;
}
```

### CSS para Imagens "Antes e Depois" (Destaque)

```css
.before, .after {
    position: relative;
    width: 450px;
    height: 450px;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.before img, .after img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transition: transform 0.3s ease;
    object-fit: cover;
    object-position: center;
    background-color: var(--white);
}

.before-after {
    display: flex;
    flex-direction: row;
    gap: 30px;
    width: 100%;
    justify-content: center;
    padding: 20px;
}

/* Responsividade para dispositivos móveis */
@media (max-width: 992px) {
    .before, .after {
        width: 350px;
        height: 350px;
    }
}

@media (max-width: 768px) {
    .before-after {
        flex-direction: column;
        align-items: center;
    }
    
    .before, .after {
        width: 400px;
        height: 400px;
    }
}

@media (max-width: 576px) {
    .before, .after {
        width: 300px;
        height: 300px;
    }
}
```

### CSS para Imagens de Hero e Formulário

```css
.hero-image, .signup-image {
    aspect-ratio: 16/9;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: var(--shadow);
}

.hero-image img, .signup-image img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: transform 0.5s ease;
    object-fit: cover;
}
```

## Manutenção

Ao adicionar novas imagens:

1. Coloque as imagens originais em `assets/images/`
2. Execute `node optimize-images.js` para gerar as versões otimizadas
3. Use `data-src` em vez de `src` no HTML
4. Para imagens com proporções especiais (widescreen, panorâmicas, etc.), adicione-as à lista de tratamento especial no script

## Exemplo de Demonstração

Um exemplo de demonstração está disponível em `exemplo-imagens.html`, mostrando o funcionamento do sistema de otimização de imagens.

## Solução de Problemas

- **Imagens não aparecem**: Verifique se está usando `data-src` em vez de `src`
- **Imagens responsivas não carregam**: Verifique se as versões responsivas foram geradas
- **Erro no script**: Verifique se os pacotes Node.js estão instalados (`npm install`)
- **Imagens distorcidas**: 
  1. Verifique se os atributos `height` foram removidos das tags `<img>`
  2. Adicione a imagem à lista de tratamento especial no script de otimização
  3. Use apenas o atributo `width` ou defina `height="auto"` via CSS

### Verificação de Imagens Otimizadas

Para verificar se as imagens foram otimizadas corretamente:

```powershell
# Verificar versões responsivas de uma imagem específica
Get-ChildItem -Path assets/images/hero-bride*

# Verificar todas as imagens WebP geradas
Get-ChildItem -Path assets/images/*.webp
```

### Verificação de Proporções no Navegador

Se as imagens ainda parecerem distorcidas no navegador:

1. Inspecione o elemento usando as ferramentas de desenvolvedor do navegador
2. Verifique se há estilos CSS que possam estar forçando dimensões específicas
3. Confirme que o HTML não contém atributos `height` fixos
4. Verifique se o CSS inclui `height: auto` para as imagens

## Dependências

- Node.js
- Pacotes NPM:
  - sharp
  - glob

## Conclusão

Este sistema de otimização de imagens melhora significativamente o desempenho do site Perfect Wedding, reduzindo o tamanho das imagens e implementando técnicas modernas de carregamento. Isso resulta em uma melhor experiência do usuário e melhor classificação nos mecanismos de busca.

## Resumo das Alterações Recentes

Para resolver problemas de distorção de imagens e layout shifts (CLS), realizamos as seguintes alterações:

1. **Adição de atributos width e height explícitos**: Adicionamos atributos `width` e `height` explícitos nas tags `<img>` no arquivo `index.html` para permitir que o navegador reserve o espaço correto antes do carregamento das imagens.

2. **Correção de proporções para imagens quadradas**: Corrigimos os parâmetros `width` e `height` das imagens na seção "antes e depois" para refletir sua proporção quadrada (1:1), alterando de `width="300" height="300"` para `width="450" height="450"`, aumentando significativamente o tamanho para melhor visualização.

3. **Ajuste do CSS para imagens quadradas**: Modificamos o CSS para garantir que as imagens na seção "antes e depois" sejam exibidas como quadrados perfeitos, com dimensões fixas de 450x450 pixels e dispostas lado a lado em desktop e empilhadas em dispositivos móveis.

4. **Responsividade aprimorada**: Implementamos breakpoints responsivos para ajustar o tamanho das imagens em diferentes tamanhos de tela (350px em tablets grandes, 400px em tablets, 300px em smartphones).

5. **Tratamento especial para imagens widescreen**: Modificamos o script de otimização para identificar e tratar de forma especial imagens widescreen, usando o modo `fit: 'cover'` para preservar a proporção original.

6. **CSS para evitar layout shifts**: Adicionamos regras CSS para definir aspect-ratio e dimensões mínimas para os contêineres de imagens, evitando layout shifts durante o carregamento.

7. **Melhorias no CSS para contêineres de imagens**: Adicionamos `display: flex`, `justify-content: center` e `align-items: center` aos contêineres de imagens para garantir que as imagens sejam centralizadas e preencham adequadamente seus contêineres.

8. **Documentação atualizada**: Atualizamos esta documentação para incluir informações sobre como lidar com proporções de imagens e evitar layout shifts.

Estas alterações garantem que todas as imagens do site sejam exibidas corretamente, mantendo suas proporções originais e evitando layout shifts, o que melhora a pontuação de Core Web Vitals no PageSpeed Insights. 