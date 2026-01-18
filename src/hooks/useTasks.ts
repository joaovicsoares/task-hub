import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksService } from '@/services/tasks';
import { toast } from 'sonner';

// export const useTasks = () => {
//   return useQuery({
//     queryKey: ['tasks'],
//     queryFn: () => tasksService.getAll(),
//   });
// };

export const useTasksByListId = (listId: string) => {
  return useQuery({
    queryKey: ["tasks", listId],
    queryFn: () => tasksService.getByListId(listId),
    enabled: !!listId,
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.create,
    onSuccess: (_, { idLista }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', idLista] });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      toast.success('Tarefa criada!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao criar tarefa');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { titulo?: string; concluida?: boolean } }) =>
      tasksService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao atualizar tarefa');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      toast.success('Tarefa removida!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao remover tarefa');
    },
  });
};
