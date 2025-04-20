import React, { useState, useEffect } from "react";
import { BadgeCheck } from "lucide-react";
import axios from "axios";
import NavbarSell from "../../Components/NavbarSell";
import config from "../../config.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  ShoppingBag,
  Package,
  LineChart as LineChartIcon,
  Leaf,
  User,
  Mail,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

const ecoIcons = ["🌱", "🍀", "🌿", "🌍", "🪴"];

const Dashboard = () => {
  const [selectedIcon] = useState(ecoIcons[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState({
    productCount: 0,
    totalStockQuantity: 0,
    totalRevenue: 0,
  });

  const StatCard = ({ icon, label, value, className = "" }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={`bg-white shadow-lg h-70 w-96 px-8 py-10 rounded-2xl border-2 border-green-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-[32%] h-[160px] flex flex-col justify-center ${className}`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-[#2e7d32] text-3xl">{icon}</div>
        <div>
          <p className="text-md font-semibold text-[#388e3c]">{label}</p>
          <p className="text-2xl font-bold text-[#1F2421]">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  const monthlySalesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 700 },
    { month: "May", sales: 450 },
    { month: "June", sales: 100 },
    { month: "July", sales: 320 },
    { month: "Aug", sales: 140 },
    { month: "Sept", sales: 463 },
    { month: "Oct", sales: 361 },
    { month: "Nov", sales: 510 },
    { month: "Dec", sales: 809 },
  ];

  const dailySalesData = Array.from({ length: 30 }, (_, i) => ({
    date: `Apr ${i + 1}`,
    sales: Math.floor(Math.random() * 100),
  }));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("seller_id");

    const fetchData = async () => {
      return axios.get(`${config.API_BASE_URL}/sellers/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    };

    const fetchTotalProducts = async () => {
      return axios.get(`${config.API_BASE_URL}/products/total/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    };

    const fetchTotalRevenue = async () => {
      return axios.get(`${config.API_BASE_URL}/products/totalrevenue/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    };

    Promise.all([fetchData(), fetchTotalProducts(), fetchTotalRevenue()])
      .then(([sellerRes, totalRes, revenueRes]) => {
        setData(sellerRes.data);
        setTotal({
          productCount: totalRes.data.product_count,
          totalStockQuantity: totalRes.data.total_stock_quantity,
          totalRevenue: revenueRes.data.total_revenue,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavbarSell />
      <div className="bg-gray-50 min-h-screen font-['Poppins'] text-[#1F2421]">
        <div className="container mx-auto py-10 px-4">
          <p className="pb-4 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-600 to-yellow-500 drop-shadow-lg tracking-wide">
            Seller Dashboard
          </p>
          <div className="w-32 h-1 mt-4 mx-auto bg-gradient-to-r from-green-500 to-yellow-400 rounded-full animate-pulse"></div>

          {/* Seller Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="bg-white shadow-lg rounded-2xl p-8 mb-10 mt-8 border-2 border-gradient-to-r from-green-600 to-lime-500"
          >
            <h2 className="text-2xl font-semibold text-[#2e7d32] mb-6">
              🏢 Seller Info
            </h2>
            {loading ? (
              <p>Loading seller info...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-[#1F2421]">
                <p>
                  <BadgeCheck className="inline mr-2 text-[#43a047]" />
                  <strong>Seller ID:</strong> {data?.seller_id || "—"}
                </p>
                <p>
                  <User className="inline mr-2 text-[#43a047]" />
                  <strong>Name:</strong> {data?.seller_name || "—"}
                </p>
                <p>
                  <Mail className="inline mr-2 text-[#43a047]" />
                  <strong>Email:</strong> {data?.seller_email || "—"}
                </p>
                <p>
                  <Building2 className="inline mr-2 text-[#43a047]" />
                  <strong>Company:</strong> {data?.seller_company_name || "—"}
                </p>
                <p className="md:col-span-2">
                  <Leaf className="inline mr-2 text-[#43a047]" />
                  <strong>Description:</strong>{" "}
                  {data?.seller_company_description || "—"}
                </p>
              </div>
            )}
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <StatCard
              icon={<Package size={28} />}
              label="Total Products"
              value={total.productCount}
            />
            <StatCard
              icon={<ShoppingBag size={28} />}
              label="Items in Stock"
              value={total.totalStockQuantity}
            />
            <StatCard
              icon={<LineChartIcon size={28} />}
              label="Monthly Sales"
              value={total.totalRevenue}
            />
          </div>

          {/* Daily Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="bg-white shadow-lg rounded-2xl p-8 mb-10"
          >
            <h2 className="text-2xl font-semibold text-[#2e7d32] mb-6">
              📆 Daily Sales (April)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2e7d32"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="bg-white shadow-lg rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold text-[#2e7d32] mb-6">
              📊 Monthly Sales
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySalesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#66bb6a">
                  {monthlySalesData.map((_, i) => (
                    <Cell key={i} fill="#388e3c" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
