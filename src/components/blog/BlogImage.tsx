'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}

export default function BlogImage({ src, fallbackSrc, alt, className = '' }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <div className="relative h-96 w-full mb-8">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover rounded-lg ${className}`}
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
