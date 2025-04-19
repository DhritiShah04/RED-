import React, { useState } from "react";
import axios from "axios";
import { Leaf, ShieldCheck, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarSell from "../../Components/NavbarSell";
import config from '../../config.js';

const yesNoFields = [
  {
    label: "Is Your Product Recyclable?",
    name: "is_recyclable",
    icon: <Leaf size={16} />,
  },
  {
    label: "Is Your Product Biodegradable?",
    name: "is_biodegradable",
    icon: <Leaf size={16} />,
  },
  {
    label: "Is Your Product Reusable?",
    name: "is_reusable",
    icon: <PackageCheck size={16} />,
  },
  {
    label: "Does Your Product Use Organic Materials?",
    name: "uses_organic_materials",
    icon: <Leaf size={16} />,
  },
  {
    label: "Does Your Product Have Plastic Packaging?",
    name: "is_plastic_packaging",
    icon: <PackageCheck size={16} />,
  },
  {
    label: "Do you Have Certification for Your Product?",
    name: "is_certified",
    icon: <ShieldCheck size={16} />,
  },
];

const AddProduct = () => {
  const initialProductData = {
    product_name: "",
    product_short_description: "",
    product_description: "",
    durability: "",
    product_stock_quantity: "",
    product_price: "",
    is_recyclable: false,
    is_biodegradable: false,
    is_reusable: false,
    uses_organic_materials: false,
    is_plastic_packaging: false,
    is_certified: false,
    certification_image: null,
    images: [],
  };

  const [productData, setProductData] = useState(initialProductData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "product_images") {
        setProductData({ ...productData, images: Array.from(files) });
      } else if (name === "certification_image") {
        setProductData({ ...productData, certification_image: files[0] });
      }
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleYesNoClick = (name, value) => {
    setProductData((prev) => ({
      ...prev,
      [name]: value === "true" ? 1 : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const sellerId = localStorage.getItem("seller_id");

    const formattedProductData = { ...productData };
    const booleanFields = [
      "is_recyclable",
      "is_biodegradable",
      "is_reusable",
      "uses_organic_materials",
      "is_plastic_packaging",
      "is_certified",
    ];
    booleanFields.forEach((field) => {
      formattedProductData[field] = formattedProductData[field] === 1 ? 1 : 0;
    });

    const formData = new FormData();
    formData.append("seller_id", sellerId);

    for (const key in productData) {
      if (productData[key] instanceof FileList) {
        for (let i = 0; i < productData[key].length; i++) {
          formData.append("product_image_url", productData[key][i]);
        }
      } else if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config.API_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.status === 201) {
        setSubmitted(true);
        setProductData(initialProductData);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSubmitted(false);

  const yesNoButtonStyle = (selected, type) => {
    const base =
      "px-4 py-2 rounded-full text-sm transition-all duration-200 font-medium shadow-sm border";
    const hover =
      type === "yes" ? "hover:border-green-500" : "hover:border-red-700";

    return selected
      ? `${base} ${
          type === "yes"
            ? "bg-green-600 text-white border-green-600"
            : "bg-red-700 text-white border-red-700"
        }`
      : `${base} bg-white text-[#1F2421] border-gray-300 ${hover}`;
  };

  const renderCarousel = () => (
    <div className="flex space-x-4 overflow-x-auto py-2">
      {productData.images.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt={`Product ${index}`}
          className="w-32 h-32 object-cover rounded-lg"
        />
      ))}
    </div>
  );

  const sectionTitle = (text) => (
    <h3 className="text-xl font-semibold text-[#1F2421] border-b pb-1 mb-2">
      {text}
    </h3>
  );

  return (
    <>
      <NavbarSell />
      <div className="p-6 md:p-10 bg-[#F3F6F4] min-h-screen">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-green-500 p-10 space-y-10 transition duration-500 hover:scale-[1.01] hover:shadow-[0_0_40px_#4CAF50]">
          <h2 className="text-3xl font-bold text-[#216869]">🌱 Add New Product</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
            encType="multipart/form-data"
          >
            <div>
              {sectionTitle("📦 Basic Info")}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="product_name"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  placeholder="Product Name"
                  required
                />
                <input
                  type="text"
                  name="product_short_description"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  placeholder="Short Description"
                  required
                />
                <input
                  type="text"
                  name="durability"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  placeholder="Durability"
                  required
                />
                <input
                  type="number"
                  name="product_price"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  placeholder="Price (₹)"
                  required
                  min="1"
                />
                <input
                  type="number"
                  name="product_stock_quantity"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  placeholder="Quantity"
                  required
                  min="1"
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1F2421] mb-1">
                    Upload Product Photos
                  </label>
                  <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 p-6 text-center cursor-pointer">
                    <input
                      type="file"
                      name="product_images"
                      multiple
                      onChange={handleChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <span className="text-sm text-gray-600">
                        Click or drag images to upload
                      </span>
                    </label>
                  </div>
                  {productData.images.length > 0 && (
                    <div className="mt-4">{renderCarousel()}</div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <textarea
                    name="product_description"
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-gray-50"
                    placeholder="🌲 Describe your product and materials..."
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              {sectionTitle("🍃 Eco Attributes")}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {yesNoFields.map(({ label, name, icon }) => (
                  <div key={name}>
                    <div className="flex items-center gap-2 text-[#1F2421] mb-1 font-medium">
                      {icon}
                      {label}
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className={yesNoButtonStyle(
                          productData[name] === 1,
                          "yes"
                        )}
                        onClick={() => handleYesNoClick(name, "true")}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={yesNoButtonStyle(
                          productData[name] === 0,
                          "no"
                        )}
                        onClick={() => handleYesNoClick(name, "false")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {productData.is_certified === 1 && (
              <div>
                {sectionTitle("📜 Certification")}
                <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                  <input
                    type="file"
                    name="certification_image"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    id="certification-upload"
                  />
                  <label
                    htmlFor="certification-upload"
                    className="cursor-pointer text-sm text-center text-gray-600 block"
                  >
                    Click to upload certification image
                  </label>
                  {productData.certification_image && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(productData.certification_image)}
                        alt="Certification preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#216869] to-[#4CAF50] text-white px-10 py-3 rounded-full text-lg font-semibold shadow-md hover:from-[#1B594F] hover:to-[#3E9142] transition-all duration-300"
              >
                🌿 Add Product 🌿
              </button>
            </div>
          </form>
        </div>
      </div>

      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm text-center space-y-4">
            <h2 className="text-2xl font-semibold text-green-700">Product Added!</h2>
            <p className="text-gray-700">Your product has been successfully added.</p>
            <div className="space-y-2">
              <Link
                to="/seller/dashboard"
                className="block bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/seller/add-product"
                className="block bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Another Product
              </Link>
              <Link
                to="/seller/stats"
                className="block bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
              >
                View Stats
              </Link>
              <button
                onClick={closeModal}
                className="mt-2 text-sm text-gray-500 underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
