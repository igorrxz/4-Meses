import { useState, useEffect } from 'react';

const quotes = [
  "Você é a razão do meu sorriso",
  "Cada momento com você é especial",
  "Meu amor por você cresce a cada dia",
  "Você faz meu mundo mais bonito",
  "Juntos somos mais fortes",
  "Você é meu para sempre",
];

export default function RotatingQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-40 max-w-xs hidden md:block">
      <div
        className={`glass-card rounded-2xl p-4 shadow-lg transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="body-md text-primary italic text-center">
          "{quotes[currentQuote]}"
        </p>
      </div>
    </div>
  );
}