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
          <DialogTitle className="text-2xl font-bold text-center font-heading">
            Дневной лимит исчерпан ✨
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-4">
            Вы создали <span className="font-bold text-primary">3 сайта</span> сегодня. Отличная работа!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-6 h-6 text-cyan-400" />
              <h3 className="font-bold text-lg font-heading">Премиум доступ</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Неограниченные генерации</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Доступ к премиум промптам</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Приоритетная поддержка</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Сохранение истории проектов</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-4 bg-secondary rounded-lg border border-border">
              <div className="text-2xl font-bold font-heading">990₽</div>
              <div className="text-xs text-muted-foreground">Профессионал</div>
              <div className="text-xs mt-1">Безлимитно сайтов</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white relative overflow-hidden">
              <div className="absolute top-1 right-1 text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold">Популярный</div>
              <div className="text-2xl font-bold font-heading">2990₽</div>
              <div className="text-xs opacity-90">Бизнес</div>
              <div className="text-xs mt-1 opacity-90">До 10 участников</div>
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
