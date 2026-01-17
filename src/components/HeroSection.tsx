import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles } from "lucide-react";

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // Navigate to generator with the prompt
      navigate("/generator", { state: { initialPrompt: prompt } });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow effects */}
      <div className="hero-glow top-1/4 left-1/4 animate-pulse-glow" />
      <div className="hero-glow bottom-1/4 right-1/4 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(175, 80%, 50%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(175, 80%, 50%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Создавайте сайты с помощью ИИ
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-heading"
          >
            Превращайте идеи в{" "}
            <span className="gradient-text">готовые сайты</span>
            <br />за считанные минуты
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Опишите свой сайт на русском языке — наш ИИ создаст его за вас. 
            Никакого кода, никаких сложных настроек. Просто магия.
          </motion.p>

          {/* Input Field */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(175,80%,50%)] to-[hsl(200,90%,55%)] rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-all duration-500" />
              <div className="relative flex items-center gap-2 p-2 rounded-xl glass border border-[hsl(175,80%,50%,0.2)] group-hover:border-[hsl(175,80%,50%,0.4)] transition-colors">
                <Sparkles className="w-5 h-5 text-primary ml-4 flex-shrink-0" />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Опишите сайт, который хотите создать..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground py-3 px-2 text-base"
                />
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg"
                  className="group/btn flex-shrink-0"
                  disabled={!prompt.trim()}
                >
                  Создать
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Example prompts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            <span className="text-sm text-muted-foreground">Попробуйте:</span>
            {[
              "Лендинг для стартапа",
              "Интернет-магазин",
              "Портфолио дизайнера"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="text-sm px-3 py-1.5 rounded-full glass text-muted-foreground hover:text-foreground hover:bg-[hsl(175,80%,50%,0.1)] transition-all"
              >
                {example}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-border"
          >
            {[
              { value: "50K+", label: "Созданных сайтов" },
              { value: "10K+", label: "Активных пользователей" },
              { value: "99.9%", label: "Время работы" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text font-heading">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
