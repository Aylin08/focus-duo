import { useState, useEffect, useCallback } from 'react';

export const usePoints = () => {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const savedPoints = localStorage.getItem('aula_total_points');
    if (savedPoints) {
      setPoints(Number(savedPoints));
    }
  }, []);

  const addPoints = useCallback((amount: number) => {
    setPoints((prev) => {
      const newTotal = prev + amount;
      localStorage.setItem('aula_total_points', newTotal.toString());
      return newTotal;
    });
  }, []);

  const removePoints = useCallback((amount: number) => {
    setPoints((prev) => {
      const newTotal = Math.max(0, prev - amount);
      localStorage.setItem('aula_total_points', newTotal.toString());
      return newTotal;
    });
  }, []);

  return { points, addPoints, removePoints };
};