// src/Components/productcard.jsx
import React, { createContext, useContext, useState } from "react";

// Creating the Cart Context
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Dummy Product Data (for this simulation)
  const dummyProducts = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
    { id: 4, name: "Product 4", price: 400 },
  ];

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Function to place the order
  const placeOrder = () => {
    setOrders((prev) => [
      ...prev,
      { items: cart, total: cart.reduce((total, item) => total + item.price * item.quantity, 0) },
    ]);
    setCart([]); // Clear the cart after placing the order
    alert("✅ Order placed successfully!");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        placeOrder,
        dummyProducts,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;