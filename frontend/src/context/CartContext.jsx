import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mygeneportal_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mygeneportal_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (test) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === test.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === test.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...test, quantity: 1 }];
    });
  };

  const removeFromCart = (testId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== testId));
  };

  const updateQuantity = (testId, quantity) => {
    if (quantity < 1) {
      removeFromCart(testId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === testId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₹,]/g, ''));
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
