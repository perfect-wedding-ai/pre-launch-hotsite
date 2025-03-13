import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = request.headers.get('x-contentful-webhook-secret');
    
    // Verificar o segredo para autenticação
    if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }
    
    // Extrair informações do webhook do Contentful
    const { sys } = body;
    
    if (!sys) {
      return NextResponse.json(
        { message: 'Invalid webhook payload' },
        { status: 400 }
      );
    }
    
    // Revalidar caminhos com base no tipo de conteúdo
    if (sys.contentType && sys.contentType.sys.id === 'blogPost') {
      // Revalidar a página de listagem do blog em todos os idiomas
      revalidatePath('/pt/blog');
      revalidatePath('/en/blog');
      
      // Se for uma atualização de post específico, revalidar também a página do post
      if (sys.id && body.fields && body.fields.slug) {
        const slug = body.fields.slug['pt-BR'] || body.fields.slug['en-US'];
        if (slug) {
          revalidatePath(`/pt/blog/${slug}`);
          revalidatePath(`/en/blog/${slug}`);
        }
      }
    } else if (sys.contentType && sys.contentType.sys.id === 'category') {
      // Revalidar a página de listagem do blog em todos os idiomas quando uma categoria é atualizada
      revalidatePath('/pt/blog');
      revalidatePath('/en/blog');
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: (error as Error).message },
      { status: 500 }
    );
  }
} 