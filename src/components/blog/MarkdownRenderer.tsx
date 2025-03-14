import React from 'react';
import { Locale } from '@/config/i18n.config';
import Image from 'next/image';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
  locale: Locale;
}

export default function MarkdownRenderer({ content, locale }: MarkdownRendererProps) {
  // Se não tiver conteúdo, retorna mensagem padrão
  if (!content) {
    return <div className="text-gray-500">Conteúdo indisponível</div>;
  }

  // Para depuração
  console.log('MarkdownRenderer recebeu:', content);
  
  // Função para processar formatação de texto em uma linha
  const processTextFormatting = (text: string) => {
    // Debug inicial
    console.log('Texto original:', text);
    
    // 1. Primeiro passo: identificar e substituir tags HTML literais no texto
    // Procurar por padrões como <u>texto</u>, <b>texto</b>, <i>texto</i>, etc.
    
    // Processar tags <u>...</u> para underline
    const processHtmlTags = (inputText: string): (string | JSX.Element)[] => {
      const parts: (string | JSX.Element)[] = [];
      
      // Função auxiliar para processar diferentes tipos de tags
      const processTag = (
        text: string, 
        tagRegex: RegExp, 
        createElement: (content: string, key: string) => JSX.Element
      ): {
        result: (string | JSX.Element)[];
        lastProcessedIndex: number;
      } => {
        const tagParts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match;
        
        // Para cada match da tag
        while ((match = tagRegex.exec(text)) !== null) {
          // Adicionar o texto antes da tag
          if (match.index > lastIndex) {
            tagParts.push(text.substring(lastIndex, match.index));
          }
          
          // Adicionar o conteúdo dentro da tag como um elemento React
          const content = match[1]; // O texto entre tags
          tagParts.push(createElement(content, `tag-${match.index}`));
          
          lastIndex = match.index + match[0].length;
        }
        
        // Adicionar o texto restante após o último match
        if (lastIndex < text.length) {
          tagParts.push(text.substring(lastIndex));
        }
        
        return {
          result: tagParts,
          lastProcessedIndex: lastIndex
        };
      };
      
      // Processar diferentes tipos de tags HTML
      
      // 1. Processar tags <u>...</u>
      const uTagRegex = /<u>(.*?)<\/u>/g;
      const uTagResult = processTag(
        inputText, 
        uTagRegex, 
        (content, key) => <u key={`html-u-${key}`} className="underline">{content}</u>
      );
      
      // 2. Processar tags <b>...</b>
      let processedSoFar = uTagResult.result.map(part => {
        if (typeof part !== 'string') return part;
        
        const bTagRegex = /<b>(.*?)<\/b>/g;
        const bTagResult = processTag(
          part,
          bTagRegex,
          (content, key) => <strong key={`html-b-${key}`} className="font-bold">{content}</strong>
        );
        
        return bTagResult.result;
      }).flat();
      
      // 3. Processar tags <i>...</i>
      processedSoFar = processedSoFar.map(part => {
        if (typeof part !== 'string') return part;
        
        const iTagRegex = /<i>(.*?)<\/i>/g;
        const iTagResult = processTag(
          part,
          iTagRegex,
          (content, key) => <em key={`html-i-${key}`} className="italic">{content}</em>
        );
        
        return iTagResult.result;
      }).flat();
      
      // 4. Processar tags <strong>...</strong>
      processedSoFar = processedSoFar.map(part => {
        if (typeof part !== 'string') return part;
        
        const strongTagRegex = /<strong>(.*?)<\/strong>/g;
        const strongTagResult = processTag(
          part,
          strongTagRegex,
          (content, key) => <strong key={`html-strong-${key}`} className="font-bold">{content}</strong>
        );
        
        return strongTagResult.result;
      }).flat();
      
      // 5. Processar tags <em>...</em>
      processedSoFar = processedSoFar.map(part => {
        if (typeof part !== 'string') return part;
        
        const emTagRegex = /<em>(.*?)<\/em>/g;
        const emTagResult = processTag(
          part,
          emTagRegex,
          (content, key) => <em key={`html-em-${key}`} className="italic">{content}</em>
        );
        
        return emTagResult.result;
      }).flat();
      
      return processedSoFar.length > 0 ? processedSoFar : [inputText];
    };
    
    // Processar tags HTML no texto original
    const htmlProcessed = processHtmlTags(text);
    
    // 2. Para cada parte que é string, aplicar as correções de markdown
    const processMarkdown = (textPart: string | JSX.Element): string | JSX.Element | (string | JSX.Element)[] => {
      // Se não for string (já for elemento React), retorna sem alteração
      if (typeof textPart !== 'string') {
        return textPart;
      }
      
      // Aplicar as correções de markdown ao texto
      // Substituir *Palavra* por **Palavra**
      let correctedText = textPart.replace(/\*([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ]+)\*/g, '**$1**');
      
      // Substituir *Palavra (um asterisco no início) por **Palavra**
      correctedText = correctedText.replace(/(\s|^)\*([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ]+)(\s|:|,|$)/g, '$1**$2**$3');
      
      // Tratar caso específico de itens de lista com asterisco (como "• *Palavra")
      correctedText = correctedText.replace(/(•|-|\*|\d+\.)\s+\*([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ]+)/g, '$1 **$2');
      
      // Remover asteriscos extras (como *** ou mais)
      correctedText = correctedText.replace(/\*{3,}/g, '**');
      
      // Debug para verificar modificações
      if (textPart !== correctedText) {
        console.log('Texto corrigido:', correctedText);
      }
      
      // Regex para identificar texto em negrito (**texto**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      // Regex para identificar texto sublinhado (__texto__)
      const underlineRegex = /__(.*?)__/g;
      
      // Regex para identificar texto em itálico (*texto* ou _texto_)
      const italicRegex = /(\*|_)(.*?)\1/g;
      
      // Primeiro passagem: processar underline
      let underlineProcessed: (string | JSX.Element)[] = [];
      const underlineSplit = correctedText.split(underlineRegex);
      
      for (let i = 0; i < underlineSplit.length; i++) {
        if (i % 2 === 0) {
          // Partes que não são underline
          underlineProcessed.push(underlineSplit[i]);
        } else {
          // Partes em underline
          underlineProcessed.push(<u key={`underline-${i}`} className="underline">{underlineSplit[i]}</u>);
        }
      }
      
      // Segunda passagem: processar negrito em cada parte
      let formattedText: (string | JSX.Element)[] = [];
      
      // Processa cada parte do texto (que pode já conter underline)
      underlineProcessed.forEach((part, partIndex) => {
        if (typeof part !== 'string') {
          // Se já for um elemento React (underline), adiciona direto
          formattedText.push(part);
          return;
        }
        
        // Divide a parte por bold e processa
        const boldSplit = part.split(boldRegex);
        let boldProcessed: (string | JSX.Element)[] = [];
        
        for (let i = 0; i < boldSplit.length; i++) {
          if (i % 2 === 0) {
            // Partes que não são bold
            boldProcessed.push(boldSplit[i]);
          } else {
            // Partes em bold
            boldProcessed.push(<strong key={`bold-${partIndex}-${i}`} className="font-bold">{boldSplit[i]}</strong>);
          }
        }
        
        // Adiciona as partes processadas
        formattedText = formattedText.concat(boldProcessed);
      });
      
      // Terceira passagem: processa itálico em cada parte
      const processItalic = (textPart: React.ReactNode): React.ReactNode | React.ReactNode[] => {
        if (typeof textPart !== 'string') return textPart;
        
        // Divide o texto pelos marcadores de itálico
        const italicSplit = textPart.split(italicRegex);
        let result: (string | JSX.Element)[] = [];
        
        for (let i = 0; i < italicSplit.length; i++) {
          if (i % 3 === 0 || i % 3 === 1) {
            // Partes que não são itálico ou os próprios delimitadores
            if (italicSplit[i] !== '') {
              result.push(italicSplit[i]);
            }
          } else {
            // Partes em itálico
            result.push(<em key={`italic-${i}`} className="italic">{italicSplit[i]}</em>);
          }
        }
        
        return result;
      };
      
      // Aplica processamento de itálico a cada parte
      const finalText = formattedText.map((part, index) => 
        typeof part === 'string' ? processItalic(part) : part
      );
      
      // Garantindo que todos os itens são string ou JSX.Element
      const typedFinalText = finalText.flat().filter(item => 
        item !== undefined && item !== null
      ) as (string | JSX.Element)[];
      
      // Retorna o array final tipado corretamente
      return typedFinalText;
    };
    
    // Aplicar processamento de markdown a cada parte
    const processedParts = htmlProcessed.map((part, index) => 
      processMarkdown(part)
    );
    
    // Achatar o array final
    return processedParts.flat();
  };

  // Função para converter markdown para elementos HTML
  const renderMarkdown = (markdown: string) => {
    console.log('Processando markdown:', markdown);
    
    // Função auxiliar para verificar se uma linha é um item de lista não ordenada
    const isUnorderedListItem = (line: string) => {
      const trimmedLine = line.trim();
      return trimmedLine.match(/^[\-\*]\s/) !== null;
    };
    
    // Função auxiliar para verificar se uma linha é um item de lista ordenada
    const isOrderedListItem = (line: string) => {
      const trimmedLine = line.trim();
      return trimmedLine.match(/^\d+\.\s/) !== null;
    };
    
    // Quebrar em linhas
    const lines = markdown.split('\n');
    const elements = [];
    
    // Lista de estados para controlar listas
    let inUnorderedList = false;
    let inOrderedList = false;
    let listItems: React.ReactNode[] = [];
    
    // Processa linha por linha
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Se a linha estiver vazia, pular
      if (line === '') {
        // Finaliza listas abertas
        if (inUnorderedList) {
          console.log('Fechando lista não ordenada:', listItems);
          elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
          listItems = [];
          inUnorderedList = false;
        }
        if (inOrderedList) {
          console.log('Fechando lista ordenada:', listItems);
          elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
          listItems = [];
          inOrderedList = false;
        }
        
        continue;
      }
      
      // Headings
      if (line.startsWith('### ')) {
        // Finaliza listas abertas
        if (inUnorderedList) {
          elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
          listItems = [];
          inUnorderedList = false;
        }
        if (inOrderedList) {
          elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
          listItems = [];
          inOrderedList = false;
        }
        
        elements.push(
          <h3 key={i} className="text-2xl font-bold mb-4 mt-6 font-playfair">
            {processTextFormatting(line.substring(4))}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        // Finaliza listas abertas
        if (inUnorderedList) {
          elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
          listItems = [];
          inUnorderedList = false;
        }
        if (inOrderedList) {
          elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
          listItems = [];
          inOrderedList = false;
        }
        
        elements.push(
          <h4 key={i} className="text-xl font-bold mb-3 mt-5 font-playfair">
            {processTextFormatting(line.substring(5))}
          </h4>
        );
      } else if (line.startsWith('## ')) {
        // Finaliza listas abertas
        if (inUnorderedList) {
          elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
          listItems = [];
          inUnorderedList = false;
        }
        if (inOrderedList) {
          elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
          listItems = [];
          inOrderedList = false;
        }
        
        elements.push(
          <h2 key={i} className="text-3xl font-bold mb-5 mt-8 font-playfair">
            {processTextFormatting(line.substring(3))}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        // Finaliza listas abertas
        if (inUnorderedList) {
          elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
          listItems = [];
          inUnorderedList = false;
        }
        if (inOrderedList) {
          elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
          listItems = [];
          inOrderedList = false;
        }
        
        elements.push(
          <h1 key={i} className="text-4xl font-bold mb-6 mt-8 font-playfair">
            {processTextFormatting(line.substring(2))}
          </h1>
        );
      } else if (line.startsWith('##### ')) {
        // Finaliza listas abertas
        if (inUnorderedList) {
          elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
          listItems = [];
          inUnorderedList = false;
        }
        if (inOrderedList) {
          elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
          listItems = [];
          inOrderedList = false;
        }
        
        elements.push(
          <h5 key={i} className="text-lg font-bold mb-2 mt-4 font-playfair">
            {processTextFormatting(line.substring(6))}
          </h5>
        );
      } else if (line.startsWith('###### ')) {
        // Finaliza listas abertas
        if (inUnorderedList) {
          elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
          listItems = [];
          inUnorderedList = false;
        }
        if (inOrderedList) {
          elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
          listItems = [];
          inOrderedList = false;
        }
        
        elements.push(
          <h6 key={i} className="text-base font-bold mb-2 mt-3 font-playfair">
            {processTextFormatting(line.substring(7))}
          </h6>
        );
      } 
      // Listas não ordenadas (- item ou * item)
      else if (isUnorderedListItem(line)) {
        console.log('Detectado item de lista não ordenada:', line);
        
        // Se não estávamos em lista não ordenada, finaliza lista ordenada se estava aberta
        if (!inUnorderedList) {
          if (inOrderedList) {
            elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
            listItems = [];
            inOrderedList = false;
          }
          inUnorderedList = true;
          listItems = [];
        }
        
        // Adiciona item
        const itemContent = line.substring(line.indexOf(' ') + 1);
        listItems.push(
          <li key={`li-${i}`} className="text-gray-800">
            {processTextFormatting(itemContent)}
          </li>
        );
      }
      // Listas ordenadas (1. item)
      else if (isOrderedListItem(line)) {
        console.log('Detectado item de lista ordenada:', line);
        
        // Se não estávamos em lista ordenada, finaliza lista não ordenada se estava aberta
        if (!inOrderedList) {
          if (inUnorderedList) {
            elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
            listItems = [];
            inUnorderedList = false;
          }
          inOrderedList = true;
          listItems = [];
        }
        
        // Adiciona item
        const itemContent = line.replace(/^\d+\.\s/, '');
        listItems.push(
          <li key={`li-${i}`} className="text-gray-800">
            {processTextFormatting(itemContent)}
          </li>
        );
      }
      // Parágrafo normal
      else {
        // Finaliza listas abertas
        if (inUnorderedList) {
          elements.push(<ul key={`ul-${i}`} className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
          listItems = [];
          inUnorderedList = false;
        }
        if (inOrderedList) {
          elements.push(<ol key={`ol-${i}`} className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
          listItems = [];
          inOrderedList = false;
        }
        
        elements.push(
          <p key={i} className="mb-6 leading-relaxed text-gray-800">
            {processTextFormatting(line)}
          </p>
        );
      }
    }
    
    // Finaliza listas abertas no final
    if (inUnorderedList) {
      elements.push(<ul key="final-ul" className="list-disc pl-10 mb-6 space-y-2">{listItems}</ul>);
    }
    if (inOrderedList) {
      elements.push(<ol key="final-ol" className="list-decimal pl-10 mb-6 space-y-2">{listItems}</ol>);
    }

    return elements;
  };

  return (
    <div className="rich-text-content">
      {renderMarkdown(content)}
    </div>
  );
} 