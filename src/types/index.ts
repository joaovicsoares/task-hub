export interface Task {
  id: string;
  titulo: string;
  concluida: boolean;
  idLista: string;
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
