import { useCallback } from 'react';

export const useSpeech = () => {
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('El navegador no soporta sintetización de voz.');
      return;
    }

    // Cancelar cualquier audio en reproducción previa
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Configurar en español
    utterance.rate = 0.9; // Velocidad pausada para comprensión sencilla

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
};