// src/Pages/Buyer/Orders.jsx
import React from "react";
import { useCart } from "../../Components/CartProvider";
import Navbar from "../../Components/Navbar";

const Orders = () => {
  const { orders } = useCart();

  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl animate-fadeIn">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          📦 Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-yellow-500 text-lg font-medium">
            You haven't placed any orders yet. Start shopping!
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border-b border-gray-200 pb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-xl text-green-700">
                    Order #{order.id.toString().slice(-4)}
                  </h2>
                  <span className="text-yellow-600 text-lg font-medium">
                    Total: ₹{order.total}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-gray-700"
                    >
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* If orders are available, show a button to go back or continue */}
            <div className="mt-6 flex justify-center">
              <button
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
              >
                ✅ Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Orders;
