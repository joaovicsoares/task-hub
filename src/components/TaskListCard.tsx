import { TaskList } from "@/types";
import { Trash2 } from "lucide-react";
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
import { useDeleteList } from "@/hooks/useLists";

interface TaskListCardProps {
  list: TaskList;
  onClick: () => void;
}

const TaskListCard = ({ list, onClick }: TaskListCardProps) => {
  const deleteList = useDeleteList();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const confirmDelete = () => {
    deleteList.mutate(String(list.id));
  };

  return (
    <div className="relative w-full">
      <button
        onClick={onClick}
        className="w-full text-left p-5 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-3 h-3 rounded-full bg-primary" />
          
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

        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {list.nome}
        </h3>
      </button>
    </div>
  );
};

export default TaskListCard;
