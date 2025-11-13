import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import ImageWithHeicSupport from '../ImageWithHeicSupport';
import { galleryPhotos } from '../../data/photos';

interface Photo {
  id: number;
  url: string;
  alt: string;
  caption: string;
}

const captions = [
  'Nosso momento especial',
  'Amor verdadeiro',
  'Juntos para sempre',
  'Nosso dia perfeito',
  'Memórias inesquecíveis',
  'Você e eu',
  'Nosso amor',
  'Momentos mágicos',
  'Para sempre',
  'Meu tudo',
  'Nosso sorriso',
  'Felicidade',
  'Amor infinito',
  'Nosso mundo',
  'Você é minha vida',
  'Nosso paraíso',
  'Juntos',
  'Meu amor',
  'Nossa história',
  'Eternamente seus',
];

const photos: Photo[] = galleryPhotos.map((url, index) => ({
  id: index + 1,
  url,
  alt: 'Nossa foto especial',
  caption: captions[index] || 'Nosso momento especial',
}));

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
        <div className="heading-lg text-center mb-4 relative flex justify-center">
          <h2 className="relative z-10">
            <span className="bg-gradient-to-r from-primary via-accent to-love-pink bg-clip-text text-transparent">
              Nossas Fotos
            </span>
          </h2>
          <Sparkles className="absolute -top-2 -right-8 text-primary animate-pulse" size={24} />
          <Sparkles className="absolute -bottom-2 -left-8 text-accent animate-pulse" size={20} style={{ animationDelay: '0.5s' }} />
        </div>
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
                <ImageWithHeicSupport
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

              <ImageWithHeicSupport
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