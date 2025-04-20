import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ShoppingCart, Heart, MapPin, CheckCircle, ArrowLeft, Star, 
  ChevronRight, Leaf, Award, Truck, RefreshCw, Package
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import config from '../../config.js';
import { useCart } from "../../Components/CartProvider";

export default function ShoppingOpen() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isDeliveryCheckOpen, setIsDeliveryCheckOpen] = useState(false);
  const [productTab, setProductTab] = useState('description');

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
        
        // Check if product is in wishlist
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(storedWishlist);
        setIsWishlisted(storedWishlist.some(item => item.id === data.product_id));
        
        // Fetch recommended products after getting the main product
        fetchRecommendedProducts(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchRecommendedProducts = async (currentProduct) => {
    const token = localStorage.getItem("token");
    try {
      // Fetch products with higher eco rating or in the same category
      const res = await fetch(`${config.API_BASE_URL}/products?limit=4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch recommended products");

      const data = await res.json();
      
      // Filter and sort: prioritize products with higher eco ratings
      const filtered = data
        .filter(p => p.product_id !== currentProduct.product_id) // Exclude current product
        .sort((a, b) => {
          // First sort by eco rating
          const aEco = parseInt(a.product_eco_rating) || 0;
          const bEco = parseInt(b.product_eco_rating) || 0;
          
          if (bEco !== aEco) return bEco - aEco; // Higher eco rating first
          
          // Second sorting criterion: similar products based on arbitrary criteria
          // In a real app, this would be replaced with actual product category matching
          return 0;
        })
        .slice(0, 4); // Get top 4 recommendations
      
      setRecommendedProducts(filtered);
    } catch (err) {
      console.error("Error fetching recommended products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 border-t-4 border-emerald-500 rounded-full animate-spin"></div>
        <div className="text-emerald-700 text-xl font-medium">Loading sustainable treasures...</div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="text-red-600 text-xl">Product not found</div>
    </div>
  );

  const {
    product_id,
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

  const handleAddToCart = () => {
    const cartItem = {
      id: product_id || id,
      name: product_name,
      price: product_price,
      image: images.length > 0 ? images[0] : null
    };
    
    addToCart(cartItem);
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const toggleWishlist = () => {
    const newWishlistItem = {
      id: product_id || id,
      name: product_name,
      price: product_price,
      image: images.length > 0 ? images[0] : null,
      ecoRating: product_eco_rating
    };
    
    let newWishlist;
    if (isWishlisted) {
      newWishlist = wishlist.filter(item => item.id !== (product_id || id));
    } else {
      newWishlist = [...wishlist, newWishlistItem];
    }
    
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlist(newWishlist);
    setIsWishlisted(!isWishlisted);
  };

  const renderEcoRatingStars = (rating) => {
    const ratingNum = parseInt(rating) || 0;
    return Array(5).fill(0).map((_, idx) => (
      <span key={idx} className={`text-lg ${idx < ratingNum ? 'text-emerald-500' : 'text-gray-300'}`}>★</span>
    ));
  };

  const handleAddRecommendedToCart = (product) => {
    const images = product.product_image_url ? JSON.parse(product.product_image_url) : [];
    const cartItem = {
      id: product.product_id,
      name: product.product_name,
      price: product.product_price,
      image: images.length > 0 ? images[0] : null
    };
    
    addToCart(cartItem);
  };

  const getEcoScore = (score) => {
    const numScore = parseInt(score) || 0;
    let color = "text-red-500";
    let message = "Poor";
    
    if (numScore === 5) {
      color = "text-emerald-500";
      message = "Excellent";
    } else if (numScore === 4) {
      color = "text-green-500";
      message = "Great";
    } else if (numScore === 3) {
      color = "text-yellow-500";
      message = "Good";
    } else if (numScore === 2) {
      color = "text-orange-500";
      message = "Fair";
    }
    
    return { color, message };
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 font-sans">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-emerald-600 mb-6">
          <Link to="/shopping" className="flex items-center hover:text-emerald-800 transition-colors group">
            <ArrowLeft size={16} className="mr-1 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Shopping</span>
          </Link>
          <div className="ml-auto">
            Home &gt; Product &gt; <span className="font-medium">{product_name}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Images Section */}
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 mb-4 shadow-inner overflow-hidden group relative">
              <img
                    src={imageUrls[product.product_id-1]} // fallback loop if more products than images
                    alt={product.product_name}
                    className="h-52 w-full object-cover rounded-lg mb-4"
                  />
                
                {/* Eco rating badge */}
                <div className="absolute top-6 right-6 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md border border-emerald-100 flex items-center">
                  <div className="flex items-center">
                    <Leaf size={14} className="text-emerald-500 mr-1" />
                    <span className="font-medium text-sm">Eco Score: </span>
                    <span className={`font-bold text-sm ml-1 ${getEcoScore(product_eco_rating).color}`}>
                      {product_eco_rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 px-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                        activeImage === idx ? 'ring-2 ring-emerald-500 shadow-lg scale-105' : 'border border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={`http://localhost:5000/uploads/${img}`}
                        alt={`Product view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Certification Section */}
              {certs.length > 0 && (
                <div className="mt-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-100">
                  <h3 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center">
                    <Award size={16} className="mr-2 text-emerald-500" />
                    Product Certifications
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {certs.map((cert, idx) => (
                      <div key={idx} className="group relative">
                        <img
                          src={`http://localhost:5000/uploads/${cert}`}
                          alt={`Certification ${idx + 1}`}
                          className="w-16 h-16 object-contain bg-white border rounded-lg p-1 transition-transform hover:scale-110 shadow-sm"
                        />
                        <div className="hidden group-hover:block absolute -top-10 left-0 bg-white p-2 rounded-md shadow-md text-xs w-32 text-center">
                          Eco Certification #{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Basic Info */}
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product_name}</h1>
                    <p className="text-gray-500">{product_short_description}</p>
                  </div>
                  <div className="flex items-center">
                    {renderEcoRatingStars(product_eco_rating)}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-3xl font-bold text-emerald-600">₹{product_price}</div>
                  {product_eco_rating >= 4 && (
                    <div className="flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                      <Leaf size={14} className="mr-1" fill="currentColor" />
                      Eco-Friendly Choice
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-6 border-b border-gray-200">
                <div className="flex space-x-6">
                  <button 
                    onClick={() => setProductTab('description')}
                    className={`py-3 relative ${productTab === 'description' ? 
                      'text-emerald-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Description
                    {productTab === 'description' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500"></span>
                    )}
                  </button>
                  <button 
                    onClick={() => setProductTab('sustainability')}
                    className={`py-3 relative ${productTab === 'sustainability' ? 
                      'text-emerald-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Sustainability
                    {productTab === 'sustainability' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500"></span>
                    )}
                  </button>
                  <button 
                    onClick={() => setProductTab('delivery')}
                    className={`py-3 relative ${productTab === 'delivery' ? 
                      'text-emerald-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Delivery
                    {productTab === 'delivery' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500"></span>
                    )}
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="mb-8">
                {productTab === 'description' && (
                  <div className="animate-fadeIn">
                    <p className="text-gray-600 whitespace-pre-wrap">{product_description}</p>
                  </div>
                )}

                {productTab === 'sustainability' && (
                  <div className="animate-fadeIn">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-100 mb-4">
                      <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center">
                        <Leaf size={18} className="mr-2 text-emerald-500" />
                        Sustainability Features
                      </h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div className="flex items-center">
                          <span className={`w-4 h-4 rounded-full mr-2 transition-colors ${is_recyclable ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                          <span className="text-gray-700">Recyclable</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`w-4 h-4 rounded-full mr-2 transition-colors ${is_biodegradable ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                          <span className="text-gray-700">Biodegradable</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`w-4 h-4 rounded-full mr-2 transition-colors ${is_reusable ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                          <span className="text-gray-700">Reusable</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`w-4 h-4 rounded-full mr-2 transition-colors ${uses_organic_materials ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                          <span className="text-gray-700">Organic Materials</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`w-4 h-4 rounded-full mr-2 transition-colors ${!is_plastic_packaging ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                          <span className="text-gray-700">No Plastic Packaging</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`w-4 h-4 rounded-full mr-2 transition-colors ${is_certified ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                          <span className="text-gray-700">Certified</span>
                        </div>
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <span className="text-sm text-gray-500">Carbon Score</span>
                          <div className="text-lg font-semibold text-emerald-700">{carbon_footprint_score || "N/A"}</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <span className="text-sm text-gray-500">Durability</span>
                          <div className="text-lg font-semibold text-emerald-700">{durability || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-2">Environmental Impact</h4>
                      <p className="text-sm text-gray-600">
                        By choosing products with high eco-ratings, you're helping reduce environmental impact. 
                        This product has an eco-rating of {product_eco_rating}/5, making it a {getEcoScore(product_eco_rating).message.toLowerCase()} 
                        choice for environmentally conscious consumers.
                      </p>
                    </div>
                  </div>
                )}

                {productTab === 'delivery' && (
                  <div className="animate-fadeIn">
                    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Information</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Truck size={20} className="text-emerald-500 mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-800">Standard Delivery</h4>
                            <p className="text-sm text-gray-600">3-5 business days</p>
                          </div>
                          <div className="ml-auto font-medium text-emerald-600">Free</div>
                        </div>
                        
                        <div className="flex items-start">
                          <Package size={20} className="text-emerald-500 mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-800">Express Delivery</h4>
                            <p className="text-sm text-gray-600">1-2 business days</p>
                          </div>
                          <div className="ml-auto font-medium text-emerald-600">₹70</div>
                        </div>
                        
                        <div className="flex items-start">
                          <RefreshCw size={20} className="text-emerald-500 mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-800">Return Policy</h4>
                            <p className="text-sm text-gray-600">7 days easy returns</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-800 mb-3">Check Delivery Availability</h4>
                        <div className="flex">
                          <div className="relative flex-grow">
                            <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={pinCode}
                              onChange={(e) => setPinCode(e.target.value)}
                              className="pl-10 w-full border border-gray-300 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              placeholder="Enter PIN code"
                            />
                          </div>
                          <button className="bg-emerald-600 text-white px-4 py-3 rounded-r-lg hover:bg-emerald-700 transition-colors">
                            Check
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <button 
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  <span>{addedToCart ? "Added to Cart" : "Add to Cart"}</span>
                </button>
                <button 
                  className={`flex-1 border py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isWishlisted 
                      ? 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100' 
                      : 'border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                  }`}
                  onClick={toggleWishlist}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                  <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
                </button>
              </div>
              
              {/* Added to Cart Notification */}
              {addedToCart && (
                <div className="mt-4 bg-emerald-100 text-emerald-700 p-3 rounded-lg flex items-center animate-fadeIn shadow-sm">
                  <CheckCircle size={18} className="mr-2" />
                  <span>Product added to your cart successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-12 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mr-3">
                <Leaf size={20} />
              </span>
              You May Also Like
            </h2>
            <button className="text-emerald-600 hover:text-emerald-800 flex items-center text-sm font-medium group">
              View More <ChevronRight size={16} className="ml-1 group-hover:transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => {
                const productImages = product.product_image_url ? JSON.parse(product.product_image_url) : [];
                const ecoRating = parseInt(product.product_eco_rating) || 0;
                return (
                  <div key={product.product_id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group">
                    <Link to={`/shopping/${product.product_id}`} className="block">
                      <div className="relative">
                      <img
                    src={imageUrls[product.product_id-1]} // fallback loop if more products than images
                    alt={product.product_name}
                    className="h-52 w-full object-cover rounded-lg mb-4"
                  />
                        {/* Eco Rating Badge */}
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                          ecoRating >= 4 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <Star size={12} className="mr-1" fill="currentColor" />
                          <span>Eco: {product.product_eco_rating}/5</span>
                        </div>
                        
                        {/* If eco rating is 5, show special badge */}
                        {ecoRating === 5 && (
                          <div className="absolute top-12 -left-8 bg-emerald-500 text-white py-1 px-10 transform rotate-315 text-xs font-bold shadow-md">
                            TOP RATED
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <Link to={`/shopping/${product.product_id}`} className="block">
                        <h3 className="font-medium text-gray-800 mb-1 truncate hover:text-emerald-600 transition-colors">
                          {product.product_name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-2">
                          {product.product_short_description}
                        </p>
                      </Link>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-emerald-600">₹{product.product_price}</span>
                        <button 
                          onClick={() => handleAddRecommendedToCart(product)}
                          className="p-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors hover:scale-110 transform"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-md">
              <div className="flex flex-col items-center">
                <Package size={40} className="text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-1">No Recommendations Yet</h3>
                <p className="text-sm">We're finding the perfect sustainable matches for you!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
