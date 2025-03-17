'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// Função para buscar os posts do blog
const fetchBlogPosts = async (lang: string) => {
  try {
    const response = await fetch(`/api/blog/prefetch/${lang}`, {
      next: { revalidate: 60 } // Revalidar a cada minuto
    });
    
    if (!response.ok) {
      throw new Error('Falha ao carregar dados do blog');
    }
    
    return response.json();
  } catch (error) {
    console.log('Erro ao precarregar blog:', error);
    return null;
  }
};

export default function BlogPreloader({ lang }: { lang: string }) {
  const router = useRouter();
  
  // Precarregar dados do blog com React Query
  const { data } = useQuery({
    queryKey: ['blogPosts', lang],
    queryFn: () => fetchBlogPosts(lang),
    staleTime: 1000 * 60 * 5, // Dados ficam frescos por 5 minutos
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  
  // Precarregar a página do blog quando os dados forem carregados
  useEffect(() => {
    if (data) {
      router.prefetch(`/${lang}/blog`);
      console.log('Blog precarregado com sucesso ✅');
    }
  }, [data, router, lang]);
  
  return null; // Não renderiza nada visualmente
} 