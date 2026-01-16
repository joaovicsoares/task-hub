import { TaskList } from "@/types";

interface TaskListCardProps {
  list: TaskList;
  onClick: () => void;
}

const TaskListCard = ({ list, onClick }: TaskListCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-5 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-3 h-3 rounded-full bg-primary"
        />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {list.nome}
      </h3>
    </button>
  );
};

export default TaskListCard;
