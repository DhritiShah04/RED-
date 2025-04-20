import React, { useState, useEffect } from "react";
import { useCart } from "../../Components/CartProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { ShoppingBag, ArrowRight, Calendar, Package } from "lucide-react";

const Orders = () => {
  const { orders, getOrders } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the latest orders when component mounts
    const fetchOrders = async () => {
      setLoading(true);
      await getOrders(); // Make sure this function exists in CartProvider
      setLoading(false);
    };
    
    fetchOrders();
  }, [getOrders]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getOrderStatus = (status) => {
    const statusMap = {
      'pending': { color: 'text-yellow-600 bg-yellow-50', label: 'Processing' },
      'processing': { color: 'text-blue-600 bg-blue-50', label: 'In Progress' },
      'shipped': { color: 'text-purple-600 bg-purple-50', label: 'Shipped' },
      'delivered': { color: 'text-emerald-600 bg-emerald-50', label: 'Delivered' },
      'cancelled': { color: 'text-red-600 bg-red-50', label: 'Cancelled' }
    };
    
    return statusMap[status] || { color: 'text-gray-600 bg-gray-50', label: 'Processing' };
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
          <div className="animate-pulse text-emerald-700 text-xl">Loading your orders...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-emerald-50 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <ShoppingBag className="mr-2 text-emerald-600" size={24} />
              Your Orders
            </h1>
            <button
              onClick={handleContinueShopping}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition flex items-center"
            >
              Continue Shopping
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">You haven't placed any orders. Start shopping to see your orders here!</p>
              <button
                onClick={handleContinueShopping}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold text-lg text-gray-800">
                            Order #{order.id.toString().slice(-6).padStart(6, '0')}
                          </h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatus(order.status).color}`}>
                            {getOrderStatus(order.status).label}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Calendar size={14} className="mr-1" />
                          {order.date ? formatDate(order.date) : 'Just now'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Order Total</div>
                        <div className="text-xl font-semibold text-emerald-600">₹{order.total}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-5 py-4">
                    <div className="divide-y divide-gray-100">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="py-3 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                                <img 
                                  src={`http://localhost:5000/uploads/${item.image}`} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-800">{item.name}</div>
                              <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-800">₹{item.price * item.quantity}</div>
                            <div className="text-sm text-gray-500">₹{item.price} each</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      View Order Details
                    </button>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;