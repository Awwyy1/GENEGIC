import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, Zap, Crown, Sparkles } from "lucide-react";

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
            Кредиты закончились ✨
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-4">
            Вы использовали все <span className="font-bold text-primary">20 бесплатных кредитов</span>. 
            Пополните баланс для продолжения работы!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Credit info */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Как расходуются кредиты:</span>
            </div>
            <div className="flex justify-center gap-6 text-sm">
              <div>
                <span className="font-bold text-primary">10</span>
                <span className="text-muted-foreground"> = 1 сайт</span>
              </div>
              <div>
                <span className="font-bold text-primary">2</span>
                <span className="text-muted-foreground"> = 1 правка</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-lg font-heading">Профессионал</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                <span><strong>150 кредитов</strong> в месяц (≈10 сайтов)</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Премиум шаблоны и собственный домен</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Приоритетная поддержка</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-4 bg-secondary rounded-lg border border-border">
              <div className="text-2xl font-bold font-heading">990₽</div>
              <div className="text-xs text-muted-foreground">Профессионал</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Coins className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium">150 кредитов</span>
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-primary to-accent rounded-lg text-primary-foreground relative overflow-hidden">
              <div className="absolute top-1 right-1 text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold">Выгодно</div>
              <div className="text-2xl font-bold font-heading">2990₽</div>
              <div className="text-xs opacity-90">Бизнес</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Coins className="w-3 h-3" />
                <span className="text-xs font-medium">500 кредитов</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" size="lg">
            Пополнить кредиты
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Бесплатные кредиты начисляются один раз при регистрации
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
