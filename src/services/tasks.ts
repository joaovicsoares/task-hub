import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { Task } from '@/types';

interface CreateTaskData {
  title: string;
  listId: string;
}

interface UpdateTaskData {
  title?: string;
  completed?: boolean;
}

export const tasksService = {
  async getByListId(listId: string): Promise<Task[]> {
    return apiClient.get<Task[]>(API_ENDPOINTS.taskByListId(listId));
  },

  async create(data: CreateTaskData): Promise<Task> {
    return apiClient.post<Task>(API_ENDPOINTS.tasks, data);
  },

  async update(id: string, data: UpdateTaskData): Promise<Task> {
    return apiClient.put<Task>(API_ENDPOINTS.taskById(id), data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.taskById(id));
  },
};
