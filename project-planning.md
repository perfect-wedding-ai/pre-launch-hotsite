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