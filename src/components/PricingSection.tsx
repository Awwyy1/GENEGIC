import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Стартовый",
    price: "0",
    period: "навсегда",
    description: "Идеально для первых экспериментов",
    features: [
      "1 сайт",
      "Базовые шаблоны",
      "Поддомен .generic.app",
      "SSL-сертификат",
      "Базовая аналитика"
    ],
    cta: "Начать бесплатно",
    popular: false
  },
  {
    name: "Профессионал",
    price: "990",
    period: "/месяц",
    description: "Для серьёзных проектов",
    features: [
      "Неограниченно сайтов",
      "Все премиум-шаблоны",
      "Собственный домен",
      "Приоритетная поддержка",
      "Расширенная аналитика",
      "Интеграции с сервисами",
      "Удаление бейджа"
    ],
    cta: "Выбрать тариф",
    popular: true
  },
  {
    name: "Бизнес",
    price: "2990",
    period: "/месяц",
    description: "Для команд и компаний",
    features: [
      "Всё из Профессионала",
      "До 10 участников",
      "Совместная работа",
      "API-доступ",
      "Белые метки",
      "SLA 99.9%",
      "Персональный менеджер"
    ],
    cta: "Связаться с нами",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative">
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
            Простые и честные <span className="gradient-text">тарифы</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Начните бесплатно, масштабируйтесь когда будете готовы
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular 
                  ? "bg-gradient-to-b from-[hsl(175,80%,50%,0.1)] to-card border-2 border-primary/50" 
                  : "glass"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[hsl(175,80%,50%)] to-[hsl(200,90%,55%)] text-background text-sm font-semibold rounded-full">
                  Популярный
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price === "0" ? "Бесплатно" : `${plan.price}₽`}</span>
                {plan.price !== "0" && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? "hero" : "heroOutline"} 
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
