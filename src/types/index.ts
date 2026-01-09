export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskList {
  id: string;
  title: string;
  description?: string;
  color: string;
  tasks: Task[];
  createdAt: Date;
  sharedWith: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}
