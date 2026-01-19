import { useState } from "react";
import { TaskList } from "@/types";
import { Trash2, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteList, useUpdateList } from "@/hooks/useLists";

interface TaskListCardProps {
  list: TaskList;
  onClick: () => void;
}

const TaskListCard = ({ list, onClick }: TaskListCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newName, setNewName] = useState(list.nome);
  
  const deleteList = useDeleteList();
  const updateList = useUpdateList();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewName(list.nome);
    setIsEditOpen(true);
  };

  const confirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteList.mutate(String(list.id));
  };

  const confirmEdit = () => {
    if (newName.trim()) {
      updateList.mutate({ id: String(list.id), data: { nome: newName.trim() } });
      setIsEditOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={onClick}
        className="w-full text-left p-5 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-3 h-3 rounded-full bg-primary" />
          
          <div className="flex gap-1">
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100"
              title="Editar lista"
            >
              <Pencil className="w-4 h-4" />
            </button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  onClick={handleDelete}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Excluir lista"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir lista</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir a lista "{list.nome}"? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {list.nome}
        </h3>
      </button>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Editar lista</DialogTitle>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nome da lista"
            onKeyDown={(e) => e.key === 'Enter' && confirmEdit()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmEdit} disabled={!newName.trim() || updateList.isPending}>
              {updateList.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskListCard;
