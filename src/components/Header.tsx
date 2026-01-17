import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(175,80%,50%)] to-[hsl(200,90%,55%)] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl font-bold text-foreground font-heading">GENEGIC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/prompts" className="text-muted-foreground hover:text-foreground transition-colors">
            Промпты
          </Link>
          <a href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Возможности
          </a>
          <a href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            Как это работает
          </a>
          <a href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Тарифы
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Войти
          </Button>
          <Button variant="hero" size="sm">
            Начать бесплатно
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
