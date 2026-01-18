import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Coins } from "lucide-react";

const plans = [
  {
    name: "Стартовый",
    price: "0",
    period: "навсегда",
    credits: "20 кредитов",
    creditsHint: "≈ 1 сайт + 5 правок",
    description: "Попробуйте возможности генератора бесплатно",
    features: [
      "20 кредитов бесплатно",
      "1 генерация = 10 кредитов",
      "1 правка = 2 кредита",
      "Базовые шаблоны",
      "Поддомен .genegic.app",
      "SSL-сертификат"
    ],
    cta: "Начать бесплатно",
    popular: false
  },
  {
    name: "Профессионал",
    price: "990",
    period: "/месяц",
    credits: "150 кредитов",
    creditsHint: "≈ 10 сайтов или 75 правок",
    description: "Для фрилансеров и небольших проектов",
    features: [
      "150 кредитов в месяц",
      "Перенос неиспользованных кредитов",
      "Все премиум-шаблоны",
      "Собственный домен",
      "Приоритетная поддержка",
      "Расширенная аналитика",
      "Удаление бейджа GENEGIC"
    ],
    cta: "Выбрать тариф",
    popular: true
  },
  {
    name: "Бизнес",
    price: "2990",
    period: "/месяц",
    credits: "500 кредитов",
    creditsHint: "≈ 35 сайтов или 250 правок",
    description: "Для агентств и команд",
    features: [
      "500 кредитов в месяц",
      "До 10 участников команды",
      "Общий баланс кредитов",
      "Совместная работа над проектами",
      "API-доступ",
      "Белые метки (White Label)",
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
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
            Платите только за то, что используете. 1 генерация = 10 кредитов, 1 правка = 2 кредита
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
                  ? "bg-gradient-to-b from-primary/10 to-card border-2 border-primary/50" 
                  : "glass"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold rounded-full">
                  Популярный
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price === "0" ? "Бесплатно" : `${plan.price}₽`}</span>
                {plan.price !== "0" && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>

              {/* Credits highlight */}
              <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">{plan.credits}</span>
                </div>
                <span className="text-xs text-muted-foreground">{plan.creditsHint}</span>
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
                variant={plan.popular ? "default" : "outline"} 
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
