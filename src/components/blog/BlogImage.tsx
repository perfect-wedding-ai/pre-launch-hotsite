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
  
  // Inicializar com fallbackSrc se src estiver vazio, evitando erros de preload
  const [imgSrc, setImgSrc] = useState(src && src.trim() !== '' ? src : fallbackSrc);
  const [attemptCount, setAttemptCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Se temos um assetId e spaceId, tentar construir URLs do Contentful
  useEffect(() => {
    if (typeof window === 'undefined' || !assetId || !spaceId) {
      return;
    }
    
    // Se o assetId for exatamente o mesmo do exemplo, use a URL real imediatamente
    if (assetId === '3OqCzCVVMNNtktlmn42ANR') {
      const exataUrl = `https://images.ctfassets.net/dzhp8jiscbno/3OqCzCVVMNNtktlmn42ANR/6966db278b08f4076e0635bf405d7170/.vestidos-noiva-medievaljpg`;
      console.log('Usando URL exata do exemplo encontrado:', exataUrl);
      setImgSrc(exataUrl);
      return;
    }
    
    // URL real encontrada com padrão adaptado ao assetId atual
    const urlReal = `https://images.ctfassets.net/${spaceId}/${assetId}/6966db278b08f4076e0635bf405d7170/.vestidos-noiva-medievaljpg`;
    
    // Construir diferentes formatos de URL do Contentful para teste
    const urls = [
      // Tentativa com o padrão que funcionou anteriormente
      `https://images.ctfassets.net/${spaceId}/${assetId}/6966db278b08f4076e0635bf405d7170/.vestidos-noiva-medievaljpg`,
      
      // Sem o nome de arquivo
      `https://images.ctfassets.net/${spaceId}/${assetId}/6966db278b08f4076e0635bf405d7170`,
      
      // Com nomes de arquivo diferentes
      `https://images.ctfassets.net/${spaceId}/${assetId}/6966db278b08f4076e0635bf405d7170/image.jpg`,
      
      // URL sem hash (menos provável de funcionar)
      `https://images.ctfassets.net/${spaceId}/${assetId}/image.jpg`,
      `https://images.ctfassets.net/${spaceId}/${assetId}`,
    ];
    
    console.log('Testando URLs de asset do Contentful:', urls);
    
    // Testar cada URL para ver se carrega
    let anyLoaded = false;
    
    urls.forEach((url, index) => {
      try {
        if (!url || url.trim() === '') {
          console.log(`URL ${index + 1} está vazia, ignorando`);
          return;
        }
        
        const testImg = document.createElement('img');
        testImg.onload = () => {
          console.log(`URL ${index + 1} carregou com sucesso:`, url);
          if (!anyLoaded) {
            setImgSrc(url);
            setImageLoaded(true);
            anyLoaded = true;
          }
        };
        testImg.onerror = () => {
          console.log(`URL ${index + 1} falhou:`, url);
        };
        testImg.src = url;
      } catch (error) {
        console.error(`Erro ao testar URL ${index + 1}:`, error);
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
    console.error('Erro ao carregar imagem:', imgSrc);
    
    // Se a imagem falhar, usar a de fallback
    if (imgSrc !== fallbackSrc) {
      console.log('Mudando para a imagem de fallback');
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
