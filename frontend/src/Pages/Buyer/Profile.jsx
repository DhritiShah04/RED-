import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";

const Profile = () => {
  const orders = [
    { id: 1, date: "2025-04-10", total: "$50.00", status: "Delivered" },
    { id: 2, date: "2025-04-05", total: "$120.00", status: "Shipped" },
    { id: 3, date: "2025-03-28", total: "$30.00", status: "Processing" },
  ];

  const [activeSection, setActiveSection] = useState("profile");
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Bamboo Toothbrush", image: "https://via.placeholder.com/100", price: "$3.99" },
    { id: 2, name: "Reusable Cotton Bag", image: "https://via.placeholder.com/100", price: "$6.49" },
  ]);

  const [user, setUser] = useState({
    ecoPoints: 6,
    rewardUnlocked: false,
  });

  const handleRemoveItem = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleCheckRewards = () => {
    const unlocked = user.ecoPoints >= 10;
    setUser((prev) => ({ ...prev, rewardUnlocked: unlocked }));
  };

  useEffect(() => {
    handleCheckRewards();
  }, [user.ecoPoints]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 font-sans">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-white/80 backdrop-blur-md shadow-md p-6 rounded-none md:rounded-r-3xl">
          <h2 className="text-2xl font-bold mb-8 text-green-600">👤 My Account</h2>
          <ul className="space-y-6">
            {["profile", "orders", "ecoRewards", "wishlist", "delete"].map((section) => (
              <li
                key={section}
                onClick={() => handleSectionClick(section)}
                className={`cursor-pointer capitalize px-4 py-2 rounded-xl transition-all duration-200 ${
                  activeSection === section
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "hover:text-green-500"
                }`}
              >
                {section === "ecoRewards" ? "Coupons" : section === "delete" ? "Delete Account" : section}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-6 md:p-10 space-y-10">
          {activeSection === "profile" && (
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-green-700">👤 Profile Details</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="font-medium">Full Name</p>
                  <p>Rishika</p>
                </div>
                <div>
                  <p className="font-medium">Mobile Number</p>
                  <p>9028802444</p>
                </div>
                <div>
                  <p className="font-medium">Email ID</p>
                  <p>- not added -</p>
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p>- not added -</p>
                </div>
                <div>
                  <p className="font-medium">Pin Code</p>
                  <p>- not added -</p>
                </div>
              </div>
              <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                Edit
              </button>
            </div>
          )}

          {activeSection === "orders" && (
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-green-700">📦 Order History</h3>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-green-100 text-left text-green-700">
                        <th className="py-2 px-4">Order ID</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Total</th>
                        <th className="py-2 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-t hover:bg-green-50">
                          <td className="py-2 px-4">{order.id}</td>
                          <td className="py-2 px-4">{order.date}</td>
                          <td className="py-2 px-4">{order.total}</td>
                          <td className="py-2 px-4">{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No orders placed yet.</p>
              )}
            </div>
          )}

          {activeSection === "ecoRewards" && (
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto mt-6">
              <h2 className="text-3xl font-bold text-green-800 mb-6 text-center flex items-center justify-center gap-2">
                <span>🌿</span> Rewards
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { name: "Eco-Friendly", tag: "eco-friendly", icon: "🌍" },
                  { name: "Plastic-Free", tag: "plastic-free", icon: "🚫🧴" },
                  { name: "Low Carbon Footprint", tag: "low carbon footprint", icon: "💨" },
                ].map((section) => {
                  const products = [
                    { name: "Bamboo Toothbrush", tags: ["eco-friendly", "biodegradable"] },
                    { name: "Reusable Water Bottle", tags: ["eco-friendly", "recyclable"] },
                    { name: "Cotton Bag", tags: ["plastic-free", "recyclable"] },
                    { name: "Glass Straws", tags: ["plastic-free", "eco-friendly"] },
                    { name: "Solar Lamp", tags: ["low carbon footprint", "eco-friendly"] },
                    { name: "Electric Car Charger", tags: ["low carbon footprint"] },
                    { name: "Biodegradable Plates", tags: ["biodegradable", "eco-friendly"] },
                    { name: "Compostable Bags", tags: ["biodegradable", "plastic-free"] },
                    { name: "Recycled Paper Notebook", tags: ["recyclable", "eco-friendly"] },
                    { name: "Recycled Plastic Water Bottle", tags: ["recyclable", "eco-friendly"] },
                  ];

                  const points = products.reduce((total, product) =>
                    product.tags.includes(section.tag) ? total + 1 : total, 0);

                  return (
                    <div
                      key={section.name}
                      className="bg-green-50 border border-green-100 p-5 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
                          <span>{section.icon}</span> {section.name}
                        </h3>
                        <span className="text-sm text-gray-600">{points} / 50 pts</span>
                      </div>
                      <div className="w-full bg-green-100 h-2 rounded-full mb-4">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(points / 50) * 100}%` }}
                        ></div>
                      </div>
                      <div className="p-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md text-sm text-center">
                        ⏳ Keep going! You're just <strong>{50 - points}</strong> points away from unlocking a reward in <strong>{section.name}</strong>.
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-5">
                {[
                  { name: "Biodegradable", tag: "biodegradable", icon: "🍃" },
                  { name: "Recycled", tag: "recyclable", icon: "♻" },
                ].map((section) => {
                  const products = [
                    { name: "Bamboo Toothbrush", tags: ["eco-friendly", "biodegradable"] },
                    { name: "Reusable Water Bottle", tags: ["eco-friendly", "recyclable"] },
                    { name: "Cotton Bag", tags: ["plastic-free", "recyclable"] },
                    { name: "Glass Straws", tags: ["plastic-free", "eco-friendly"] },
                    { name: "Solar Lamp", tags: ["low carbon footprint", "eco-friendly"] },
                    { name: "Electric Car Charger", tags: ["low carbon footprint"] },
                    { name: "Biodegradable Plates", tags: ["biodegradable", "eco-friendly"] },
                    { name: "Compostable Bags", tags: ["biodegradable", "plastic-free"] },
                    { name: "Recycled Paper Notebook", tags: ["recyclable", "eco-friendly"] },
                    { name: "Recycled Plastic Water Bottle", tags: ["recyclable", "eco-friendly"] },
                  ];

                  const points = products.reduce((total, product) =>
                    product.tags.includes(section.tag) ? total + 1 : total, 0);

                  return (
                    <div
                      key={section.name}
                      className="bg-green-50 border border-green-100 p-5 rounded-xl shadow-sm w-full max-w-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
                          <span>{section.icon}</span> {section.name}
                        </h3>
                        <span className="text-sm text-gray-600">{points} / 50 pts</span>
                      </div>
                      <div className="w-full bg-green-100 h-2 rounded-full mb-4">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(points / 50) * 100}%` }}
                        ></div>
                      </div>
                      <div className="p-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md text-sm text-center">
                        ⏳ Keep going! You're just <strong>{50 - points}</strong> points away from unlocking a reward in <strong>{section.name}</strong>.
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 bg-green-100 text-green-800 p-4 rounded-md text-center font-medium text-sm flex items-center justify-center gap-2">
                🧪 <span className="font-semibold">Your Impact:</span> You’re making sustainable choices across 5 categories. Keep going, green champ!
              </div>
            </div>
          )}

          {activeSection === "wishlist" && (
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-green-700">💚 My Wishlist</h3>
              {wishlistItems.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
              ) : (
                wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-4 mb-4 hover:shadow-lg transition"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-gray-500 text-sm">{item.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === "delete" && (
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-red-600 mb-4">⚠ Delete Account</h3>
              <p className="mb-4">Are you sure you want to delete your account? This action is irreversible.</p>
              <button className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                Delete Account
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
