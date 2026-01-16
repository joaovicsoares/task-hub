import { useState } from "react";
import { TaskList, Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskItem from "./TaskItem";
import ShareDialog from "./ShareDialog";
import { ArrowLeft, Share2, Plus, Users, Loader2 } from "lucide-react";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { useShareList } from "@/hooks/useLists";

interface TaskListDetailProps {
  list: TaskList;
  onBack: () => void;
}

const TaskListDetail = ({ list, onBack }: TaskListDetailProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);

  const { data: allTasks = [], isLoading } = useTasks();
  const tasks = allTasks.filter((t) => t.listId === list.id);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const shareList = useShareList();

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask.mutate({ id: taskId, data: { completed: !task.completed } });
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    createTask.mutate(
      { title: newTaskTitle.trim(), listId: list.id },
      { onSuccess: () => setNewTaskTitle("") }
    );
  };

  const handleShare = (email: string) => {
    shareList.mutate({ listId: list.id, email });
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
            {completedTasks} de {tasks.length} concluídas
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
              disabled={createTask.isPending}
            />
          </div>
          <Button 
            type="submit" 
            variant="gradient" 
            size="lg"
            disabled={createTask.isPending}
          >
            {createTask.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Adicionar"
            )}
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

        {tasks.length === 0 && (
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
