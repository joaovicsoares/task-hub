import { useState } from "react";
import { TaskList, Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskItem from "./TaskItem";
import ShareDialog from "./ShareDialog";
import { ArrowLeft, Share2, Plus, Users } from "lucide-react";

interface TaskListDetailProps {
  list: TaskList;
  onBack: () => void;
  onUpdateList: (updatedList: TaskList) => void;
}

const TaskListDetail = ({ list, onBack, onUpdateList }: TaskListDetailProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = list.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onUpdateList({ ...list, tasks: updatedTasks });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `${list.id}-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
      createdAt: new Date(),
    };

    onUpdateList({ ...list, tasks: [...list.tasks, newTask] });
    setNewTaskTitle("");
  };

  const handleShare = (email: string) => {
    if (!list.sharedWith.includes(email)) {
      onUpdateList({ ...list, sharedWith: [...list.sharedWith, email] });
    }
  };

  const completedTasks = list.tasks.filter((t) => t.completed).length;
  const pendingTasks = list.tasks.filter((t) => !t.completed);
  const doneTasks = list.tasks.filter((t) => t.completed);

  return (
    <div className="animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <Button
          variant="outline"
          onClick={() => setIsShareOpen(true)}
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Compartilhar
        </Button>
      </div>

      {/* List Info */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: list.color }}
          />
          <h1 className="text-3xl font-bold text-foreground">{list.title}</h1>
        </div>
        
        {list.description && (
          <p className="text-muted-foreground ml-7">{list.description}</p>
        )}

        <div className="flex items-center gap-4 mt-4 ml-7">
          <span className="text-sm text-muted-foreground">
            {completedTasks} de {list.tasks.length} concluídas
          </span>
          
          {list.sharedWith.length > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Compartilhada com {list.sharedWith.length} pessoa(s)</span>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Adicionar nova tarefa..."
              className="pl-11 h-12 bg-card border-border focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button type="submit" variant="gradient" size="lg">
            Adicionar
          </Button>
        </div>
      </form>

      {/* Tasks Lists */}
      <div className="space-y-6">
        {pendingTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              Pendentes ({pendingTasks.length})
            </h3>
            <div className="space-y-2">
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  listColor={list.color}
                  onToggle={handleToggleTask}
                />
              ))}
            </div>
          </div>
        )}

        {doneTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              Concluídas ({doneTasks.length})
            </h3>
            <div className="space-y-2">
              {doneTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  listColor={list.color}
                  onToggle={handleToggleTask}
                />
              ))}
            </div>
          </div>
        )}

        {list.tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma tarefa ainda. Adicione a primeira!
            </p>
          </div>
        )}
      </div>

      <ShareDialog
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        onShare={handleShare}
        sharedWith={list.sharedWith}
      />
    </div>
  );
};

export default TaskListDetail;
