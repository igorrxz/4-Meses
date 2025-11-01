import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

export default function HeroSection() {
  const scrollToTimeline = () => {
    document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1738956952892-7553e0327906?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjb3VwbGUlMjBlbWJyYWNlJTIwcm9tYW50aWMlMjBsb3ZlfGVufDB8MHx8fDE3NjE5NjIxMDd8MA&ixlib=rb-4.1.0&q=85"
          alt="Romantic couple embracing - Micah & Sammie Chaffin on Unsplash"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-baby-blue/40 via-light-blue/30 to-background/90" />
        <div className="absolute inset-0 animate-aurora bg-gradient-to-r from-baby-blue/20 via-light-blue/20 to-accent-blue/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-float">
          <h1 className="heading-xl text-foreground mb-6 drop-shadow-lg">
            Para o Amor da Minha Vida
          </h1>
          <p className="body-lg text-foreground/90 mb-8 max-w-2xl mx-auto">
            Cada momento ao seu lado é uma dádiva. Este site é uma pequena
            demonstração do meu amor infinito por você.
          </p>
          <Button
            onClick={scrollToTimeline}
            size="lg"
            className="glass-card hover:glass-effect text-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Ver Nossa História
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={32} className="text-primary" />
      </div>
    </section>
  );
}