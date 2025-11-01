import { useState } from 'react';
import { Home, Plane, Camera, Heart, GraduationCap, Baby, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Dream {
  id: number;
  icon: typeof Home;
  title: string;
  description: string;
  progress: number;
}

export default function DreamsSection() {
  const [dreams, setDreams] = useState<Dream[]>([
    {
      id: 1,
      icon: Home,
      title: 'Nossa Casa dos Sonhos',
      description: 'Construir um lar aconchegante onde possamos criar memórias juntos',
      progress: 30,
    },
    {
      id: 2,
      icon: Plane,
      title: 'Viajar pelo Mundo',
      description: 'Conhecer lugares incríveis e viver aventuras ao redor do mundo',
      progress: 15,
    },
    {
      id: 3,
      icon: Camera,
      title: 'Álbum de Memórias',
      description: 'Documentar cada momento especial da nossa jornada juntos',
      progress: 50,
    },
    {
      id: 4,
      icon: Heart,
      title: 'Renovar Votos',
      description: 'Celebrar nosso amor com uma cerimônia especial',
      progress: 0,
    },
    {
      id: 5,
      icon: GraduationCap,
      title: 'Crescer Juntos',
      description: 'Apoiar os sonhos e objetivos um do outro sempre',
      progress: 60,
    },
    {
      id: 6,
      icon: Baby,
      title: 'Família',
      description: 'Construir uma família linda e cheia de amor',
      progress: 0,
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleProgressClick = (id: number) => {
    const dream = dreams.find((d) => d.id === id);
    if (dream && dream.progress < 100) {
      setDreams(
        dreams.map((d) =>
          d.id === id ? { ...d, progress: Math.min(d.progress + 10, 100) } : d
        )
      );
      
      const updatedDream = dreams.find((d) => d.id === id);
      if (updatedDream && updatedDream.progress + 10 >= 100) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  return (
    <section id="dreams" className="py-20 px-4 bg-gradient-to-b from-background to-baby-blue/10 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-50px',
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <Heart
                size={20}
                className="text-love-pink fill-love-pink"
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h2 className="heading-lg text-center text-foreground mb-4">
          Sonhos Para Realizarmos Juntos
        </h2>
        <p className="body-md text-center text-muted-foreground mb-16">
          Clique nas barras de progresso para atualizar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dreams.map((dream) => {
            const Icon = dream.icon;
            return (
              <Card key={dream.id} className="glass-card border-none hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-full bg-primary/20">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <CardTitle className="heading-sm">{dream.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="body-md text-muted-foreground mb-4">
                    {dream.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="text-primary font-semibold">{dream.progress}%</span>
                    </div>
                    <Progress
                      value={dream.progress}
                      className="cursor-pointer"
                      onClick={() => handleProgressClick(dream.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add Dream Card */}
          <Card
            className="glass-card border-none cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center justify-center min-h-[250px]"
            onClick={() => setShowAddDialog(true)}
          >
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Plus size={48} className="text-primary mb-4" />
              <p className="body-md text-center text-muted-foreground">
                Adicionar Novo Sonho
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Dream Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="heading-md text-primary">
              Adicionar Novo Sonho
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Título do sonho" className="glass-effect" />
            <Input placeholder="Descrição" className="glass-effect" />
            <Button className="w-full bg-primary hover:bg-primary/90">
              Adicionar Sonho
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}