import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import Navbar from "../../Components/Navbar";
import config from '../../config.js';
import { useCart } from "../../Components/CartProvider";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Use the cart context
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${config.API_BASE_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-10 text-center text-gray-600">Loading product...</div>;

  const {
    product_id, // Make sure this is coming from your API response
    product_name,
    product_short_description,
    product_description,
    product_price,
    product_image_url,
    product_eco_rating,
    is_recyclable,
    is_biodegradable,
    is_reusable,
    uses_organic_materials,
    carbon_footprint_score,
    is_plastic_packaging,
    is_certified,
    certification_urls,
    durability,
  } = product;

  const images = product_image_url ? JSON.parse(product_image_url) : [];
  const certs = certification_urls ? JSON.parse(certification_urls) : [];

  // Handler for adding to cart
  const handleAddToCart = () => {
    const cartItem = {
      id: product_id || id, // Use product_id if available, otherwise fallback to URL id param
      name: product_name,
      price: product_price,
      image: images.length > 0 ? images[0] : null
    };
    
    addToCart(cartItem);
    setAddedToCart(true);
    
    // Reset the "Added to cart" message after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 font-sans">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          Home &gt; Product &gt; <span className="text-gray-700 font-medium">{product_name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Images */}
          <div className="flex flex-col gap-4">
            {images.length ? (
              images.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`Product ${idx + 1}`}
                  className="rounded-xl shadow-md object-cover w-full"
                />
              ))
            ) : (
              <img
                src="/placeholder.jpg"
                alt="Placeholder"
                className="rounded-xl shadow-md object-cover w-full"
              />
            )}
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-1">{product_name}</h2>
            <h1 className="text-lg text-gray-600 mb-3">{product_short_description}</h1>

            {/* Rating (Eco Rating) */}
            <div className="flex items-center mb-4 text-green-700 text-sm capitalize">
              ♻ Eco Rating: {product_eco_rating}
            </div>

            {/* Price */}
            <div className="text-xl font-semibold text-green-700 mb-1">₹{product_price}</div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4 whitespace-pre-wrap">{product_description}</p>

            {/* Eco Facts */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              ♻ Recyclable: {is_recyclable ? "Yes" : "No"} <br />
              🌿 Biodegradable: {is_biodegradable ? "Yes" : "No"} <br />
              🔄 Reusable: {is_reusable ? "Yes" : "No"} <br />
              🌱 Organic Materials: {uses_organic_materials ? "Yes" : "No"} <br />
              🌍 Carbon Score: {carbon_footprint_score || "N/A"} <br />
              📦 Plastic Packaging: {is_plastic_packaging ? "Yes" : "No"} <br />
              🏷 Certified: {is_certified ? "Yes" : "No"} <br />
              🧱 Durability: {durability || "N/A"}
            </div>

            {/* Certification Images */}
            {certs.length > 0 && (
              <div className="mb-4">
                <span className="text-sm font-medium">Certifications:</span>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {certs.map((cert, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:5000/uploads/${cert}`}
                      alt={`Cert ${idx + 1}`}
                      className="w-16 h-16 object-contain border rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4 flex-wrap">
              <button 
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all"
                onClick={handleAddToCart}
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition-all">
                Wishlist
              </button>
            </div>
            
            {/* Added to Cart Notification */}
            {addedToCart && (
              <div className="bg-green-100 text-green-700 p-2 rounded-md mb-4 text-sm animate-pulse">
                Product added to your cart successfully!
              </div>
            )}

            {/* Delivery Check */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Enter PIN code for delivery:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border p-2 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 560001"
                />
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all">
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}