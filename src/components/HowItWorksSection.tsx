import { motion } from "framer-motion";
import { MessageSquare, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Опишите идею",
    description: "Расскажите ИИ, какой сайт вам нужен. Используйте простой русский язык — система поймёт вас."
  },
  {
    icon: Cpu,
    step: "02",
    title: "ИИ создаёт сайт",
    description: "Наш ИИ генерирует дизайн, структуру и код сайта за считанные секунды."
  },
  {
    icon: Rocket,
    step: "03",
    title: "Публикуйте",
    description: "Настройте детали, подключите домен и запустите сайт в интернет одним кликом."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Как это <span className="gradient-text">работает</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Три простых шага от идеи до готового сайта
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="text-center p-8">
                <div className="relative inline-block mb-6">
                  {/* Step number */}
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-primary bg-card px-2 py-1 rounded-full border border-primary/30">
                    {item.step}
                  </span>
                  {/* Icon container */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(175,80%,50%,0.15)] to-[hsl(200,90%,55%,0.05)] border border-primary/20 flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
