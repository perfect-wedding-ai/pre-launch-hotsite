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
  const [imgSrc, setImgSrc] = useState(src && src.trim() !== '' ? src : fallbackSrc);
  
  // Se temos um assetId e spaceId, tentar construir URL do Contentful
  useEffect(() => {
    if (typeof window === 'undefined' || !assetId || !spaceId) {
      return;
    }
    
    // Construir URL do Contentful baseada no assetId
    const contentfulUrl = `https://images.ctfassets.net/${spaceId}/${assetId}/image.jpg`;
    
    // Testar se a URL carrega corretamente
    const testImg = document.createElement('img');
    testImg.onload = () => {
      setImgSrc(contentfulUrl);
    };
    testImg.onerror = () => {
      // Tentar um formato alternativo sem extensão
      const alternativeUrl = `https://images.ctfassets.net/${spaceId}/${assetId}`;
      const altImg = document.createElement('img');
      altImg.onload = () => {
        setImgSrc(alternativeUrl);
      };
      altImg.src = alternativeUrl;
    };
    testImg.src = contentfulUrl;
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
  
  // Função para tentar a imagem de fallback quando a original falha
  const handleImageError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };
  
  // Garantir que sempre temos uma URL válida
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
