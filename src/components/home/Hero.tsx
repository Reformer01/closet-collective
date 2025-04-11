
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] bg-gradient-to-r from-fashion-black to-gray-800 flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center opacity-50"></div>
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-2xl animate-slide-up opacity-0" style={{animationDelay: '0.2s'}}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">New Summer Collection</h1>
          <p className="text-xl mb-8">Discover the latest trends for the upcoming season</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/category/women" className="bg-white text-fashion-black px-8 py-3 font-medium hover:bg-opacity-90 transition-colors text-center">
              Shop Women
            </Link>
            <Link to="/category/men" className="border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-fashion-black transition-colors text-center">
              Shop Men
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
