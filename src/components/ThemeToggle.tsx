import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full bg-secondary border border-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Переключить тему"
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
        animate={{
          left: isDark ? "2px" : "calc(100% - 26px)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-primary-foreground" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-primary-foreground" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
