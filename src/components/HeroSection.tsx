import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate("/generator", { state: { initialPrompt: prompt } });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Новинка
            </span>
            <Link 
              to="/prompts" 
              className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors"
            >
              Готовые шаблоны промптов
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] mb-6 font-heading"
          >
            <span className="gradient-text">Создание сайтов</span>
            <br />
            <span className="text-foreground">с помощью ИИ</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          >
            Опишите свой сайт на русском языке — наш ИИ создаст его за считанные секунды.
          </motion.p>

          {/* Input Field */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto mb-6"
          >
            <div className="flex items-center gap-2 p-2 rounded-full bg-muted/50 border border-border shadow-sm">
              <Sparkles className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Опишите ваш сайт..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground py-2.5 px-2 text-base"
              />
              <Button 
                type="submit" 
                size="lg"
                className="rounded-full px-6 group flex-shrink-0"
                disabled={!prompt.trim()}
              >
                Создать бесплатно
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.form>

          {/* Demo link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link 
              to="/prompts" 
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Посмотреть примеры
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
