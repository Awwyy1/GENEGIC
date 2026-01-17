import { motion } from "framer-motion";
import { Heart, Copy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PromptSite {
  id: number;
  title: string;
  description: string;
  image: string;
  prompt: string;
  likes: number;
  isPremium: boolean;
}

const PROMPT_SITES: PromptSite[] = [
  {
    id: 1,
    title: "Интернет-магазин детских игрушек",
    description: "Современный каталог игрушек с корзиной и фильтрами",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop",
    prompt: "Создай интернет-магазин детских игрушек с каталогом товаров, корзиной покупок и фильтрами по категориям",
    likes: 1243,
    isPremium: false,
  },
  {
    id: 2,
    title: "Лендинг салона красоты",
    description: "Элегантный дизайн для салона с записью онлайн",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    prompt: "Сделай лендинг для салона красоты Estétique с записью онлайн, галереей работ и ценами",
    likes: 849,
    isPremium: true,
  },
  {
    id: 3,
    title: "Портфолио фотографа",
    description: "Минималистичное портфолио с галереей фото",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
    prompt: "Создай портфолио фотографа в стиле минимализм с галереей работ, биографией и контактами",
    likes: 764,
    isPremium: true,
  },
  {
    id: 4,
    title: "Сайт ресторана",
    description: "Стильный сайт с меню и бронированием столиков",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    prompt: "Сделай сайт ресторана с меню, фотографиями блюд и формой бронирования столика",
    likes: 2156,
    isPremium: false,
  },
  {
    id: 5,
    title: "Landing фитнес-клуба",
    description: "Мотивирующий дизайн для фитнес-центра",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    prompt: "Создай лендинг фитнес-клуба с расписанием тренировок, ценами и формой записи",
    likes: 1567,
    isPremium: false,
  },
  {
    id: 6,
    title: "Блог о путешествиях",
    description: "Вдохновляющий блог с картами и статьями",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    prompt: "Сделай блог о путешествиях с картой посещённых мест, статьями и фотогалереей",
    likes: 987,
    isPremium: true,
  },
  {
    id: 7,
    title: "Сайт агентства недвижимости",
    description: "Каталог квартир с фильтрами и поиском",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    prompt: "Создай сайт агентства недвижимости с каталогом квартир, фильтрами и картой объектов",
    likes: 1834,
    isPremium: false,
  },
  {
    id: 8,
    title: "Лендинг онлайн-курса",
    description: "Продающая страница для образовательного курса",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    prompt: "Сделай продающий лендинг для онлайн-курса с программой обучения, отзывами и формой оплаты",
    likes: 2341,
    isPremium: true,
  },
  {
    id: 9,
    title: "Портфолио веб-дизайнера",
    description: "Креативное портфолио с анимациями",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    prompt: "Создай креативное портфолио веб-дизайнера с анимациями, кейсами и контактной формой",
    likes: 1523,
    isPremium: false,
  },
  {
    id: 10,
    title: "Сайт кофейни",
    description: "Уютный дизайн с тёмной темой и меню",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
    prompt: "Сделай сайт кофейни с тёмным дизайном, меню напитков и расположением на карте",
    likes: 3156,
    isPremium: false,
  },
  {
    id: 11,
    title: "Landing веб-студии",
    description: "Профессиональный сайт для IT-компании",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    prompt: "Создай корпоративный сайт веб-студии с услугами, кейсами, командой и формой брифа",
    likes: 1876,
    isPremium: true,
  },
  {
    id: 12,
    title: "Сайт музыкальной группы",
    description: "Креативный дизайн для музыкантов",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
    prompt: "Сделай сайт музыкальной группы с треками, датами концертов и биографией",
    likes: 1092,
    isPremium: false,
  },
];

const Prompts = () => {
  const [likedSites, setLikedSites] = useState<Set<number>>(new Set());

  const handleCopy = (site: PromptSite) => {
    if (site.isPremium) {
      toast.error("Этот промпт доступен только в Premium");
      return;
    }
    navigator.clipboard.writeText(site.prompt);
    toast.success("Промпт скопирован!");
  };

  const handleLike = (siteId: number) => {
    const newLiked = new Set(likedSites);
    if (newLiked.has(siteId)) {
      newLiked.delete(siteId);
    } else {
      newLiked.add(siteId);
    }
    setLikedSites(newLiked);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
            Готовые <span className="gradient-text">промпты</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Вдохновляйтесь примерами и создавайте свои уникальные сайты
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROMPT_SITES.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={site.image}
                  alt={site.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {site.isPremium && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    PREMIUM
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-heading font-bold text-lg mb-2 line-clamp-1">
                  {site.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {site.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(site.id)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${likedSites.has(site.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                    <span>{site.likes + (likedSites.has(site.id) ? 1 : 0)}</span>
                  </button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(site)}
                    className="gap-2"
                  >
                    {site.isPremium ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Закрыто
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Копировать
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Prompts;
