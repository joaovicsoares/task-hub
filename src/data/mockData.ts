import { TaskList } from "@/types";

export const mockTaskLists: TaskList[] = [
  {
    id: "1",
    title: "Trabalho",
    description: "Tarefas do dia a dia no trabalho",
    color: "hsl(173 58% 39%)",
    tasks: [
      { id: "1-1", title: "Revisar relatório mensal", completed: false, listId: "1", createdAt: new Date() },
      { id: "1-2", title: "Reunião com equipe às 14h", completed: true, listId: "1", createdAt: new Date() },
      { id: "1-3", title: "Enviar proposta para cliente", completed: false, listId: "1", createdAt: new Date() },
      { id: "1-4", title: "Atualizar documentação do projeto", completed: false, listId: "1", createdAt: new Date() },
    ],
    createdAt: new Date(),
    sharedWith: [],
  },
  {
    id: "2",
    title: "Pessoal",
    description: "Tarefas pessoais e lembretes",
    color: "hsl(262 83% 58%)",
    tasks: [
      { id: "2-1", title: "Ir ao mercado", completed: true, listId: "2", createdAt: new Date() },
      { id: "2-2", title: "Agendar consulta médica", completed: false, listId: "2", createdAt: new Date() },
      { id: "2-3", title: "Pagar conta de luz", completed: false, listId: "2", createdAt: new Date() },
    ],
    createdAt: new Date(),
    sharedWith: ["maria@email.com"],
  },
  {
    id: "3",
    title: "Estudos",
    description: "Cursos e aprendizado",
    color: "hsl(38 92% 50%)",
    tasks: [
      { id: "3-1", title: "Completar módulo 5 do curso", completed: false, listId: "3", createdAt: new Date() },
      { id: "3-2", title: "Revisar anotações da aula", completed: true, listId: "3", createdAt: new Date() },
    ],
    createdAt: new Date(),
    sharedWith: [],
  },
  {
    id: "4",
    title: "Projetos",
    description: "Projetos paralelos e ideias",
    color: "hsl(340 82% 52%)",
    tasks: [
      { id: "4-1", title: "Criar wireframe do app", completed: true, listId: "4", createdAt: new Date() },
      { id: "4-2", title: "Pesquisar ferramentas de design", completed: true, listId: "4", createdAt: new Date() },
      { id: "4-3", title: "Implementar protótipo inicial", completed: false, listId: "4", createdAt: new Date() },
      { id: "4-4", title: "Testar com usuários", completed: false, listId: "4", createdAt: new Date() },
      { id: "4-5", title: "Iterar com base no feedback", completed: false, listId: "4", createdAt: new Date() },
    ],
    createdAt: new Date(),
    sharedWith: ["joao@email.com", "ana@email.com"],
  },
];
