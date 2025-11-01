import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';

interface Photo {
  id: number;
  url: string;
  alt: string;
  caption: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1606771732954-ca3ea387e6bc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzdW5zZXQlMjBzaWxob3VldHRlJTIwcm9tYW50aWN8ZW58MHwwfHx8b3JhbmdlfDE3NjE5NjIxMDd8MA&ixlib=rb-4.1.0&q=85',
    alt: 'Romantic sunset - Samuel Jerónimo on Unsplash',
    caption: 'Nosso pôr do sol perfeito',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1741217531183-73f9f986f5c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxjb3VwbGUlMjBsYXVnaGluZyUyMGhhcHB5JTIwcG9ydHJhaXR8ZW58MHwxfHx8MTc2MTk2MjEwN3ww&ixlib=rb-4.1.0&q=85',
    alt: 'Couple laughing - Alexander Mass on Unsplash',
    caption: 'Risadas que aquecem o coração',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/flagged/photo-1573428727285-f40715e2ba60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxjb3VwbGUlMjBiZWFjaCUyMG9jZWFuJTIwdmFjYXRpb258ZW58MHwwfHxibHVlfDE3NjE5NjIxMTB8MA&ixlib=rb-4.1.0&q=85',
    alt: 'Beach moment - Nico Castez on Unsplash',
    caption: 'Nosso dia na praia',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1719410876441-48357b53e6fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxjb3VwbGUlMjBkYW5jaW5nJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDB8MXx8fDE3NjE5NjIxMTN8MA&ixlib=rb-4.1.0&q=85',
    alt: 'Dancing together - Raymond Petrik on Unsplash',
    caption: 'Dançando sob as estrelas',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1595913042842-0d0c5f687c78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxjb3VwbGUlMjBjb2ZmZWUlMjBjYWZlJTIwY296eXxlbnwwfDJ8fHwxNzYxOTYyMTEzfDA&ixlib=rb-4.1.0&q=85',
    alt: 'Cozy cafe - Hyeryeong Song on Unsplash',
    caption: 'Nosso café favorito',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1559641612-fc140738811c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8Y291cGxlJTIwaGlraW5nJTIwbmF0dXJlJTIwb3V0ZG9vcnxlbnwwfDB8fGdyZWVufDE3NjE5NjIxMTR8MA&ixlib=rb-4.1.0&q=85',
    alt: 'Nature adventure - Art of Hoping on Unsplash',
    caption: 'Aventuras na natureza',
  },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-light-blue/10 to-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-lg text-center text-foreground mb-4">
          Nossas Fotos
        </h2>
        <p className="body-md text-center text-muted-foreground mb-16">
          Momentos especiais que guardamos no coração
        </p>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setSelectedPhoto(index)}
            >
              <div className="relative overflow-hidden rounded-2xl glass-card">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="body-md text-white">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add Photo Card */}
          <div className="break-inside-avoid">
            <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 min-h-[300px]">
              <Plus size={48} className="text-primary mb-4" />
              <p className="body-md text-center text-muted-foreground">
                Adicionar Nova Foto
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl bg-black/95 border-none p-0">
          {selectedPhoto !== null && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={24} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={handlePrevious}
              >
                <ChevronLeft size={32} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={handleNext}
              >
                <ChevronRight size={32} />
              </Button>

              <img
                src={photos[selectedPhoto].url}
                alt={photos[selectedPhoto].alt}
                className="w-full h-auto max-h-[90vh] object-contain"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="body-lg text-white text-center">
                  {photos[selectedPhoto].caption}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}