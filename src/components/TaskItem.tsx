import { Task } from "@/types";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  listColor: string;
  onToggle: (taskId: string) => void;
}

const TaskItem = ({ task, listColor, onToggle }: TaskItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg transition-all duration-200 group",
        task.completed ? "bg-muted/50" : "bg-card hover:bg-secondary"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          task.completed
            ? "border-transparent"
            : "border-muted-foreground/40 hover:border-primary group-hover:scale-110"
        )}
        style={{
          backgroundColor: task.completed ? listColor : "transparent",
        }}
      >
        {task.completed && (
          <Check className="w-3 h-3 text-primary-foreground animate-check-bounce" />
        )}
      </button>
      
      <span
        className={cn(
          "flex-1 transition-all duration-200",
          task.completed
            ? "text-muted-foreground line-through"
            : "text-foreground"
        )}
      >
        {task.title}
      </span>
    </div>
  );
};

export default TaskItem;
