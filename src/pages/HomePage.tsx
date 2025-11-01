import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/sections/HeroSection';
import CounterSection from '../components/sections/CounterSection';
import TimelineSection from '../components/sections/TimelineSection';
import LoveReasonsSection from '../components/sections/LoveReasonsSection';
import GallerySection from '../components/sections/GallerySection';
import DreamsSection from '../components/sections/DreamsSection';
import SecretSection from '../components/sections/SecretSection';
import MusicPlayer from '../components/MusicPlayer';
import FloatingHearts from '../components/FloatingHearts';
import RotatingQuotes from '../components/RotatingQuotes';

export default function HomePage() {
  const [showFloatingElements, setShowFloatingElements] = useState(false);

  useEffect(() => {
    setShowFloatingElements(true);
  }, []);

  return (
    <div className="smooth-scroll">
      <Navigation />
      {showFloatingElements && <FloatingHearts />}
      {showFloatingElements && <MusicPlayer />}
      {showFloatingElements && <RotatingQuotes />}
      
      <HeroSection />
      <CounterSection />
      <TimelineSection />
      <LoveReasonsSection />
      <GallerySection />
      <DreamsSection />
      <SecretSection />
    </div>
  );
}