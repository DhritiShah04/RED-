import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const OrderSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-2 text-green-700">Order Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your eco-friendly products are on their way!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/orders" 
              className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;