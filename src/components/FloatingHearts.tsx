import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartType {
  id: number;
  left: number;
  delay: number;
  size: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartType[]>([]);

  useEffect(() => {
    const newHearts: HeartType[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: 16 + Math.random() * 16,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            size={heart.size}
            className="text-love-pink/20 fill-love-pink/10"
          />
        </div>
      ))}
    </div>
  );
}