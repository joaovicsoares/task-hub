export interface Task {
  id: string;
  title: string;
  completed: boolean;
  listId: string;
  createdAt: Date;
}

export interface TaskList {
  id: number;
  nome: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
