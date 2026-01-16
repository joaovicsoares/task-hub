// API Configuration
// Change this to your production URL when ready
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5038';

export const API_ENDPOINTS = {
  // Auth
  signup: '/api/auth/signup',
  login: '/api/auth/login',
  
  // Lists
  lists: '/api/list',
  listById: (id: string) => `/api/list/${id}`,
  
  // Tasks
  tasks: '/api/task',
  taskById: (id: string) => `/api/task/${id}`,
  tasksByList: (listId: string) => `/lists/${listId}/tasks`,
  
  // Share
  shareList: (listId: string) => `/lists/${listId}/share`,
} as const;
