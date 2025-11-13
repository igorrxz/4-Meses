import { useState } from 'react';
import { Heart, Sparkles, Star, Smile, Sun, Moon, Coffee, Music, Camera, Flame } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface Reason {
  id: number;
  icon: typeof Heart;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    id: 1,
    icon: Heart,
    title: 'Seu Sorriso',
    description: 'Seu sorriso ilumina meu dia e aquece meu coração de uma forma indescritível.',
  },
  {
    id: 2,
    icon: Sparkles,
    title: 'Sua Bondade',
    description: 'A forma como você trata as pessoas com gentileza e amor me inspira todos os dias.',
  },
  {
    id: 3,
    icon: Star,
    title: 'Seus Sonhos',
    description: 'Admiro seus sonhos e quero estar ao seu lado para realizá-los juntos.',
  },
  {
    id: 4,
    icon: Smile,
    title: 'Seu Jeito Único',
    description: 'Cada pequeno detalhe seu me faz te amar ainda mais. Você é perfeita do seu jeito.',
  },
  {
    id: 5,
    icon: Sun,
    title: 'Seu Cuidado',
    description: 'Admiro profundamente o cuidado que você dedica às outras pessoas, e principalmente comigo. Sua compaixão é verdadeira.',
  },
  {
    id: 6,
    icon: Moon,
    title: 'Nossos Momentos',
    description: 'Cada momento ao seu lado, seja de dia ou de noite, é precioso para mim.',
  },
  {
    id: 7,
    icon: Coffee,
    title: 'Nossas Conversas',
    description: 'Adoro nossas conversas, desde as mais profundas até as mais bobas e divertidas.',
  },
  {
    id: 8,
    icon: Music,
    title: 'Sua Voz',
    description: 'Sua voz é a música mais bonita que já ouvi. Poderia escutá-la para sempre.',
  },
  {
    id: 9,
    icon: Camera,
    title: 'Nossas Memórias',
    description: 'Cada memória que criamos juntos é um tesouro que guardo no coração.',
  },
];

export default function LoveReasonsSection() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);

  const toggleCard = (id: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);
  };

  return (
    <section id="love-reasons" className="py-20 px-4 bg-gradient-to-b from-background to-light-blue/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="heading-lg text-center text-foreground mb-4">
          10 Motivos Pelos Quais Eu Te Amo
        </h2>
        <p className="body-md text-center text-muted-foreground mb-16">
          Clique nos cards para revelar cada motivo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            const isFlipped = flippedCards.has(reason.id);

            return (
              <div
                key={reason.id}
                className="relative h-64 cursor-pointer perspective-1000"
                onClick={() => toggleCard(reason.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 glass-card rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Icon size={48} className="text-primary mb-4" />
                    <h3 className="heading-sm text-center text-foreground">
                      {reason.title}
                    </h3>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 glass-card rounded-2xl p-6 flex items-center justify-center backface-hidden bg-primary/10"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <p className="body-md text-center text-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Button */}
        <div className="text-center">
          <button
            onClick={() => setShowSpecialMessage(true)}
            className="glass-card hover:glass-effect px-8 py-4 rounded-full heading-sm text-primary hover:scale-105 transition-all duration-300 shadow-xl animate-pulse-glow"
          >
            O Maior Motivo de Todos... 💝
          </button>
        </div>
      </div>

      {/* Special Message Dialog */}
      <Dialog open={showSpecialMessage} onOpenChange={setShowSpecialMessage}>
        <DialogContent className="glass-card max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-md text-center text-primary">
              O Maior Motivo de Todos
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-center py-8">
            <Flame size={64} className="mx-auto text-primary animate-pulse-glow" strokeWidth={3} />
            <p className="body-lg text-foreground leading-relaxed">
              O maior motivo pelo qual eu te amo é porque você carrega em si o brilho 
              do Espírito Santo. Sua fé, sua luz e sua bondade refletem a graça divina 
              que habita em você. Você é um presente de Deus na minha vida, e cada dia 
              ao seu lado me aproxima mais Dele. Sua presença ilumina meu caminho e me 
              inspira a ser uma pessoa melhor aos olhos do Senhor.
            </p>
            <p className="heading-sm text-primary">
              Eu te amo mais do que palavras podem expressar!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}