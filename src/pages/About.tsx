import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">О нас</h1>
          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-4">
              GENEGIC — это инновационная платформа для создания сайтов с помощью искусственного интеллекта.
            </p>
            <p className="text-muted-foreground mb-4">
              Наша миссия — сделать веб-разработку доступной каждому. Мы верим, что создание сайта должно быть простым,
              быстрым и не требовать знаний программирования.
            </p>
            <h2 className="text-2xl font-bold font-heading mt-8 mb-4">Наша команда</h2>
            <p className="text-muted-foreground">
              Мы — команда энтузиастов из России, объединённых любовью к технологиям и желанием помочь людям
              воплощать свои идеи в жизнь.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
