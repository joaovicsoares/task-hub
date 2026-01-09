import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, UserPlus, X } from "lucide-react";
import { toast } from "sonner";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (email: string) => void;
  sharedWith: string[];
}

const ShareDialog = ({ isOpen, onClose, onShare, sharedWith }: ShareDialogProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (sharedWith.includes(email.trim())) {
      toast.error("Esta pessoa já tem acesso à lista");
      return;
    }

    onShare(email.trim());
    setEmail("");
    toast.success(`Convite enviado para ${email}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Compartilhar Lista
          </DialogTitle>
          <DialogDescription>
            Convide pessoas para colaborar nesta lista de tarefas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="gradient">
              Convidar
            </Button>
          </div>
        </form>

        {sharedWith.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Compartilhado com
            </h4>
            <div className="space-y-2">
              {sharedWith.map((email) => (
                <div
                  key={email}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {email[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{email}</span>
                  </div>
                  <button className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
