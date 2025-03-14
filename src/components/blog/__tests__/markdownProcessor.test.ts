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
}); 