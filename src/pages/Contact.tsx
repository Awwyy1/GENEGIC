import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Свяжитесь с нами</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Мы всегда рады помочь. Выберите удобный способ связи.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 rounded-2xl glass border border-border hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">Напишите нам письмо</p>
              <a href="mailto:support@genegic.com" className="text-primary hover:underline">
                support@genegic.com
              </a>
            </div>

            <div className="p-8 rounded-2xl glass border border-border hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Telegram</h3>
              <p className="text-muted-foreground mb-4">Быстрая поддержка в мессенджере</p>
              <a href="https://t.me/genegic_support" className="text-primary hover:underline">
                @genegic_support
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
