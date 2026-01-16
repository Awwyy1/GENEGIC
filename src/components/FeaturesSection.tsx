import { motion } from "framer-motion";
import { 
  Wand2, 
  Palette, 
  Globe, 
  Zap, 
  Shield, 
  Smartphone 
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "ИИ-генерация",
    description: "Опишите что хотите — ИИ создаст дизайн и код автоматически"
  },
  {
    icon: Palette,
    title: "Современный дизайн",
    description: "Профессиональные шаблоны и стили прямо из коробки"
  },
  {
    icon: Globe,
    title: "Мгновенная публикация",
    description: "Опубликуйте сайт одним кликом на собственном домене"
  },
  {
    icon: Zap,
    title: "Высокая скорость",
    description: "Оптимизированный код для максимальной производительности"
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "SSL-сертификаты и защита данных включены бесплатно"
  },
  {
    icon: Smartphone,
    title: "Адаптивность",
    description: "Идеальное отображение на любых устройствах"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(175,80%,50%,0.02)] to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Всё, что нужно для{" "}
            <span className="gradient-text">идеального сайта</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Мощные инструменты, простой интерфейс. Создавайте профессиональные сайты без технических знаний.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl glass hover:bg-[hsl(220,20%,12%,0.6)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(175,80%,50%,0.2)] to-[hsl(200,90%,55%,0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
