import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.js';
import { Link } from 'react-router-dom'; // Step 1

const Carousel = () => {
  const carouselRef = useRef(null);
  const [ecoProducts, setEcoProducts] = useState([]);

  const imageUrls = [
    'https://m.media-amazon.com/images/I/71edeKpYPpL.jpg',
    'https://terrasmart.co/wp-content/uploads/2020/11/Jungle-Straws-Stainless-Steel-Set-Deep-Ocean-Blue-Red-3.jpg',
    'https://m.media-amazon.com/images/I/61RtUsvISaL.AC_UY1000.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaeGkCcrFoHUhAMTzlmsuyGR2CMYt0TwtN4Q&s',
    'https://www.beeswrap.com/cdn/shop/files/2022_BTS_Website_Update_2_1920x.png?v=1659014107',
    'https://www.beeswrap.com/cdn/shop/files/2022_BTS_Website_Update_2_1920x.png?v=1659014107',
    'https://viva-global.com/cdn/shop/files/Side-Green_15b6a54d-bdff-450f-929f-0489af3a6222.jpg?v=1715410702',
    'https://azafran.in/cdn/shop/articles/Skin_Care_Blog_File.jpg?v=1673428374&width=1024',
    'https://m.media-amazon.com/images/I/616qF0EFs8L._AC_UF1000,1000_QL80_.jpg',

  ];

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 250, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/products`);
        setEcoProducts(response.data);
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
        {ecoProducts.map((product, index) => (
          <Link to={`/shopping/${product.product_id}`} key={product.product_id}> {/* Step 2 */}
            <div className="flex-none w-72 h-auto bg-white rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-3 hover:opacity-90">
              <img
                src={imageUrls[index % imageUrls.length]}
                alt={product.product_name}
                className="w-full h-48 object-cover rounded-t-xl transition-transform transform hover:scale-110 hover:rotate-3 duration-300"
              />
              <div className="py-6 px-6 text-center bg-green-50 rounded-b-xl">
                <h2 className="text-2xl font-semibold text-gray-800">{product.product_name}</h2>
                <p className="text-lg text-gray-600">₹{product.product_price}</p>
              </div>
            </div>
          </Link>
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
