import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listsService } from '@/services/lists';
import { TaskList } from '@/types';
import { toast } from 'sonner';

export const useLists = () => {
  return useQuery({
    queryKey: ['lists'],
    queryFn: listsService.getAll,
  });
};

export const useList = (id: string) => {
  return useQuery({
    queryKey: ['lists', id],
    queryFn: () => listsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      toast.success('Lista criada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao criar lista');
    },
  });
};

export const useUpdateList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TaskList> }) =>
      listsService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      queryClient.invalidateQueries({ queryKey: ['lists', id] });
      toast.success('Lista atualizada!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao atualizar lista');
    },
  });
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      toast.success('Lista removida!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao remover lista');
    },
  });
};

export const useShareList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, email }: { listId: string; email: string }) =>
      listsService.share(listId, { email }),
    onSuccess: (_, { listId }) => {
      queryClient.invalidateQueries({ queryKey: ['lists', listId] });
      toast.success('Lista compartilhada!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao compartilhar lista');
    },
  });
};
