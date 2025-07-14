import React from 'react';
import { Link } from 'react-router-dom';
import ParallaxEffect from './ParallaxEffect';

const Hero = () => {
  return (
    <section className="relative h-screen bg-gradient-to-r from-fashion-black to-gray-800 flex items-center overflow-hidden">
      {/* Background layers with parallax effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center opacity-30"></div>
      
      <ParallaxEffect speed={0.2} direction="up" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center opacity-20 scale-110"></div>
      </ParallaxEffect>
      
      {/* Decorative elements */}
      <ParallaxEffect speed={0.4} direction="left" className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fashion-accent opacity-20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      </ParallaxEffect>
      
      <ParallaxEffect speed={0.3} direction="right" className="absolute top-0 right-0 w-full h-1/3 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fashion-accent opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </ParallaxEffect>
      
      <div className="container mx-auto px-4 z-10 text-white">
        <ParallaxEffect speed={0.4} direction="down">
          <div className="max-w-2xl">
            <div className="w-24 h-1 bg-white mb-8 opacity-60"></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
              New Summer <br/>
              <span className="text-fashion-accent">Collection</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-10 opacity-80 animate-fade-in opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
              Discover the latest trends for the upcoming season
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 animate-fade-in opacity-0" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
              <Link to="/category/women" className="bg-white text-fashion-black px-6 py-3 sm:px-8 sm:py-4 font-medium hover:bg-opacity-90 transition-colors text-center hover:scale-105 transition-transform">
                Shop Women
              </Link>
              <Link to="/category/men" className="border border-white text-white px-6 py-3 sm:px-8 sm:py-4 font-medium hover:bg-white hover:text-fashion-black transition-colors text-center hover:scale-105 transition-transform">
                Shop Men
              </Link>
            </div>
          </div>
        </ParallaxEffect>
      </div>
      
      {/* Floating decorative elements */}
      <ParallaxEffect speed={0.15} direction="up" className="absolute bottom-10 right-10 z-10 hidden md:block">
        <div className="w-80 h-80 border border-white/20 rounded-full"></div>
      </ParallaxEffect>
      
      <ParallaxEffect speed={0.25} direction="down" className="absolute top-20 right-20 z-10 hidden md:block">
        <div className="w-40 h-40 border border-white/10 rounded-full"></div>
      </ParallaxEffect>
    </section>
  );
};

export default Hero;
