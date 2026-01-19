import { Task } from "@/types";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeleteTask } from "@/hooks/useTasks";
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

interface TaskItemProps {
  task: Task;
  listColor?: string;
  onToggle: (taskId: string) => void;
}

const TaskItem = ({ task, listColor = "hsl(var(--primary))", onToggle }: TaskItemProps) => {
  const deleteTask = useDeleteTask();

  const confirmDelete = () => {
    deleteTask.mutate(String(task.id));
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg transition-all duration-200 group",
        task.concluida ? "bg-muted/50" : "bg-card hover:bg-secondary"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          task.concluida
            ? "border-transparent"
            : "border-muted-foreground/40 hover:border-primary group-hover:scale-110"
        )}
        style={{
          backgroundColor: task.concluida ? listColor : "transparent",
        }}
      >
        {task.concluida && (
          <Check className="w-3 h-3 text-primary-foreground animate-check-bounce" />
        )}
      </button>
      
      <span
        className={cn(
          "flex-1 transition-all duration-200",
          task.concluida
            ? "text-muted-foreground line-through"
            : "text-foreground"
        )}
      >
        {task.titulo}
      </span>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
            title="Excluir tarefa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir tarefa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
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
  );
};

export default TaskItem;
