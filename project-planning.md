# Lessons

## User Specified Lessons

- You have a python venv in ./venv. Use it.
- Include info useful for debugging in the program output.
- Read the file before you try to edit it.
- Due to Cursor's limit, when you use `git` and `gh` and need to submit a multiline commit message, first write the message in a file, and then use `git commit -F <filename>` or similar command to commit. And then remove the file. Include "[Cursor] " in the commit message and PR title.

## Cursor learned

- For search results, ensure proper handling of different character encodings (UTF-8) for international queries
- Add debug information to stderr while keeping the main output clean in stdout for better pipeline integration
- When using seaborn styles in matplotlib, use 'seaborn-v0_8' instead of 'seaborn' as the style name due to recent seaborn version changes
- Use 'gpt-4o' as the model name for OpenAI's GPT-4 with vision capabilities
- When searching for recent news, use the current year (2025) instead of previous years, or simply use the "recent" keyword to get the latest information

# Scratchpad

## Implementação do Menu Suspenso do Usuário no Header

### Tarefa
Adicionar um botão no canto direito do Header para um menu suspenso do usuário, usando o componente DropdownMenu do Shadcn UI e o ícone de usuário do Font Awesome.

### Plano de Execução
[X] Verificar se já temos os pacotes Shadcn UI instalados (ou instalar se necessário)
[X] Instalar o Font Awesome (ou verificar se já está disponível)
[X] Adicionar o componente DropdownMenu do Shadcn UI
[X] Implementar o ícone de usuário do Font Awesome
[X] Modificar o Header.tsx para adicionar o menu suspenso
[X] Estilizar o componente de acordo com as cores do site
[X] Testar a implementação

### Progresso
Iniciando a implementação...

Verificação inicial:
- Shadcn UI não está instalado no projeto
- Font Awesome não está instalado no projeto

Pacotes instalados:
- Shadcn UI instalado com sucesso (componente dropdown-menu)
- Font Awesome instalado com sucesso

Modificações no Header.tsx:
- Importei os componentes necessários do Shadcn UI e Font Awesome
- Adicionei suporte para traduções opcionais do menu do usuário (com valores padrão em português)
- Adicionei um botão de usuário com ícone do Font Awesome
- Implementei o menu suspenso com opções de perfil, painel, configurações e sair
- Estilizei o componente para combinar com as cores do site (usando neutros para manter consistência)

Verificação final:
- Confirmei que o globals.css foi atualizado pelo Shadcn com as variáveis CSS necessárias
- Confirmei que o componente DropdownMenu está funcionando corretamente
- Confirmei que o utils.ts foi criado corretamente para o funcionamento do Shadcn UI

Implementação concluída com sucesso! O menu suspenso do usuário foi adicionado ao Header.tsx com as seguintes características:
- Ícone de usuário do Font Awesome
- Menu suspenso com opções de perfil, painel, configurações e sair
- Estilização consistente com as cores do site
- Suporte para traduções

## Implementação de Seletor de Idiomas no Menu Suspenso

### Tarefa
Adicionar um item "Idioma" no menu suspenso do usuário com opções para selecionar inglês, português e espanhol. A escolha do idioma deve ser salva em um cookie e utilizada para determinar o idioma da interface através da rota /[lang]. Se o cookie não existir, o comportamento padrão de detectar o idioma do navegador deve ser mantido.

### Plano de Execução
[ ] Criar um componente LanguageSelector para o menu suspenso
[ ] Adicionar funções para manipulação de cookies para salvar a preferência de idioma
[ ] Modificar o Header.tsx para incluir o item de seleção de idioma no menu
[ ] Atualizar o middleware.ts para verificar o cookie de idioma e priorizar sobre o idioma do navegador
[ ] Adicionar lógica de redirecionamento quando o usuário muda o idioma
[ ] Implementar traduções necessárias para as opções de idioma
[ ] Testar o funcionamento da seleção de idioma e persistência da escolha

### Progresso
Iniciando a implementação...

