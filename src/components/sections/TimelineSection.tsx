import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import ImageWithHeicSupport from '../ImageWithHeicSupport';
import { timelinePhotos } from '../../data/photos';

interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  fullStory: string;
  image: string;
  imageAlt: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    date: '01 de Maio, 2025',
    title: 'Nosso Primeiro Encontro',
    description: 'O dia em que tudo começou...',
    fullStory: 'Foi neste dia mágico que nossos olhares se cruzaram pela primeira vez. Desde então, cada momento ao seu lado tem sido uma aventura incrível. Você iluminou minha vida de uma forma que eu nunca imaginei ser possível.',
    image: timelinePhotos[0],
    imageAlt: 'Nossa foto especial',
  },
  {
    id: 2,
    date: '06 de Junho, 2025',
    title: 'Nosso Primeiro Jantar',
    description: 'Jantamos e olhamos a cidade juntinhos pela primeira vez...',
    fullStory: 'Lembro-me de cada detalhe daquele dia. Suas mãos nas minhas, o sorriso no seu rosto, a sua pupila dilatada, e principalmente o nervosismo pra ter aquela conversa kakaak... E a certeza de que queria passar todos os meus dias ao seu lado, só aumentava.',
    image: timelinePhotos[1],
    imageAlt: 'Nossa foto especial',
  },
  {
    id: 3,
    date: '12 de Junho, 2025',
    title: 'Nos assumimos publicamente',
    description: 'Mesmo sem pedido...',
    fullStory: 'Que sorte a minha de ter encontrado uma garota tão emocionada quanto eu KKKKKKKKK. Como pode ela ter aceitado assumir nosso quase namoro assim...',
    image: timelinePhotos[5],
    imageAlt: 'Nossa foto especial',
  },
  {
    id: 4,
    date: '22 de Junho, 2025',
    title: 'Nosso Amor Cresce, já começam a nos tratar como casal',
    description: 'Cada dia mais apaixonado...',
    fullStory: 'Quem diria, em tão pouco tempo, e já eramos o casal do ano KKKKKKKKKK EU TE AMO GAROTA, Você é minha inspiração, minha alegria, meu tudo. Obrigado por fazer parte da minha vida e por me fazer a pessoa mais feliz do mundo.',
    image: timelinePhotos[3],
    imageAlt: 'Nossa foto especial',
  },
  {
    id: 5,
    date: '13 de Julho, 2025',
    title: 'Enfim, o Pedido',
    description: 'Serei eternamente grato pela forma que foi...',
    fullStory: 'Parece que foi ontem, morrendo de ansiedade pra fazer o pedido, entregar a aliança que foi uma luta pra convencer tua mãe, com vergonha por ser na frente do meu irmão... mas foi maravilhoso e único.',
    image: timelinePhotos[4],
    imageAlt: 'Nossa foto especial',
  },
];

export default function TimelineSection() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  return (
    <section id="timeline" className="py-20 px-4 bg-gradient-to-b from-baby-blue/10 to-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="heading-lg text-center text-foreground mb-16">
          Nossa História
        </h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/50" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary border-4 border-background shadow-lg animate-pulse-glow" />

                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div
                    className="glass-card rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 group"
                    onClick={() => setSelectedMilestone(milestone)}
                  >
                    <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                      <Calendar size={14} className="mr-1" />
                      {milestone.date}
                    </Badge>
                    
                    <ImageWithHeicSupport
                      src={milestone.image}
                      alt={milestone.imageAlt}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    
                    <h3 className="heading-sm text-foreground mb-2 group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="body-md text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
        <DialogContent className="glass-card max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-md text-primary">
              {selectedMilestone?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedMilestone && (
            <div className="space-y-4">
              <ImageWithHeicSupport
                src={selectedMilestone.image}
                alt={selectedMilestone.imageAlt}
                className="w-full h-64 object-cover rounded-xl"
              />
              <Badge className="bg-primary/20 text-primary border-primary/30">
                <Calendar size={14} className="mr-1" />
                {selectedMilestone.date}
              </Badge>
              <p className="body-lg text-foreground leading-relaxed">
                {selectedMilestone.fullStory}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}