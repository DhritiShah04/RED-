import React, { useState } from 'react';
import config from '../config.js';

const CreateProductForm = ({ onSubmit, sellerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
    ecoRating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      ecoRating: parseInt(formData.ecoRating),
      sellerId
    };

    try {
      const response = await fetch(`${config.API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // If using JWT
        },
        body: JSON.stringify(productData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ Product created successfully!');
        setFormData({
          name: '', description: '', price: '', quantity: '', image: '', ecoRating: ''
        });
        if (onSubmit) onSubmit();
      } else {
        alert('❌ Error: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Add New Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Product Description"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Stock Quantity"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.image}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="ecoRating"
        placeholder="Eco Rating (1-5)"
        min="1"
        max="5"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.ecoRating}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
