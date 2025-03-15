import { formatMarkdown } from '../markdownProcessor';

describe('Formatação Markdown', () => {
  // Testes para formatações simples
  test('Deve processar texto sem formatação', () => {
    const input = 'Texto sem formatação';
    const expected = 'Texto sem formatação';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar texto em negrito (**)', () => {
    const input = 'Um texto com **parte em negrito**';
    const expected = 'Um texto com <strong class="font-bold">parte em negrito</strong>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar texto em itálico (*)', () => {
    const input = 'Um texto com *parte em itálico*';
    const expected = 'Um texto com <em class="italic">parte em itálico</em>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar texto sublinhado (__)', () => {
    const input = 'Um texto com __parte sublinhada__';
    const expected = 'Um texto com <u class="underline">parte sublinhada</u>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  // Testes para combinações de duas formatações
  test('Deve processar texto em negrito e itálico (***)', () => {
    const input = 'Um texto com ***negrito e itálico***';
    const expected = 'Um texto com <strong class="font-bold"><em class="italic">negrito e itálico</em></strong>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar texto em negrito e itálico (**+ *)', () => {
    const input = 'Um texto com **texto em *negrito e itálico***';
    const expected = 'Um texto com <strong class="font-bold">texto em <em class="italic">negrito e itálico</em></strong>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar texto em negrito e sublinhado (**+__)', () => {
    const input = 'Um texto com **__negrito e sublinhado__**';
    const expected = 'Um texto com <strong class="font-bold"><u class="underline">negrito e sublinhado</u></strong>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar texto em itálico e sublinhado (*+__)', () => {
    const input = 'Um texto com *__itálico e sublinhado__*';
    const expected = 'Um texto com <em class="italic"><u class="underline">itálico e sublinhado</u></em>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  // Testes para combinações de três formatações
  test('Deve processar texto em negrito, itálico e sublinhado (combinação complexa)', () => {
    const input = 'Um texto com ***__negrito, itálico e sublinhado__***';
    const expected = 'Um texto com <strong class="font-bold"><em class="italic"><u class="underline">negrito, itálico e sublinhado</u></em></strong>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar texto em negrito, itálico e sublinhado (aninhado)', () => {
    const input = 'Um texto com **texto em negrito *com parte em itálico* e __parte sublinhada__**';
    const expected = 'Um texto com <strong class="font-bold">texto em negrito <em class="italic">com parte em itálico</em> e <u class="underline">parte sublinhada</u></strong>';
    expect(formatMarkdown(input)).toBe(expected);
  });

  // Testes para casos especiais
  test('Deve ignorar formatação incompleta ou mal formada', () => {
    const input = 'Texto com *formatação incompleta** ou **desequilibrada*';
    const expected = 'Texto com *formatação incompleta** ou **desequilibrada*';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar múltiplas instâncias de formatação', () => {
    const input = '**Negrito** e *itálico* e __sublinhado__ em uma mesma linha';
    const expected = '<strong class="font-bold">Negrito</strong> e <em class="italic">itálico</em> e <u class="underline">sublinhado</u> em uma mesma linha';
    expect(formatMarkdown(input)).toBe(expected);
  });

  test('Deve processar tags HTML literais', () => {
    const input = 'Texto com <b>negrito</b> e <i>itálico</i> e <u>sublinhado</u>';
    const expected = 'Texto com <strong class="font-bold">negrito</strong> e <em class="italic">itálico</em> e <u class="underline">sublinhado</u>';
    expect(formatMarkdown(input)).toBe(expected);
  });
  
  // Testes para títulos (h1-h6)
  describe('Formatação de Títulos', () => {
    test('Deve processar título h1', () => {
      const input = '# Título de nível 1';
      const expected = '<h1 class="text-3xl font-bold mt-6 mb-4">Título de nível 1</h1>';
      expect(formatMarkdown(input)).toBe(expected);
    });

    test('Deve processar título h2', () => {
      const input = '## Título de nível 2';
      const expected = '<h2 class="text-2xl font-bold mt-5 mb-3">Título de nível 2</h2>';
      expect(formatMarkdown(input)).toBe(expected);
    });

    test('Deve processar título h3', () => {
      const input = '### Título de nível 3';
      const expected = '<h3 class="text-xl font-bold mt-4 mb-2">Título de nível 3</h3>';
      expect(formatMarkdown(input)).toBe(expected);
    });

    test('Deve processar título h4', () => {
      const input = '#### Título de nível 4';
      const expected = '<h4 class="text-lg font-bold mt-3 mb-2">Título de nível 4</h4>';
      expect(formatMarkdown(input)).toBe(expected);
    });

    test('Deve processar título h5', () => {
      const input = '##### Título de nível 5';
      const expected = '<h5 class="text-base font-bold mt-3 mb-1">Título de nível 5</h5>';
      expect(formatMarkdown(input)).toBe(expected);
    });

    test('Deve processar título h6', () => {
      const input = '###### Título de nível 6';
      const expected = '<h6 class="text-sm font-bold mt-2 mb-1">Título de nível 6</h6>';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar múltiplos títulos em um texto', () => {
      const input = '# Título Principal\n\nTexto normal\n\n## Subtítulo\n\nMais texto';
      const expected = '<h1 class="text-3xl font-bold mt-6 mb-4">Título Principal</h1>\n\nTexto normal\n\n<h2 class="text-2xl font-bold mt-5 mb-3">Subtítulo</h2>\n\nMais texto';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve ignorar # sem espaço como título', () => {
      const input = '#Isso não é um título';
      const expected = '#Isso não é um título';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar título com formatação adicional', () => {
      const input = '## Título com **negrito** e *itálico*';
      const expected = '<h2 class="text-2xl font-bold mt-5 mb-3">Título com <strong class="font-bold">negrito</strong> e <em class="italic">itálico</em></h2>';
      expect(formatMarkdown(input)).toBe(expected);
    });
  });
  
  // Testes para links
  describe('Formatação de Links', () => {
    test('Deve processar link simples', () => {
      const input = '[Perfect Wedding](https://perfectwedding.ai)';
      const expected = '<a href="https://perfectwedding.ai" class="text-blue-600 hover:text-blue-800 underline">Perfect Wedding</a>';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar link no meio de um texto', () => {
      const input = 'Visite o site [Perfect Wedding](https://perfectwedding.ai) para mais informações.';
      const expected = 'Visite o site <a href="https://perfectwedding.ai" class="text-blue-600 hover:text-blue-800 underline">Perfect Wedding</a> para mais informações.';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar múltiplos links', () => {
      const input = '[Link 1](https://site1.com) e [Link 2](https://site2.com)';
      const expected = '<a href="https://site1.com" class="text-blue-600 hover:text-blue-800 underline">Link 1</a> e <a href="https://site2.com" class="text-blue-600 hover:text-blue-800 underline">Link 2</a>';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar link com formatação no texto', () => {
      const input = '[**Texto em negrito**](https://exemplo.com)';
      const expected = '<a href="https://exemplo.com" class="text-blue-600 hover:text-blue-800 underline"><strong class="font-bold">Texto em negrito</strong></a>';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar link com URL relativa', () => {
      const input = '[Página Inicial](blog)';
      const expected = '<a href="/blog" class="text-blue-600 hover:text-blue-800 underline">Página Inicial</a>';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar link com âncora', () => {
      const input = '[Ir para seção](#secao)';
      const expected = '<a href="#secao" class="text-blue-600 hover:text-blue-800 underline">Ir para seção</a>';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar link dentro de formatação', () => {
      const input = '**[Link em negrito](https://exemplo.com)**';
      const expected = '<strong class="font-bold"><a href="https://exemplo.com" class="text-blue-600 hover:text-blue-800 underline">Link em negrito</a></strong>';
      expect(formatMarkdown(input)).toBe(expected);
    });
    
    test('Deve processar tags <a> HTML já existentes', () => {
      const input = '<a href="https://exemplo.com">Link HTML</a>';
      const expected = '<a href="https://exemplo.com" class="text-blue-600 hover:text-blue-800 underline">Link HTML</a>';
      expect(formatMarkdown(input)).toBe(expected);
    });
  });
}); 