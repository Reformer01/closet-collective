import React, { useEffect, useRef } from 'react';
import ProductCard from '../products/ProductCard';
import { Product } from '@/types/product';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ParallaxEffect from './ParallaxEffect';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ title, products }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = sectionRef.current?.querySelectorAll('.product-card');
            cards?.forEach((card, index) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, 100 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      };
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-fashion-lightGray">
      <div className="container mx-auto px-4">
        <ParallaxEffect speed={0.1} direction="up">
          <div className="mb-10 md:mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
            <div className="w-16 h-1 bg-fashion-black mx-auto mb-4"></div>
            <p className="text-fashion-gray max-w-md mx-auto">Handpicked just for you</p>
          </div>
        </ParallaxEffect>
        
        {/* Mobile view: Carousel */}
        <div className="block md:hidden">
          <Carousel>
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="basis-full">
                  <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
        
        {/* Desktop view: Staggered grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card opacity-0 transform translate-y-8 transition-all duration-500 ease-out"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                marginTop: index % 2 === 0 ? '0' : '2rem' // Staggered effect
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
