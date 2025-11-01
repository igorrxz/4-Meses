import { useState, useEffect } from 'react';
import { loadImage } from '../utils/imageLoader';

interface ImageWithHeicSupportProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export default function ImageWithHeicSupport({
  src,
  alt,
  className = '',
  onClick,
}: ImageWithHeicSupportProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadImg = async () => {
      try {
        const convertedSrc = await loadImage(src);
        if (isMounted) {
          setImageSrc(convertedSrc);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadImg();

    return () => {
      isMounted = false;
      // Clean up object URLs to prevent memory leaks
      if (imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [src]);

  if (isLoading) {
    return (
      <div className={`${className} bg-muted animate-pulse`} />
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onClick={onClick}
      loading="lazy"
    />
  );
}