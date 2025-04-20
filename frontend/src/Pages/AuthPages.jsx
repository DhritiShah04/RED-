import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import config from '../config.js';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    seller_email: "",
    seller_password: "",
    buyer_email: "",
    buyer_password: "",
    name: "",
    role: "buyer",
    companyName: "",
    description: "",
    buyer_phone_number: "",
    buyer_address: "",
    buyer_pincode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === "radio" ? value : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = formData.role;
    let payload = {};

    if (role === "buyer") {
      payload = {
        buyer_name: formData.name,
        buyer_email: formData.buyer_email,
        buyer_password: formData.buyer_password,
        buyer_phone_number: formData.buyer_phone_number,
        buyer_address: formData.buyer_address,
        buyer_pincode: formData.buyer_pincode,
      };
    } else {
      payload = {
        seller_name: formData.name,
        seller_email: formData.seller_email,
        seller_password: formData.seller_password,
        seller_company_name: formData.companyName,
        seller_company_description: formData.description,
      };
    }

    let endpoint;
    if (isLogin) {
      endpoint = `${config.API_BASE_URL}/login/${role}`;
    } else {
      endpoint =
        role === "buyer"
          ? `${config.API_BASE_URL}/buyers`
          : `${config.API_BASE_URL}/sellers`;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (isLogin && data.token) {
        localStorage.setItem("token", data.token);
        if (role === "buyer") {
          localStorage.setItem("buyer_id", data.buyer_id);
          navigate("/");
        } else {
          localStorage.setItem("seller_id", data.seller_id);
          navigate("/seller/dashboard");
        }
      } else if (!isLogin && (data.buyer_id || data.seller_id)) {
        alert("Account created successfully. Please log in.");
        setIsLogin(true);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      >
        <h2 className="mb-6 text-3xl font-bold text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={formData.role === "buyer"}
                onChange={handleChange}
              />
              <span>Buyer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="seller"
                checked={formData.role === "seller"}
                onChange={handleChange}
              />
              <span>Seller</span>
            </label>
          </div>

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full rounded-lg border border-gray-300 p-2"
              onChange={handleChange}
              required
            />
          )}

          {!isLogin && formData.role === "seller" && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="w-full rounded-lg border border-gray-300 p-2"
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Company Description"
                className="w-full rounded-lg border border-gray-300 p-2"
                onChange={handleChange}
                required
              />
            </>
          )}

          {/* Buyer-specific fields */}
          {!isLogin && formData.role === "buyer" && (
            <>
              <input
                type="text"
                name="buyer_phone_number"
                placeholder="Phone Number"
                className="w-full rounded-lg border border-gray-300 p-2"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="buyer_address"
                placeholder="Address"
                className="w-full rounded-lg border border-gray-300 p-2"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="buyer_pincode"
                placeholder="Pincode"
                className="w-full rounded-lg border border-gray-300 p-2"
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name={formData.role === "buyer" ? "buyer_email" : "seller_email"}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name={
              formData.role === "buyer"
                ? "buyer_password"
                : "seller_password"
            }
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
