// API Configuration
// Change this to your production URL when ready
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth
  signup: '/signup',
  login: '/login',
  
  // Lists
  lists: '/lists',
  listById: (id: string) => `/lists/${id}`,
  
  // Tasks
  tasks: '/tasks',
  taskById: (id: string) => `/tasks/${id}`,
  tasksByList: (listId: string) => `/lists/${listId}/tasks`,
  
  // Share
  shareList: (listId: string) => `/lists/${listId}/share`,
} as const;
