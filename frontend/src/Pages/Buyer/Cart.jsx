import { useCart } from "../../Components/CartProvider";
import Navbar from "../../Components/Navbar";

const Cart = () => {
  const { cart, removeFromCart, placeOrder } = useCart(); // Correct usage of the hook

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl animate-fadeIn">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
            🛒 Your Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center text-yellow-500 text-lg font-medium">
              Your cart is empty. Start adding products!
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-3 gap-4"
                >
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-sm text-yellow-600">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-700 font-bold text-lg">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ❌ Remove
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
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-6 transition"
                onClick={placeOrder}
              >
                ✅ Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;