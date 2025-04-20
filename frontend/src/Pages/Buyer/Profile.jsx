import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import config from "../../config.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState(null); // initially null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = localStorage.getItem("buyer_id");
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (buyerId && token) {
      setLoading(true);
      axios
        .get(`${config.API_BASE_URL}/buyers/${buyerId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch buyer:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const orders = [
    { id: 1, date: "2025-04-10", total: "$50.00", status: "Delivered" },
    { id: 2, date: "2025-04-05", total: "$120.00", status: "Shipped" },
    { id: 3, date: "2025-03-28", total: "$30.00", status: "Processing" },
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleCheckRewards = () => {
    if (!user) return;

    const unlocked = user.product_eco_rating !== "low";
    setUser((prev) => ({ ...prev, rewardUnlocked: unlocked }));
  };

  useEffect(() => {
    if (user?.product_eco_rating) {
      handleCheckRewards();
    }
  }, [user]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen bg-gradient-to-br from-[#e2faeb] via-[#b8ffd2] to-[#a5ffc6] justify-center items-center">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg p-8 rounded-xl">
            <p className="text-green-700 text-xl font-medium">
              Loading profile...
            </p>
          </div>
        </div>
      </>
    );
  }

  // User not found state
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen bg-gradient-to-br from-[#e2faeb] via-[#b8ffd2] to-[#a5ffc6] justify-center items-center">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg p-8 rounded-xl">
            <p className="text-red-600 text-xl font-medium">
              User not found. Please log in again.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-[#e2faeb] via-[#b8ffd2] to-[#a5ffc6]">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-green-300/30 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-cyan-200/30 blur-3xl"></div>

        {/* Sidebar */}
        <motion.aside
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-white/80 backdrop-blur-sm shadow-lg p-6 rounded-tr-3xl rounded-br-3xl z-10"
        >
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
              {user.buyer_name ? user.buyer_name.charAt(0) : "?"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-900">
                Hello, {user.buyer_name || "User"}
              </h2>
              <p className="text-green-600 text-xs">Welcome back!</p>
            </div>
          </div>

          <nav>
            <ul className="space-y-4 text-gray-700">
              {[
                { id: "profile", label: "My Profile", icon: "👤" },
                { id: "orders", label: "Orders & Returns", icon: "📦" },
                { id: "ecoRewards", label: "Eco Rewards", icon: "🌱" },
                { id: "delete", label: "Delete Account", icon: "🗑️" },
              ].map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                      : "hover:bg-green-50"
                  }`}
                  onClick={() => handleSectionClick(item.id)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span
                    className={`font-medium ${
                      activeSection === item.id ? "text-white" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>

        {/* Content Area */}
        <main className="flex-1 p-8">
          {/* Profile Details */}
          {activeSection === "profile" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div
                variants={itemVariants}
                className="flex justify-between items-center"
              >
                <h1 className="text-3xl font-bold text-green-900">
                  My Profile
                </h1>
                <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-green-700 text-sm font-medium">
                    Active
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm shadow-lg p-8 rounded-xl mb-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-green-900">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-gray-800">
                  <div className="space-y-2">
                    <label className="text-sm text-green-600 font-medium">
                      Full Name
                    </label>
                    <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                      {user.buyer_name || "-"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-green-600 font-medium">
                      Mobile Number
                    </label>
                    <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                      {user.buyer_phone_number || "-"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-green-600 font-medium">
                      Email ID
                    </label>
                    <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                      {user.buyer_email || "- not added -"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-green-600 font-medium">
                      Address
                    </label>
                    <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                      {user.buyer_address || "- not added -"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-green-600 font-medium">
                      Pin Code
                    </label>
                    <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                      {user.buyer_pincode || "- not added -"}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Order History */}
          {activeSection === "orders" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex justify-between items-center mb-6"
              >
                <h1 className="text-3xl font-bold text-green-900">My Orders</h1>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <span>Filter</span>
                  <span>▼</span>
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm shadow-lg p-8 rounded-xl"
              >
                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-gray-800">
                      <thead>
                        <tr className="border-b border-green-100">
                          <th className="text-left py-4 px-4 text-green-700 font-semibold">
                            Order ID
                          </th>
                          <th className="text-left py-4 px-4 text-green-700 font-semibold">
                            Date
                          </th>
                          <th className="text-left py-4 px-4 text-green-700 font-semibold">
                            Total
                          </th>
                          <th className="text-left py-4 px-4 text-green-700 font-semibold">
                            Status
                          </th>
                          <th className="text-left py-4 px-4 text-green-700 font-semibold">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-green-50 hover:bg-green-50/50 transition-colors"
                          >
                            <td className="py-4 px-4 font-medium">
                              # {order.id}
                            </td>
                            <td className="py-4 px-4">{order.date}</td>
                            <td className="py-4 px-4 font-medium">
                              {order.total}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Shipped"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">📦</div>
                    <p className="text-lg text-green-800 font-medium">
                      No orders placed yet
                    </p>
                    <p className="text-green-600 mt-2">
                      Your order history will appear here
                    </p>
                    <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Start Shopping
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Eco Rewards */}
          {activeSection === "ecoRewards" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex justify-between items-center mb-6"
              >
                <h1 className="text-3xl font-bold text-green-900">
                  Eco Rewards
                </h1>
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center">
                    <span className="text-lg mr-2">🌱</span>
                    <span className="font-bold">{user.ecoPoints || 0}</span>
                    <span className="ml-1 text-sm">points</span>
                  </div>
                </div>
              </motion.div>

              {(() => {
                // Define the 5 sections based on product tags
                const rewardSections = [
                  {
                    name: "Eco-Friendly",
                    tag: "eco-friendly",
                    icon: "🌿",
                    items: [
                      {
                        name: "Bamboo Toothbrush",
                        tags: ["eco-friendly", "biodegradable"],
                      },
                      {
                        name: "Reusable Water Bottle",
                        tags: ["eco-friendly", "recyclable"],
                      },
                    ],
                  },
                  {
                    name: "Plastic-Free",
                    tag: "plastic-free",
                    icon: "🚫",
                    items: [
                      {
                        name: "Cotton Bag",
                        tags: ["plastic-free", "recyclable"],
                      },
                      {
                        name: "Glass Straws",
                        tags: ["plastic-free", "eco-friendly"],
                      },
                    ],
                  },
                  {
                    name: "Low Carbon Footprint",
                    tag: "low carbon footprint",
                    icon: "👣",
                    items: [
                      {
                        name: "Solar Lamp",
                        tags: ["low carbon footprint", "eco-friendly"],
                      },
                      {
                        name: "Electric Car Charger",
                        tags: ["low carbon footprint"],
                      },
                    ],
                  },
                  {
                    name: "Biodegradable",
                    tag: "biodegradable",
                    icon: "♻️",
                    items: [
                      {
                        name: "Biodegradable Plates",
                        tags: ["biodegradable", "eco-friendly"],
                      },
                      {
                        name: "Compostable Bags",
                        tags: ["biodegradable", "plastic-free"],
                      },
                    ],
                  },
                  {
                    name: "Recycled",
                    tag: "recyclable",
                    icon: "🔄",
                    items: [
                      {
                        name: "Recycled Paper Notebook",
                        tags: ["recyclable", "eco-friendly"],
                      },
                      {
                        name: "Recycled Plastic Water Bottle",
                        tags: ["recyclable", "eco-friendly"],
                      },
                    ],
                  },
                ];

                // Calculate points based on tags
                const calculatePoints = (section) => {
                  return section.items.reduce((total, product) => {
                    // Count points for the matching tag in each product
                    if (product.tags.includes(section.tag)) {
                      total += 1; // Each product tag adds 1 point
                    }
                    return total;
                  }, 0);
                };

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rewardSections.map((section, index) => {
                      const points = calculatePoints(section);
                      const isUnlocked = points >= 10;

                      return (
                        <motion.div
                          variants={itemVariants}
                          key={section.name}
                          className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <span className="text-2xl mr-3">
                                  {section.icon}
                                </span>
                                <h4 className="text-xl font-bold text-green-900">
                                  {section.name}
                                </h4>
                              </div>
                              <div className="bg-green-100 px-3 py-1 rounded-full text-green-800 text-sm font-medium">
                                {points} points
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between mb-2 text-sm">
                                <span className="text-green-700">Progress</span>
                                <span className="text-green-700 font-medium">
                                  {points} / 50 points
                                </span>
                              </div>
                              <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                                  style={{ width: `${(points / 50) * 100}%` }}
                                />
                              </div>
                            </div>

                            {/* Reward Status */}
                            {isUnlocked ? (
                              <div className="p-4 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-lg border border-green-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                                  <div className="text-4xl opacity-30">🎁</div>
                                </div>
                                <p className="font-medium text-green-800 flex items-center">
                                  <span className="text-xl mr-2">🎉</span>
                                  Reward Unlocked!
                                </p>
                                <p className="text-green-700 text-sm mt-1">
                                  You've earned a 10% discount on {section.name}{" "}
                                  products!
                                </p>
                                <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                                  Claim Reward
                                </button>
                              </div>
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-lg border border-yellow-200">
                                <p className="font-medium text-yellow-800">
                                  {50 - points} more points needed
                                </p>
                                <p className="text-yellow-700 text-sm mt-1">
                                  Keep shopping {section.name} products to
                                  unlock your reward!
                                </p>
                                <button
                                  className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                                  onClick={() => navigate("/shopping")}
                                >
                                  Browse More Products
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* Wishlist Section */}
          {activeSection === "wishlist" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex justify-between items-center mb-6"
              >
                <h1 className="text-3xl font-bold text-green-900">
                  My Wishlist
                </h1>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center">
                    <span>Sort By</span>
                    <span className="ml-2">▼</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Delete Account */}
          {activeSection === "delete" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex justify-between items-center mb-6"
              >
                <h1 className="text-3xl font-bold text-red-600">
                  Delete Account
                </h1>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm shadow-lg p-8 rounded-xl"
              >
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-lg mb-6">
                  <div className="text-3xl text-red-500">⚠️</div>
                  <div>
                    <h3 className="text-xl font-bold text-red-700 mb-2">
                      Warning: This action cannot be undone
                    </h3>
                    <p className="text-red-600">
                      Deleting your account will permanently remove all your
                      data, including order history, rewards, and personal
                      information from our systems.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded text-red-600"
                      />
                      <span className="text-gray-700">
                        I understand that this action is irreversible
                      </span>
                    </label>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded text-red-600"
                      />
                      <span className="text-gray-700">
                        I understand that all my data will be permanently
                        deleted
                      </span>
                    </label>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded text-red-600"
                      />
                      <span className="text-gray-700">
                        I want to proceed with deleting my account
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete My Account
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
