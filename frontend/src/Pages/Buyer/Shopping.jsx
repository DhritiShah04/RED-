import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import config from '../../config.js'
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
        const res = await axios.get(`${config.API_BASE_URL}/api/products`, {
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

        <div className="max-w-lg mx-auto mb-10">
          <input
            type="text"
            placeholder="Search eco-products..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {filtered.map((product) => {
            const imageList = product.product_image_url ? JSON.parse(product.product_image_url) : [];
            const firstImage = imageList.length ? imageList[0] : "/placeholder.jpg";

            return (
              <Link to={`/shopping/${product.product_id}`} key={product.product_id}>
                <div
                  className={`border rounded-xl p-4 flex flex-col transition-all duration-300 hover:scale-[1.02] ${getEcoStyles(
                    product.product_eco_rating?.toLowerCase()
                  )}`}
                >
                  <img
                    src={`http://localhost:5000/uploads/${firstImage}`}
                    alt={product.product_name}
                    className="h-52 w-full object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{product.product_name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{product.product_short_description}</p>
                  <div className="text-sm text-green-700 font-bold mb-2">₹{product.product_price}</div>

                  <div className="text-xs text-gray-600 mb-2 space-y-1">
                    ♻ Recyclable: {product.is_recyclable ? "Yes" : "No"} <br />
                    🌱 Organic Materials: {product.uses_organic_materials ? "Yes" : "No"} <br />
                    📦 Plastic Packaging: {product.is_plastic_packaging ? "Yes" : "No"} <br />
                    🏷 Certified: {product.is_certified ? "Yes" : "No"} <br />
                    🌍 Carbon Score: {product.carbon_footprint_score ?? "N/A"}
                  </div>

                  <button className="mt-auto bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all">
                    Show More
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
