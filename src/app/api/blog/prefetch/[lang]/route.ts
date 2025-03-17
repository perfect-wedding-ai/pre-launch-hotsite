import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/contentful/client';
import { Locale } from '@/config/i18n.config';

// Definir os parâmetros estáticos para pré-renderização
export function generateStaticParams() {
  return [
    { lang: 'pt' },
    { lang: 'en' }
    // Removido 'es' pois não é suportado pelo Contentful
  ];
}

// Definir configuração para revalidação
export const revalidate = 3600; // Revalidar a cada hora

export async function GET(
  request: NextRequest,
  { params }: { params: { lang: string } }
) {
  try {
    // Garantir que o lang é um Locale válido
    const lang = ['pt', 'en'].includes(params.lang) ? params.lang as Locale : 'pt' as Locale;
    
    // Buscar apenas dados essenciais para o precarregamento (primeira página)
    const postsResponse = await getBlogPosts(lang, {
      limit: 9, // Mesma quantidade da primeira página
      skip: 0
    });
    
    // Retornar apenas os dados essenciais para minimizar o tamanho da resposta
    const essentialData = {
      total: postsResponse.total,
      items: postsResponse.items.map((post: any) => ({
        sys: { id: post.sys.id },
        fields: {
          title: post.fields.title,
          slug: post.fields.slug,
          publishDate: post.fields.publishDate,
          // Incluir apenas o ID da imagem para economizar transferência
          image: post.fields.image?.sys?.id ? { 
            sys: { id: post.fields.image.sys.id }
          } : null
        }
      }))
    };
    
    return NextResponse.json(essentialData, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Erro no prefetch do blog:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar dados preliminares do blog' },
      { status: 500 }
    );
  }
} 