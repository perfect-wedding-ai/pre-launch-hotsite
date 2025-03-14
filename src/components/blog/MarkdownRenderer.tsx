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

  // Função para processar formatação de texto em uma linha
  const processTextFormatting = (text: string) => {
    // Regex para identificar texto em negrito (**texto** ou __texto__)
    const boldRegex = /(\*\*|__)(.*?)\1/g;
    // Regex para identificar texto em itálico (*texto* ou _texto_)
    const italicRegex = /(\*|_)(.*?)\1/g;
    
    // Processa negrito primeiro
    let formattedText = text.split(boldRegex).map((part, index) => {
      if (index % 3 === 2) {
        // Este é o conteúdo entre ** ou __
        return <strong key={`bold-${index}`} className="font-bold">{part}</strong>;
      }
      return part;
    });
    
    // Processa o itálico nas partes que não são React elements
    const processItalic = (textPart: React.ReactNode) => {
      if (typeof textPart !== 'string') return textPart;
      
      // Divide o texto pelos marcadores de itálico
      return textPart.split(italicRegex).map((part, index) => {
        if (index % 3 === 2) {
          // Este é o conteúdo entre * ou _
          return <em key={`italic-${index}`} className="italic">{part}</em>;
        }
        return part;
      });
    };
    
    // Aplica processamento de itálico a cada parte
    const finalText = formattedText.map((part, index) => 
      typeof part === 'string' ? processItalic(part) : part
    );
    
    return finalText;
  };

  // Função para converter markdown para elementos HTML
  const renderMarkdown = (markdown: string) => {
    // Quebrar em linhas
    const lines = markdown.split('\n');
    const elements = [];
    
    // Lista de estados para controlar listas
    let inUnorderedList = false;
    let inOrderedList = false;
    let listItems: React.ReactNode[] = [];
    
    // Processa linha por linha
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
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
      else if (line.trim().match(/^[\-\*]\s/)) {
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
        const itemContent = line.trim().substring(2);
        listItems.push(
          <li key={`li-${i}`} className="text-gray-800">
            {processTextFormatting(itemContent)}
          </li>
        );
      }
      // Listas ordenadas (1. item)
      else if (line.trim().match(/^\d+\.\s/)) {
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
        const itemContent = line.trim().replace(/^\d+\.\s/, '');
        listItems.push(
          <li key={`li-${i}`} className="text-gray-800">
            {processTextFormatting(itemContent)}
          </li>
        );
      }
      // Se linha estiver vazia, finaliza listas abertas
      else if (line.trim() === '') {
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
        
        elements.push(<div key={i} className="h-4"></div>);
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