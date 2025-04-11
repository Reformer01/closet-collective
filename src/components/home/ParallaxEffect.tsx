
import React, { useEffect, useState, useRef } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  delay?: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  threshold?: number;
  scale?: number;
  rotateOnScroll?: boolean;
  rotateAmount?: number;
  opacityEffect?: boolean;
  blurEffect?: boolean;
}

const ParallaxEffect: React.FC<ParallaxProps> = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  delay = 0,
  easing = 'ease-out',
  threshold = 0.3,
  scale = 1,
  rotateOnScroll = false,
  rotateAmount = 5,
  opacityEffect = false,
  blurEffect = false
}) => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold }
    );
    
    observer.observe(element);
    
    const handleScroll = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if element is in view
      const isInView = rect.top < windowHeight && rect.bottom > 0;
      
      if (isInView) {
        // Calculate how far the element is from the center of the viewport
        const distanceFromCenter = (rect.top + rect.height / 2) - (windowHeight / 2);
        // Normalize to a value between -1 and 1
        const normalizedDistance = distanceFromCenter / (windowHeight / 2);
        
        setOffset(normalizedDistance * speed * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [speed, delay, threshold]);

  const getTransform = () => {
    let transform = '';
    
    // Direction transform
    switch (direction) {
      case 'up':
        transform += `translateY(-${offset}px) `;
        break;
      case 'down':
        transform += `translateY(${offset}px) `;
        break;
      case 'left':
        transform += `translateX(-${offset}px) `;
        break;
      case 'right':
        transform += `translateX(${offset}px) `;
        break;
      default:
        transform += `translateY(-${offset}px) `;
    }
    
    // Scale transform
    if (scale !== 1) {
      transform += `scale(${isVisible ? scale : scale - 0.05}) `;
    }
    
    // Rotate transform
    if (rotateOnScroll) {
      transform += `rotate(${offset * 0.01 * rotateAmount}deg) `;
    }
    
    return transform.trim();
  };

  const getFilter = () => {
    let filter = '';
    
    if (blurEffect) {
      // Calculate blur based on scroll position
      const blurAmount = Math.abs(offset) * 0.03;
      filter += `blur(${blurAmount > 5 ? 5 : blurAmount}px) `;
    }
    
    return filter.trim();
  };

  const getOpacity = () => {
    if (!opacityEffect) return isVisible ? 1 : 0;
    
    // Calculate opacity based on scroll position
    const opacityValue = 1 - (Math.abs(offset) * 0.003);
    return Math.max(0.3, Math.min(1, opacityValue));
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ${className}`}
      style={{
        transform: getTransform(),
        filter: getFilter(),
        opacity: getOpacity(),
        willChange: 'transform, opacity, filter',
        transitionProperty: 'transform, opacity, filter',
        transitionDuration: '0.5s',
        transitionDelay: `${delay}s`,
        transitionTimingFunction: easing
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxEffect;
