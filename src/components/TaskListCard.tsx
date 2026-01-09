import { TaskList } from "@/types";
import { CheckCircle2, Users } from "lucide-react";

interface TaskListCardProps {
  list: TaskList;
  onClick: () => void;
}

const TaskListCard = ({ list, onClick }: TaskListCardProps) => {
  const completedTasks = list.tasks.filter((t) => t.completed).length;
  const totalTasks = list.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-5 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: list.color }}
        />
        {list.sharedWith.length > 0 && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-xs">{list.sharedWith.length}</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {list.title}
      </h3>
      
      {list.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {list.description}
        </p>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {completedTasks} de {totalTasks} tarefas
            </span>
          </div>
          <span className="font-medium text-foreground">{Math.round(progress)}%</span>
        </div>
        
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: list.color,
            }}
          />
        </div>
      </div>
    </button>
  );
};

export default TaskListCard;
