import React from 'react';
import ew from '../../public/Images/ethnic1.jpg'
import casual from '../../public/Images/casual.jpg'
import eye from '../../public/Images/eyewear.jpeg'
import foot from '../../public/Images/footwear.jpg'
import handbag from '../../public/Images/handbag1.jpeg'
import jwellery from '../../public/Images/jwellery.jpeg'
import lounge from '../../public/Images/lounge.jpg'
import menactive from '../../public/Images/men.jpg'
import officew from '../../public/Images/office.jpg'
import watch from '../../public/Images/watch1.jpg'
import beauty from '../../public/Images/beautyprod.avif'
import sports from '../../public/Images/sports.avif'
const categories = [
  {
    title: 'Ethnic Wear',
    discount: '50-80% OFF',
    image: ew,
  },
  {
    title: 'Casual Wear',
    discount: '40-80% OFF',
    image: casual,
  },
  {
    title: "Men's Activewear",
    discount: '30-70% OFF',
    image: menactive,
  },
  {
    title: "Hand Bags",
    discount: '30-70% OFF',
    image: handbag,
    
  },
  {
    title: 'Lounge Wear',
    discount: '40-80% OFF',
    image: lounge,
   
  },
  {
    title: 'Watch',
    discount: '30-80% OFF',
    image: watch,
    
  },
  {
    title: 'Footwear',
    discount: '30-60% OFF',
    image: foot,
   
  },
  {
    title: 'Eyewear',
    discount: 'UP TO 70% OFF',
    image: eye,
  },
  {
    title: 'Office Wear',
    discount: 'UP TO 70% OFF',
    image: officew,
    
  },
  {
    title: 'Sports Wear',
    discount: 'UP TO 80% OFF',
    image: sports,
    
  },
  {
    title: 'Jwellery',
    discount: 'UP TO 60% OFF',
    image: jwellery,
    
  },
  {
    title: 'Beauty & Makeup',
    discount: 'UP TO 60% OFF',
    image: beauty,
    
  },
];

const CategoryGrid = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-green-50 rounded-lg shadow-md overflow-hidden flex flex-col items-center text-center"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium">{cat.title}</h3>
              <p className="text-xl font-bold">{cat.discount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
