import { useState, useEffect } from 'react';

interface GenerationData {
  count: number;
  lastReset: string;
}

const STORAGE_KEY = 'genegic_generation_limit';
const DAILY_LIMIT = 3;

export const useGenerationLimit = () => {
  const [generationsLeft, setGenerationsLeft] = useState<number>(DAILY_LIMIT);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);

  useEffect(() => {
    checkAndResetLimit();
  }, []);

  const checkAndResetLimit = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();

    if (!stored) {
      // Первый запуск
      const data: GenerationData = {
        count: 0,
        lastReset: today,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setGenerationsLeft(DAILY_LIMIT);
      setIsLimitReached(false);
      return;
    }

    const data: GenerationData = JSON.parse(stored);

    // Проверяем, нужно ли сбросить счетчик (новый день)
    if (data.lastReset !== today) {
      const newData: GenerationData = {
        count: 0,
        lastReset: today,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setGenerationsLeft(DAILY_LIMIT);
      setIsLimitReached(false);
    } else {
      const left = DAILY_LIMIT - data.count;
      setGenerationsLeft(left);
      setIsLimitReached(left <= 0);
    }
  };

  const incrementUsage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const data: GenerationData = JSON.parse(stored);
    const newCount = data.count + 1;
    const newData: GenerationData = {
      ...data,
      count: newCount,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

    const left = DAILY_LIMIT - newCount;
    setGenerationsLeft(left);
    setIsLimitReached(left <= 0);
  };

  const resetLimit = () => {
    const today = new Date().toDateString();
    const data: GenerationData = {
      count: 0,
      lastReset: today,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setGenerationsLeft(DAILY_LIMIT);
    setIsLimitReached(false);
  };

  return {
    generationsLeft,
    isLimitReached,
    incrementUsage,
    resetLimit,
    dailyLimit: DAILY_LIMIT,
  };
};
