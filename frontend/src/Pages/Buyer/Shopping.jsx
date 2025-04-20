import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import config from '../../config.js'
import { Search } from "lucide-react";

const getEcoStyles = (rating) => {
  if (rating === "low") return "border-red-500 shadow-[0_4px_18px_rgba(239,68,68,0.6)]";
  if (rating === "moderate") return "border-yellow-500 shadow-[0_4px_18px_rgba(234,179,8,0.6)]";
  return "border-green-500 shadow-[0_4px_18px_rgba(34,197,94,0.6)]";
};

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${config.API_BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setProducts(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const query = searchTerm.toLowerCase();
    const filteredResults = products.filter(
      (item) =>
        item.product_name?.toLowerCase().includes(query)
    );
    setFiltered(filteredResults);
  }, [searchTerm, products]);

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

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-white px-6 py-10">
        <p className="pb-4 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-600 to-yellow-500 drop-shadow-lg tracking-wide">
          Shop Green, Live Clean
        </p>
        <p className="text-center text-xl text-gray-500 mb-6">
          Designed with sustainability in mind, for a greener tomorrow!!! 🌱
        </p>

        <div className="max-w-lg mx-auto mb-10 relative">
          <input
            type="text"
            placeholder="Search eco-products..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {filtered.map((product) => {
            const imageList = product.product_image_url ? JSON.parse(product.product_image_url) : [];
            const firstImage = imageList.length ? imageList[0] : "/placeholder.jpg";
            const ecoRating = product.product_eco_rating?.toLowerCase();

            return (
              <Link to={`/shopping/${product.product_id}`} key={product.product_id}>
                <div
                  className={`border rounded-xl p-4 flex flex-col transition-all duration-300 hover:scale-[1.02] ${getEcoStyles(
                    ecoRating
                  )}`}
                >
                  <img
                    src={imageUrls[product.product_id-1]} // fallback loop if more products than images
                    alt={product.product_name}
                    className="h-52 w-full object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">Product Name: {product.product_name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{product.product_short_description}</p>
                  <div className="text-sm text-green-700 font-bold mb-2">Prize: ₹{product.product_price}</div>

                  {/* Eco rating display */}
                  <p className={`text-sm ${ecoRating === 'low' ? 'text-red-500' : ecoRating === 'moderate' ? 'text-yellow-500' : 'text-green-500'} mb-1`}>
                    Eco Rating: {ecoRating?.charAt(0).toUpperCase() + ecoRating?.slice(1)}
                  </p>

                  <button className="mt-auto bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all">
                    Show More...
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Shopping;
