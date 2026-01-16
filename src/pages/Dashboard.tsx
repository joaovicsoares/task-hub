import { useState } from "react";
import { TaskList } from "@/types";
import { useLists } from "@/hooks/useLists";
import TaskListCard from "@/components/TaskListCard";
import TaskListDetail from "@/components/TaskListDetail";
import CreateListDialog from "@/components/CreateListDialog";
import { Button } from "@/components/ui/button";
import { CheckSquare, Plus, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();
  const { data: lists = [], isLoading, error } = useLists();
  const [selectedList, setSelectedList] = useState<TaskList | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Erro ao carregar listas</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-primary rounded-lg">
                <CheckSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TaskFlow</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{lists.length}</span>
                <span> listas</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedList ? (
          <TaskListDetail
            list={selectedList}
            onBack={() => setSelectedList(null)}
          />
        ) : (
          <div className="animate-fade-in">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Olá! 👋
              </h1>
              <p className="text-muted-foreground">
                Gerencie suas tarefas e mantenha tudo organizado.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Suas Listas
              </h2>
              <Button 
                variant="gradient" 
                className="flex items-center gap-2"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Nova Lista
              </Button>
            </div>

            {/* Lists Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lists.map((list, index) => (
                <div
                  key={list.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TaskListCard
                    list={list}
                    onClick={() => setSelectedList(list)}
                  />
                </div>
              ))}
            </div>

            {lists.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhuma lista ainda
                </h3>
                <p className="text-muted-foreground mb-6">
                  Crie sua primeira lista para começar a organizar suas tarefas.
                </p>
                <Button 
                  variant="gradient"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Lista
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      <CreateListDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
};

export default Dashboard;
