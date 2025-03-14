'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  aspectRatio?: string; // Por exemplo, "16/9", "4/3", "1/1"
  maxHeight?: string; // altura máxima em pixels, ex: "600px"
}

export default function BlogImage({ 
  src, 
  fallbackSrc, 
  alt, 
  className = '',
  objectFit = 'cover',
  aspectRatio = '16/9',
  maxHeight
}: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
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
  
  return (
    <div 
      className={`relative w-full mb-8 mx-auto ${className}`}
      style={containerStyle}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`${objectFitClass} rounded-lg`}
        priority
        onError={() => {
          console.error('Erro ao carregar imagem, usando fallback');
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }}
      />
    </div>
  );
}
