import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Components/CartProvider";
import Navbar from "../../Components/Navbar";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setIsOrdering(true);
    try {
      await placeOrder();
      navigate("/order-success");
    } catch (error) {
      console.error("Order placement failed:", error);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
            🛒 Your Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-yellow-500 text-lg font-medium mb-4">
                Your cart is empty. Start adding eco-friendly products!
              </div>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-3 gap-4"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </span>
                      <span className="text-sm text-green-700">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <button
                        className="w-8 h-8 flex items-center justify-center border rounded-l-md hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 h-8 text-center border-t border-b"
                      />
                      <button
                        className="w-8 h-8 flex items-center justify-center border rounded-r-md hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <span className="text-green-700 font-bold">
                      ₹{item.price * item.quantity}
                    </span>
                    
                    <button
                      className="p-2 text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-xl font-semibold text-gray-700">
                  Total:
                </span>
                <span className="text-2xl font-bold text-yellow-600">
                  ₹{totalPrice}
                </span>
              </div>

              <button
                className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-6 transition ${
                  isOrdering ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={handlePlaceOrder}
                disabled={isOrdering}
              >
                {isOrdering ? "Processing..." : "✅ Place Order"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;