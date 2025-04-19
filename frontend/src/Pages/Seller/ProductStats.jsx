import React from "react";
import NavbarSell from "../../Components/NavbarSell";
import Footer from "../../Components/Footer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const downloadPDF = (type, productList) => {
  const doc = new jsPDF();
  const title = type === "product" ? "Product Report" : "Revenue Report";

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  if (type === "product") {
    const headers = [["Name", "EcoScore", "Avg Feedback", "Category", "Tags"]];
    const data = productList.map((p) => [
      p.name,
      p.ecoScore,
      p.avgFeedback,
      p.category,
      p.tags.join(", "),
    ]);
    autoTable(doc, { startY: 30, head: headers, body: data });
  } else {
    const headers = [["Name", "Price", "Sold", "Stock", "Revenue"]];
    const data = productList.map((p) => [
      p.name,
      `₹${p.price}`,
      p.sold,
      p.stock,
      `₹${p.price * p.sold}`,
    ]);
    autoTable(doc, { startY: 30, head: headers, body: data });
  }

  doc.save(`${title.replace(" ", "_").toLowerCase()}.pdf`);
};

const ProductStats = () => {
  const productList = [
    {
      name: "Reusable Bamboo Straw",
      ecoScore: 4.2,
      price: 99,
      stock: 300,
      sold: 150,
      avgFeedback: 4.3,
      category: "Accessories",
      tags: ["Biodegradable", "Zero Waste", "Plastic-Free"],
    },
    {
      name: "Biodegradable Phone Case",
      ecoScore: 4.6,
      price: 499,
      stock: 80,
      sold: 20,
      avgFeedback: 4.4,
      category: "Accessories",
      tags: ["Biodegradable", "Recyclable"],
    },
    {
      name: "Recycled Tote Bag",
      ecoScore: 4.4,
      price: 199,
      stock: 200,
      sold: 180,
      avgFeedback: 4.7,
      category: "Bags",
     
      tags: ["Reused Materials", "Recyclable", "Green Packaging"],
    },
    {
      name: "Organic Cotton T-Shirt",
      ecoScore: 4.7,
      price: 599,
      stock: 150,
      sold: 130,
      avgFeedback: 4.8,
      category: "Clothing",
      
      tags: ["Low Carbon Footprint", "Local Purchase", "Biodegradable"],
    },
  ];

  const tagColors = {
    "Plastic-Free": "bg-green-100 text-green-800",
    Reusable: "bg-blue-100 text-blue-800",
    Recyclable: "bg-yellow-100 text-yellow-800",
    Biodegradable: "bg-lime-100 text-lime-800",
    "Zero Waste": "bg-pink-100 text-pink-800",
    "Reused Materials": "bg-purple-100 text-purple-800",
    "Green Packaging": "bg-cyan-100 text-cyan-800",
    "Low Carbon Footprint": "bg-orange-100 text-orange-800",
    "Local Purchase": "bg-teal-100 text-teal-800",
  };

  const totalProducts = productList.length;
  const ecoScoreAvg = (productList.reduce((sum, p) => sum + p.ecoScore, 0) / totalProducts).toFixed(2);
  const avgFeedback = (productList.reduce((sum, p) => sum + p.avgFeedback, 0) / totalProducts).toFixed(2);
  const avgPrice = Math.round(productList.reduce((sum, p) => sum + p.price, 0) / totalProducts);
  const mostExpensive = productList.reduce((prev, curr) => (curr.price > prev.price ? curr : prev));
  const cheapest = productList.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
  

  return (
    <div className="bg-gradient-to-br from-green-50 to-white min-h-screen">
      <NavbarSell />

      <div className="container mx-auto py-10 px-4">
      <p className="pb-4 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-600 to-yellow-500 drop-shadow-lg tracking-wide">
            Statistics
          </p>  
        <div className="w-32 h-1 mt-4 mx-auto bg-gradient-to-r from-green-500 to-lime-400 rounded-full animate-pulse"></div>

        {/* Stats Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-3 h-96 w-[1300px] ml-20 mt-12 mb-16">
          <StatCard title="🛍 Total Products" value={totalProducts} />
          <StatCard title="🌿 Avg. EcoScore" value={ecoScoreAvg} />
          <StatCard title="⭐ Avg. Feedback" value={avgFeedback} />
          <StatCard title="💸 Avg. Price" value={`₹${avgPrice}`} />
          <StatCard title="🏆 Most Expensive" value={`${mostExpensive.name} (₹${mostExpensive.price})`} />
          <StatCard title="💰 Cheapest" value={`${cheapest.name} (₹${cheapest.price})`} />
        </div>

        {/* Product Listing */}
        <DataSection title="🛒 Product Listing">
          <Table
            headers={["Product", "EcoScore", "Avg. Feedback", "Category", "Tags"]}
            rows={productList.map((product, index) => (
              <tr
                key={index}
                className="bg-[#f9f9f9] hover:scale-[1.02] hover:shadow-lg transition-all duration-300 rounded-xl text-[#1F2421]"
              >
                <td className="p-4 font-semibold">{product.name}</td>
                <td className="p-4">{product.ecoScore}</td>
                <td className="p-4">{product.avgFeedback}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[tag] || "bg-gray-100 text-gray-800"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          />
        </DataSection>

        {/* Revenue Report */}
        <DataSection title="📈 Revenue Report">
          <Table
            headers={["Product", "Price", "Sold", "Stock", "Revenue"]}
            rows={productList.map((product, index) => (
              <tr
                key={index}
                className="bg-[#f9f9f9] hover:scale-[1.02] hover:shadow-lg transition-all duration-300 rounded-xl text-[#1F2421]"
              >
                <td className="p-4 font-semibold">{product.name}</td>
                <td className="p-4">{`₹${product.price}`}</td>
                <td className="p-4">{product.sold}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">{`₹${product.price * product.sold}`}</td>
              </tr>
            ))}
          />
        </DataSection>

        {/* Download Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <button
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300"
            onClick={() => downloadPDF("product", productList)}
          >
            📄 Download Product Report
          </button>
          <button
            className="bg-amber-400 hover:bg-amber-500 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300"
            onClick={() => downloadPDF("revenue", productList)}
          >
            📊 Download Revenue Report
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white border border-lime-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl p-6 text-center">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-2xl font-bold text-emerald-600 mt-2">{value}</p>
  </div>
);

const DataSection = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-2xl p-8 mb-10">
    <h2 className="text-2xl font-semibold text-emerald-700 mb-6">{title}</h2>
    <div className="overflow-x-auto">{children}</div>
  </div>
);

const Table = ({ headers, rows }) => (
  <table className="min-w-full text-left border-spacing-y-3">
    <thead className="text-[#1B4332] uppercase text-sm tracking-widest">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="p-3">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{rows}</tbody>
  </table>
);

export default ProductStats;
