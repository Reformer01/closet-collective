
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    link: '/category/women'
  },
  {
    id: 2,
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    link: '/category/men'
  },
  {
    id: 3,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    link: '/category/accessories'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-fashion-lightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-fashion-black to-transparent opacity-50 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-4">{category.name}</h3>
                  <span className="inline-block px-4 py-2 bg-white text-fashion-black font-medium">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
