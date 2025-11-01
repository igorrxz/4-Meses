import { useState } from 'react';
import { Lock, Heart, Sparkles } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function SecretSection() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === 'VI') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-baby-blue/10 to-background min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 animate-aurora bg-gradient-to-r from-baby-blue/10 via-light-blue/10 to-accent-blue/10 opacity-50" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {!isUnlocked ? (
          <div className="glass-card rounded-3xl p-12 shadow-2xl">
            <Lock size={64} className="mx-auto text-primary mb-6 animate-pulse-glow" />
            <h2 className="heading-lg text-foreground mb-4">
              Mensagem Secreta
            </h2>
            <p className="body-lg text-muted-foreground mb-8">
              Qual foi o primeiro apelido carinhoso que eu te chamei?
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a resposta..."
                className={`glass-effect text-center text-lg ${
                  error ? 'border-destructive' : ''
                }`}
              />
              {error && (
                <p className="text-destructive body-md">
                  Ops! Tente novamente...
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold"
              >
                Desbloquear
              </Button>
            </form>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 shadow-2xl animate-float">
            {/* Particle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <Sparkles
                  key={i}
                  size={20}
                  className="absolute text-primary/30 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            <Heart size={80} className="mx-auto text-love-pink mb-8 animate-pulse-glow" />
            
            <h2 className="heading-lg text-primary mb-6">
              Mensagem Especial Para Você
            </h2>
            
            <div className="space-y-6 body-lg text-foreground leading-relaxed">
              <p>
                Minha querida Vi,
              </p>
              <p>
                Desde o primeiro momento em que te chamei assim, sabia que você
                era especial. Você não é apenas minha namorada, você é minha
                melhor amiga, minha parceira eterna, minha inspiração.
              </p>
              <p>
                Cada dia ao seu lado é uma nova aventura, um novo motivo para
                sorrir, uma nova razão para agradecer. Você me faz querer ser
                uma pessoa melhor, me inspira a sonhar mais alto, e me dá forças
                para enfrentar qualquer desafio, me leva pra mais perto de Deus.
              </p>
              <p>
                Esse site é apenas uma pequena demonstração do meu amor por você.
                As palavras nunca serão suficientes para expressar o quanto você
                significa para mim, mas espero que cada detalhe aqui mostre o
                quanto eu me importo e vou dar o meu máximo para te fazer a garota mais feliz do mundo.
              </p>
              <p className="heading-sm text-primary mt-8">
                Eu te amo mais do que tudo neste mundo! 💙
              </p>
              <p className="body-md text-muted-foreground italic">
                Para sempre seu,<br />
                Seu fofinho
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}