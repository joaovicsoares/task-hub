# TaskFlow - Gerenciador de Tarefas

Uma aplicação web moderna para gerenciamento de tarefas e listas, construída com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Query** - Gerenciamento de estado do servidor
- **React Router** - Roteamento SPA
- **shadcn/ui** - Componentes de UI
- **Sonner** - Notificações toast

## 📋 Funcionalidades

### Autenticação
- ✅ Login com email e senha
- ✅ Cadastro de novos usuários
- ✅ Logout
- ✅ Persistência de sessão via JWT

### Listas de Tarefas
- ✅ Criar novas listas com nome e cor personalizada
- ✅ Visualizar todas as listas do usuário
- ✅ Editar nome da lista
- ✅ Excluir lista (com confirmação)
- ✅ Compartilhar lista com outros usuários por email

### Tarefas
- ✅ Criar novas tarefas dentro de uma lista
- ✅ Marcar tarefa como concluída/pendente
- ✅ Excluir tarefa (com confirmação)
- ✅ Visualizar progresso de conclusão por lista

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes shadcn/ui
│   ├── TaskItem.tsx    # Item de tarefa individual
│   ├── TaskListCard.tsx # Card de lista na dashboard
│   ├── TaskListDetail.tsx # Detalhes da lista
│   ├── ShareDialog.tsx # Modal de compartilhamento
│   └── CreateListDialog.tsx # Modal de criação de lista
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── hooks/              # Hooks customizados
│   ├── useLists.ts     # Operações CRUD de listas
│   └── useTasks.ts     # Operações CRUD de tarefas
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   ├── Login.tsx       # Página de login
│   ├── Signup.tsx      # Página de cadastro
│   └── Dashboard.tsx   # Dashboard principal
├── services/           # Serviços de API
│   ├── api.ts          # Cliente HTTP base
│   ├── auth.ts         # Serviço de autenticação
│   ├── lists.ts        # Serviço de listas
│   └── tasks.ts        # Serviço de tarefas
├── config/             # Configurações
│   └── api.ts          # Endpoints da API
└── types/              # Definições de tipos
    └── index.ts        # Tipos TypeScript
```

## 🔌 API Endpoints

A aplicação se comunica com um backend através dos seguintes endpoints:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/login` | Autenticação de usuário |
| POST | `/api/user` | Cadastro de usuário |
| GET | `/api/list` | Listar todas as listas |
| GET | `/api/list/:id` | Obter lista específica |
| POST | `/api/list` | Criar nova lista |
| PUT | `/api/list/:id` | Atualizar lista |
| DELETE | `/api/list/:id` | Excluir lista |
| GET | `/api/task/:listId` | Listar tarefas de uma lista |
| POST | `/api/task` | Criar nova tarefa |
| PUT | `/api/task/:id` | Atualizar tarefa |
| DELETE | `/api/task/:id` | Excluir tarefa |
| POST | `/api/ShareList` | Compartilhar lista |

## ⚙️ Configuração

### Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3000
```

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📝 TODO - Funcionalidades Futuras

### Alta Prioridade
- [ ] Editar título de tarefas existentes
- [ ] Adicionar descrição às tarefas
- [ ] Definir data de vencimento para tarefas
- [ ] Ordenar tarefas por data/prioridade

### Média Prioridade
- [ ] Adicionar níveis de prioridade às tarefas (alta, média, baixa)
- [ ] Filtrar tarefas por status (concluídas/pendentes)
- [ ] Buscar tarefas por título
- [ ] Arrastar e soltar para reordenar tarefas
- [ ] Listar usuários com quem a lista foi compartilhada
- [ ] Remover compartilhamento de lista

### Baixa Prioridade
- [ ] Modo escuro
- [ ] Subtarefas (checklists dentro de tarefas)
- [ ] Etiquetas/tags para tarefas
- [ ] Notificações de tarefas próximas do vencimento
- [ ] Exportar lista para PDF/CSV
- [ ] Histórico de atividades
- [ ] Comentários em tarefas
- [ ] Anexar arquivos às tarefas

### Melhorias Técnicas
- [ ] Testes unitários com Vitest
- [ ] Testes E2E com Playwright
- [ ] PWA (Progressive Web App)
- [ ] Sincronização offline
- [ ] Internacionalização (i18n)

## 📄 Licença

Este projeto está sob a licença MIT.
