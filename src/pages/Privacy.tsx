import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Политика конфиденциальности</h1>
          <div className="space-y-6 text-muted-foreground">
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
              пользователей сервиса GENEGIC.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-8">1. Сбор информации</h2>
            <p>
              Мы собираем только необходимую информацию для обеспечения работы сервиса:
              email для регистрации и данные о генерациях сайтов.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-8">2. Использование данных</h2>
            <p>
              Ваши данные используются исключительно для предоставления и улучшения наших услуг.
              Мы не передаём данные третьим лицам без вашего согласия.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-8">3. Защита данных</h2>
            <p>
              Мы применяем современные методы защиты информации и регулярно обновляем системы безопасности.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-8">4. Контакты</h2>
            <p>
              По вопросам конфиденциальности: privacy@genegic.com
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
