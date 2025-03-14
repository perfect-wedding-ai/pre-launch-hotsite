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
  console.log('BlogImage renderizando com:', { src, fallbackSrc, assetId, spaceId });
  
  const [imgSrc, setImgSrc] = useState(src);
  const [attemptCount, setAttemptCount] = useState(0);
  
  // Se temos um assetId e spaceId, tentar construir URLs do Contentful
  useEffect(() => {
    if (typeof window === 'undefined' || !assetId || !spaceId) {
      return;
    }
    
    // URL real encontrada - substituir se necessário com o assetId atual
    const urlReal = `https://images.ctfassets.net/${spaceId}/${assetId}/6966db278b08f4076e0635bf405d7170/.vestidos-noiva-medievaljpg`;
    
    // Construir diferentes formatos de URL do Contentful para teste
    const urls = [
      // URL real encontrada (exatamente como foi encontrada)
      `https://images.ctfassets.net/dzhp8jiscbno/3OqCzCVVMNNtktlmn42ANR/6966db278b08f4076e0635bf405d7170/.vestidos-noiva-medievaljpg`,
      
      // URL adaptada com o spaceId e assetId atuais mas mantendo o resto
      urlReal,
      
      // Outras variações para testar
      `https://images.ctfassets.net/${spaceId}/${assetId}/image.jpg`,
      `https://images.ctfassets.net/${spaceId}/${assetId}`,
      `https://assets.ctfassets.net/${spaceId}/${assetId}`,
      
      // Sem o nome de arquivo
      `https://images.ctfassets.net/${spaceId}/${assetId}/6966db278b08f4076e0635bf405d7170`,
      
      // Com nomes de arquivo diferentes
      `https://images.ctfassets.net/${spaceId}/${assetId}/6966db278b08f4076e0635bf405d7170/image.jpg`,
      `https://images.ctfassets.net/${spaceId}/${assetId}/6966db278b08f4076e0635bf405d7170/blog-image.jpg`
    ];
    
    console.log('Testando URLs de asset do Contentful:', urls);
    
    // Testar cada URL para ver se carrega
    urls.forEach((url, index) => {
      try {
        const testImg = document.createElement('img');
        testImg.onload = () => {
          console.log(`URL ${index + 1} carregou com sucesso:`, url);
          setImgSrc(url);
        };
        testImg.onerror = () => {
          console.log(`URL ${index + 1} falhou:`, url);
        };
        testImg.src = url;
      } catch (error) {
        console.error(`Erro ao testar URL ${index + 1}:`, error);
      }
    });
    
    // Se o assetId for exatamente o mesmo do exemplo, use a URL real imediatamente
    if (assetId === '3OqCzCVVMNNtktlmn42ANR') {
      const exataUrl = `https://images.ctfassets.net/dzhp8jiscbno/3OqCzCVVMNNtktlmn42ANR/6966db278b08f4076e0635bf405d7170/.vestidos-noiva-medievaljpg`;
      console.log('Usando URL exata do exemplo encontrado:', exataUrl);
      setImgSrc(exataUrl);
    }
      
  }, [assetId, spaceId, src]);
  
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
    console.error('Erro ao carregar imagem:', imgSrc);
    
    // Se a imagem falhar, usar a de fallback
    if (imgSrc !== fallbackSrc) {
      console.log('Mudando para a imagem de fallback');
      setImgSrc(fallbackSrc);
    }
  };
  
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
        onError={handleImageError}
      />
    </div>
  );
}