Implementação em andamento:
[X] Criar um componente LanguageSelector para o menu suspenso
- Criado o componente LanguageSelector.tsx com suporte para seleção entre português, inglês e espanhol
- Adicionado ícone de globo para o menu de idiomas e marcador para o idioma atualmente selecionado

[X] Adicionar funções para manipulação de cookies para salvar a preferência de idioma
- Criado o arquivo language-cookie.ts com funções para salvar, obter e limpar a preferência de idioma
- Implementada função redirectToLanguage para redirecionar o usuário para a versão do site no idioma escolhido

[X] Modificar o Header.tsx para incluir o item de seleção de idioma no menu
- Adicionado o componente LanguageSelector ao menu suspenso do usuário
- Atualizadas as interfaces para incluir as novas traduções necessárias

[X] Atualizar o middleware.ts para verificar o cookie de idioma e priorizar sobre o idioma do navegador
- Modificado o middleware para verificar primeiro se existe um cookie de preferência de idioma
- Mantido o comportamento padrão de detectar o idioma do navegador se o cookie não existir

[X] Implementar traduções necessárias para as opções de idioma
- Adicionadas as traduções para português, inglês e espanhol nos arquivos de dicionário
- Criado o arquivo de dicionário em espanhol (es.json) que não existia anteriormente
- Atualizado o arquivo dictionary.ts para incluir o suporte ao espanhol

[ ] Testar o funcionamento da seleção de idioma e persistência da escolha

Próximos passos:
- Realizar testes para garantir que o cookie está sendo salvo corretamente
- Verificar se o redirecionamento entre idiomas funciona conforme esperado
- Testar o comportamento quando um visitante novo acessa o site pela primeira vez

## Implementação de Aviso de Cookies (Cookie Consent)

### Tarefa
Adicionar um aviso de cookies que atenda aos requisitos das leis da UE, com opções para aceitar ou recusar, totalmente funcional.

### Plano de Execução
[X] Criar componente CookieConsent para exibir o banner de aviso
[X] Implementar funções para manipulação de cookies (salvar, obter e limpar as preferências)
[X] Adicionar traduções para os textos do aviso em português, inglês e espanhol
[X] Integrar o componente no layout principal da aplicação
[X] Implementar a lógica para mostrar/esconder o aviso com base na escolha do usuário
[X] Adicionar estilos consistentes com o design do site
[ ] Testar o funcionamento em diferentes navegadores e dispositivos

### Progresso
Implementação concluída! Foi criado um componente de aviso de cookies que:

1. Aparece na parte inferior da tela após um breve delay para melhorar a experiência do usuário
2. Mostra informações sobre o uso de cookies no site
3. Oferece opções para o usuário aceitar ou recusar os cookies
4. Inclui um link para a política de privacidade
5. Salva a escolha do usuário em um cookie com validade de 6 meses
6. Suporta internacionalização (i18n) em português, inglês e espanhol
7. Tem um design responsivo que se adapta a diferentes tamanhos de tela
8. Inclui animação de entrada para melhorar a experiência do usuário

O componente foi integrado no layout principal da aplicação (RootLayout) para que apareça em todas as páginas do site, mas apenas uma vez até que o usuário faça sua escolha.

As funções utilitárias para manipulação de cookies foram implementadas em um arquivo separado (cookie-consent.ts) para facilitar a manutenção e reutilização. Essas funções permitem salvar, obter e limpar as preferências do usuário.

Próximos passos:
- Testar o funcionamento em diferentes navegadores e dispositivos
- Verificar se o componente está funcionando corretamente em todas as páginas do site
- Analisar se há necessidade de melhorias adicionais no design ou na funcionalidade

## Integração de Cookie Consent com Seleção de Idioma

### Tarefa
Integrar o sistema de consentimento de cookies com a seleção de idioma, para que a preferência de idioma só seja salva e utilizada se o usuário aceitou o uso de cookies.

### Plano de Execução
[X] Atualizar o language-cookie.ts para verificar o consentimento antes de salvar a preferência
[X] Modificar a função redirectToLanguage para salvar a preferência em cookie
[X] Atualizar o middleware.ts para verificar o consentimento antes de usar o cookie de idioma
[X] Garantir que o componente LanguageSelector esteja usando a função atualizada corretamente

