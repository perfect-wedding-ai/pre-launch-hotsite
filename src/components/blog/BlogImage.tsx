'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BlogImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  aspectRatio?: string; // Por exemplo, "16/9", "4/3", "1/1"
  maxHeight?: string; // altura máxima em pixels, ex: "600px"
  assetId?: string;   // ID do asset no Contentful
  spaceId?: string;   // ID do espaço no Contentful
}

export default function BlogImage({ 
  src, 
  fallbackSrc, 
  alt, 
  className = '',
  objectFit = 'cover',
  aspectRatio = '16/9',
  maxHeight,
  assetId,
  spaceId
}: BlogImageProps) {
  // Inicializar com fallbackSrc se src estiver vazio, evitando erros de preload
  const [imgSrc, setImgSrc] = useState(src && src.trim() !== '' ? src : fallbackSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Se temos um assetId e spaceId, tentar construir URLs do Contentful
  useEffect(() => {
    if (typeof window === 'undefined' || !assetId || !spaceId) {
      return;
    }
    
    // Construir diferentes formatos de URL do Contentful para teste
    const urls = [
      // URL padrão com extensão jpg
      `https://images.ctfassets.net/${spaceId}/${assetId}/image.jpg`,
      
      // URL sem extensão
      `https://images.ctfassets.net/${spaceId}/${assetId}`,
      
      // URL com outros formatos comuns
      `https://images.ctfassets.net/${spaceId}/${assetId}/image.png`,
      `https://images.ctfassets.net/${spaceId}/${assetId}/image.webp`,
      
      // Versão com parâmetros
      `https://images.ctfassets.net/${spaceId}/${assetId}/image.jpg?w=800&h=600&fit=fill`
    ];
    
    // Testar cada URL para ver se carrega
    let anyLoaded = false;
    
    urls.forEach((url) => {
      try {
        if (!url || url.trim() === '') {
          return;
        }
        
        const testImg = document.createElement('img');
        testImg.onload = () => {
          if (!anyLoaded) {
            setImgSrc(url);
            setImageLoaded(true);
            anyLoaded = true;
          }
        };
        testImg.src = url;
      } catch (error) {
        // Silenciosamente falha e tenta a próxima URL
      }
    });
  }, [assetId, spaceId, src, fallbackSrc]);
  
  // Mapear o valor de objectFit para a classe Tailwind correspondente
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  }[objectFit];
  
  // Estilo para o container com suporte para altura máxima
  const containerStyle: React.CSSProperties = { 
    aspectRatio
  };
  
  if (maxHeight) {
    containerStyle.maxHeight = maxHeight;
  }
  
  // Função para tentar a próxima URL quando uma falha
  const handleImageError = () => {
    // Se a imagem falhar, usar a de fallback
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };
  
  // Garantir que sempre temos uma URL válida para o src da imagem
  const finalSrc = imgSrc && imgSrc.trim() !== '' ? imgSrc : fallbackSrc;
  
  return (
    <div 
      className={`relative w-full mb-8 mx-auto ${className}`}
      style={containerStyle}
    >
      <Image
        src={finalSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`${objectFitClass} rounded-lg`}
        priority
        onError={handleImageError}
      />
    </div>
  );
}
