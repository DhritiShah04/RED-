import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.js';

const Carousel = () => {
  const carouselRef = useRef(null);
  const [ecoProducts, setEcoProducts] = useState([]);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 250, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/products`);
        setEcoProducts(response.data); // assuming response.data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative w-4/5 mx-auto py-24">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-green-100 p-4 rounded-full shadow-lg text-xl cursor-pointer z-10 transition-all hover:bg-green-300 hover:scale-110 hover:rotate-6 hover:shadow-xl"
      >
        &#10094;
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth space-x-8 hide-scrollbar transition-transform duration-500 ease-in-out"
        style={{ overflowY: 'hidden' }}
      >
        {ecoProducts.map((product) => (
          <div
            key={product.id}
            className="flex-none w-72 h-auto bg-white rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-3 hover:opacity-90"
          >
            <img
              src={Array.isArray(product.product_image_url) ? product.product_image_url[0] : product.product_image_url}
              alt={product.product_name}
              className="w-full h-48 object-cover rounded-t-xl transition-transform transform hover:scale-110 hover:rotate-3 duration-300"
            />
            <div className="py-6 px-6 text-center bg-green-50 rounded-b-xl">
              <h2 className="text-2xl font-semibold text-gray-800">{product.product_name}</h2>
              <p className="text-lg text-gray-600">₹{product.product_price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-green-100 p-4 rounded-full shadow-lg text-xl cursor-pointer z-10 transition-all hover:bg-green-300 hover:scale-110 hover:rotate-6 hover:shadow-xl"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
