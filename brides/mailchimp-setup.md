# Guia de Configuração do Mailchimp para o Perfect Wedding

Este guia irá ajudá-lo a configurar corretamente a integração do seu formulário de cadastro com o Mailchimp, mantendo o design atual do site.

## Passo 1: Criar uma Conta no Mailchimp

Se você ainda não tem uma conta no Mailchimp, crie uma em [mailchimp.com](https://mailchimp.com).

## Passo 2: Criar uma Lista de Contatos

1. Faça login na sua conta do Mailchimp
2. Vá para "Audience" (Audiência) > "Audience dashboard" (Painel de audiência)
3. Clique em "Create Audience" (Criar audiência) se você ainda não tiver uma
4. Siga as instruções para configurar sua lista

## Passo 3: Obter as Informações Necessárias

Você precisará das seguintes informações para configurar o formulário:

1. Seu ID de usuário do Mailchimp (encontrado na URL quando você está logado)
2. O ID da sua lista (encontrado em "Audience" > "Settings" > "Audience name and defaults")
3. O número do servidor (geralmente é "us1", "us2", etc., e pode ser visto na URL quando você está logado)

## Passo 4: Configurar o Formulário HTML

Abra o arquivo `index.html` e localize o formulário de cadastro. Você precisará substituir os seguintes valores:

1. Substitua `[SEU-USUARIO]` pelo seu nome de usuário do Mailchimp
2. Substitua `[N]` pelo número do seu servidor (ex: 1, 2, 3, etc.)
3. Substitua `[SEU-ID]` pelo seu ID de usuário do Mailchimp
4. Substitua `[ID-DA-LISTA]` pelo ID da sua lista
5. Substitua `https://seudominio.com/brides/thank-you.html` pela URL real da sua página de agradecimento

Exemplo de como o formulário deve ficar:

```html
<form id="signup-form" class="signup-form" action="https://johndoe.us2.list-manage.com/subscribe/post?u=a1b2c3d4e5f6&amp;id=1a2b3c4d5e" method="post" name="mc-embedded-subscribe-form" target="_blank">
    <!-- Campos do formulário -->
    
    <!-- Campos obrigatórios do Mailchimp -->
    <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="b_a1b2c3d4e5f6_1a2b3c4d5e" tabindex="-1" value="">
    </div>
    
    <!-- URL de redirecionamento após inscrição -->
    <input type="hidden" name="REDIRECT" value="https://perfectwedding.com/brides/thank-you.html">
    
    <button type="submit" class="btn-primary" name="subscribe">Quero Experimentar</button>
</form>
```

## Passo 5: Configurar Campos Personalizados no Mailchimp

Para que o Mailchimp reconheça os campos personalizados do formulário, você precisa criar esses campos na sua lista:

1. Vá para "Audience" > "Settings" > "Audience fields and *|MERGE|* tags"
2. Clique em "Add A Field" (Adicionar um campo) para cada campo personalizado:
   - Adicione um campo para "FNAME" (Nome)
   - Adicione um campo para "PHONE" (Telefone)
   - Adicione um campo para "WDATE" (Data do Casamento)

## Passo 6: Configurar a Página de Agradecimento

1. Faça upload do arquivo `thank-you.html` para o seu servidor
2. Certifique-se de que a URL no campo REDIRECT do formulário aponta para o local correto

## Passo 7: Testar a Integração

1. Acesse seu site
2. Preencha o formulário com dados de teste
3. Envie o formulário
4. Verifique se você é redirecionado para a página de agradecimento
5. Verifique se o contato foi adicionado à sua lista no Mailchimp

## Solução de Problemas

Se o formulário não estiver funcionando corretamente:

1. Verifique se todos os IDs e URLs foram substituídos corretamente
2. Certifique-se de que os campos personalizados foram criados no Mailchimp
3. Verifique o console do navegador para erros JavaScript
4. Teste o formulário em diferentes navegadores

## Recursos Adicionais

- [Documentação do Mailchimp sobre formulários de inscrição](https://mailchimp.com/help/add-a-signup-form-to-your-website/)
- [Guia de campos personalizados do Mailchimp](https://mailchimp.com/help/manage-audience-fields/)
- [Configuração de redirecionamento após inscrição](https://mailchimp.com/help/set-up-custom-thank-you-and-error-messages/) 