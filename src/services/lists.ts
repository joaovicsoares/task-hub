import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { TaskList } from '@/types';

interface CreateListData {
  title: string;
  description?: string;
  color: string;
}

interface UpdateListData {
  title?: string;
  description?: string;
  color?: string;
}

interface ShareListData {
  email: string;
}

export const listsService = {
  async getAll(): Promise<TaskList[]> {
    return apiClient.get<TaskList[]>(API_ENDPOINTS.lists);
  },

  async getById(id: string): Promise<TaskList> {
    return apiClient.get<TaskList>(API_ENDPOINTS.listById(id));
  },

  async create(data: CreateListData): Promise<TaskList> {
    return apiClient.post<TaskList>(API_ENDPOINTS.lists, data);
  },

  async update(id: string, data: UpdateListData): Promise<TaskList> {
    return apiClient.put<TaskList>(API_ENDPOINTS.listById(id), data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.listById(id));
  },

  async share(listId: string, data: ShareListData): Promise<void> {
    return apiClient.post(API_ENDPOINTS.shareList, { listId, ...data });
  },
};
