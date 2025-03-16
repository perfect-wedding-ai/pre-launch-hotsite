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