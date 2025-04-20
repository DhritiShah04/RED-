import { createContext, useContext, useState, useEffect } from "react";
import config from '../config.js';

// Create a context for cart functionality
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if product already exists
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Place order function
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Assuming you store userId
      
      // Calculate total amount
      const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity, 
        0
      );
      
      const orderData = {
        buyer_id: userId,
        total_amount: totalAmount,
        status: "pending"
      };
      
      const response = await fetch(`${config.API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error("Failed to place order");
      }
      
      // Clear cart after successful order
      setCart([]);
      alert("Order placed successfully!");
      
      return await response.json();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      placeOrder 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};