import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Условия использования</h1>
          <div className="space-y-6 text-muted-foreground">
            <p>
              Используя сервис GENEGIC, вы соглашаетесь с настоящими условиями.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-8">1. Использование сервиса</h2>
            <p>
              Сервис предоставляется "как есть". Мы предоставляем 3 бесплатные генерации в день.
              Для получения безлимитного доступа необходимо оформить подписку.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-8">2. Права на контент</h2>
            <p>
              Все сгенерированные сайты принадлежат вам. Вы можете свободно использовать их в коммерческих целях.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-8">3. Ограничения</h2>
            <p>
              Запрещается использовать сервис для создания вредоносного или незаконного контента.
              Мы оставляем за собой право заблокировать доступ при нарушении правил.
            </p>

            <h2 className="text-2xl font-bold font-heading text-foreground mt-8">4. Изменения условий</h2>
            <p>
              Мы можем изменять условия использования. Актуальная версия всегда доступна на этой странице.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
