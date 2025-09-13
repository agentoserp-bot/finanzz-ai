# Finanzz AI

Um aplicativo de controle financeiro pessoal construído com Next.js, Supabase e Tailwind CSS.

## Visão Geral

Finanzz AI é uma aplicação web moderna para gerenciamento de finanças pessoais que permite aos usuários rastrear receitas, despesas e gerar relatórios financeiros. A aplicação utiliza autenticação segura via Supabase e oferece uma interface intuitiva para controle financeiro.

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend/Autenticação**: Supabase
- **Formulários**: React Hook Form, Zod

## Estrutura do Projeto

```
finanzz-ai/
├── public/            # Arquivos estáticos
├── src/
│   ├── app/           # Rotas e páginas da aplicação
│   │   ├── auth/      # Páginas de autenticação
│   │   └── dashboard/ # Dashboard e funcionalidades financeiras
│   ├── components/    # Componentes reutilizáveis
│   │   ├── auth/      # Componentes de autenticação
│   │   └── ui/        # Componentes de interface
│   ├── lib/           # Bibliotecas e utilitários
│   │   └── supabase/  # Configuração do Supabase
│   └── middleware.ts  # Middleware para proteção de rotas
└── .env.local        # Variáveis de ambiente (não versionado)
```

## Funcionalidades

- **Autenticação**: Registro, login e verificação de email
- **Dashboard**: Visão geral das finanças com resumo e transações recentes
- **Transações**: Listagem e adição de novas transações
- **Relatórios**: Visualização de gráficos e análises financeiras

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Conta no Supabase

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/agentoserp-bot/finanzz-ai.git
cd finanzz-ai
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
```

## Estrutura do Banco de Dados

O projeto utiliza o Supabase como backend e banco de dados. As principais tabelas são:

- **users**: Gerenciada pelo Supabase Auth
- **transactions**: Armazena as transações financeiras
- **categories**: Categorias para classificação de transações

## Próximos Passos

- Implementação de categorias personalizadas
- Adição de metas financeiras
- Integração com APIs bancárias
- Implementação de notificações e lembretes

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.