### Progresso
Implementação concluída! As seguintes modificações foram feitas:

1. No arquivo `language-cookie.ts`:
   - Adicionada função `canUseCookies()` para verificar se o usuário aceitou cookies
   - Implementada função `saveLanguagePreference()` para salvar a preferência de idioma em cookie, mas apenas se o usuário aceitou cookies
   - Atualizada a função `redirectToLanguage()` para salvar a preferência de idioma antes de redirecionar

2. No arquivo `middleware.ts`:
   - Adicionada verificação do cookie de consentimento antes de usar o cookie de idioma
   - Implementada lógica condicional para usar o cookie de preferência de idioma apenas se o usuário aceitou cookies
   - Mantida a lógica de fallback para o idioma do navegador se não puder usar cookies ou não houver preferência salva

3. Verificado o componente `LanguageSelector.tsx`:
   - Confirmado que já está utilizando a função `redirectToLanguage` corretamente
   - Não foi necessário alterá-lo pois já usará automaticamente a lógica atualizada

A implementação agora respeita totalmente a escolha do usuário quanto ao uso de cookies:
- Se o usuário aceitou cookies, sua preferência de idioma será salva e utilizada em futuros acessos
- Se o usuário recusou cookies, sua preferência de idioma não será salva, e o idioma será detectado pelo navegador a cada acesso
- O redirecionamento para o idioma escolhido funciona em ambos os casos, mas a persistência só ocorre quando permitido

### Próximos Passos
- Testar a implementação para garantir que funciona como esperado
- Verificar o funcionamento em diferentes navegadores e cenários de uso (aceitando/recusando cookies)

# Project Planning

## Tarefa Atual: Atualização do Schema do Contentful para Blog Posts

### Contexto
O schema do Blog Post no Contentful foi atualizado com um novo campo chamado `keywords` que é um array de strings. Este campo deve ser utilizado junto com as tags existentes para melhorar o SEO dos artigos do blog.

### Plano de Implementação
[X] Atualizar o objeto JSON-LD para incluir o novo campo keywords
[X] Corrigir erros de tipagem usando type assertion
[X] Atualizar a documentação no README.md
[X] Adicionar as keywords nas meta tags HTML
[ ] Revisar a implementação para garantir que não há bugs

### Solução Implementada
1. Modificamos o JSON-LD para combinar tanto as tags quanto as keywords específicas em uma única propriedade `keywords` para melhor indexação por motores de busca
2. Utilizamos type assertion (`as any`) para evitar erros de TypeScript, já que o modelo de tipo não foi atualizado para incluir o novo campo
3. Atualizamos a documentação para refletir o novo schema e seu uso no SEO
4. Implementamos as keywords nas meta tags HTML combinando:
   - Categoria do artigo (se existir)
   - Tags do artigo
   - Keywords específicas do Contentful
   - Isso fornece metadados mais ricos para motores de busca

### Lições Aprendidas
1. **Tipagem em TypeScript**: Ao adicionar novos campos no Contentful, é necessário atualizar os tipos correspondentes no TypeScript para evitar erros. No nosso caso, usamos uma solução temporária com `as any`.
2. **SEO com JSON-LD**: É importante aproveitar todos os campos disponíveis no CMS para melhorar o SEO. A combinação de tags e keywords permite uma indexação mais rica.
3. **Documentação de Schema**: Manter o README.md atualizado com o schema atual do Contentful facilita a manutenção e o onboarding de novos desenvolvedores.
4. **SEO com meta tags**: Além do JSON-LD, é importante também utilizar as meta tags HTML padrão para maximizar a compatibilidade com diferentes motores de busca.

### Próximos Passos
1. Atualizar os tipos TypeScript para incluir o campo `keywords` na interface do Blog Post
2. Verificar se o campo `keywords` está sendo corretamente preenchido no Contentful
3. Validar a indexação dos artigos do blog em motores de busca após as alterações
4. Considerar a adição de microformatos adicionais para melhorar ainda mais o SEO