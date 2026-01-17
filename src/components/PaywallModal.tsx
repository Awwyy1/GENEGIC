import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Crown } from "lucide-react";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaywallModal = ({ open, onOpenChange }: PaywallModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Лимит генераций исчерпан 🚀
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-4">
            Вы использовали все <span className="font-bold text-primary">3 бесплатные генерации</span> на сегодня
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-6 h-6 text-cyan-400" />
              <h3 className="font-bold text-lg">Получите безлимит</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Безлимитные генерации сайтов</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Приоритетная обработка</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Эксклюзивные шаблоны</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-2xl font-bold">$9</div>
              <div className="text-xs text-muted-foreground">Basic</div>
              <div className="text-xs mt-1">50 сайтов/мес</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white">
              <div className="text-2xl font-bold">$29</div>
              <div className="text-xs opacity-90">Pro</div>
              <div className="text-xs mt-1 opacity-90">∞ безлимит</div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700" size="lg">
            Скоро...
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Или вернитесь завтра для новых 3 бесплатных генераций
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
