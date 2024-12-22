import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // User Authentication State
  const [token, setToken] = useState(localStorage.getItem('token')); // Token state
  const [user, setUser] = useState(null); // User information
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Cart State
  const [cart, setCart] = useState(null); // Cart information
  const [cartLoading, setCartLoading] = useState(true); // Cart loading state
  const [cartError, setCartError] = useState(null); // Cart error state

  // Function to load user information
  const loadUser = async (currentToken) => {
    if (!currentToken) {
      setUser(null);
      setLoading(false);
      setCart(null);
      setCartLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://host.docker.internal:3000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error('User loading error:', err);
      setUser(null);
      setError(err.response?.data?.message || 'Error loading user information.');
      localStorage.removeItem('token'); // Remove invalid token
      setToken(null); // Reset token
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the cart
  const fetchCart = async (currentToken) => {
    if (!currentToken) {
      setCart(null);
      setCartLoading(false);
      return;
    }

    try {
      setCartLoading(true);
      const response = await axios.get('http://host.docker.internal:3000/api/cart', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setCart(response.data);
    } catch (err) {
      console.error('Cart fetching error:', err);
      setCart(null);
      setCartError(err.response?.data?.message || 'Error fetching cart.');
    } finally {
      setCartLoading(false);
    }
  };

  // Function to add an item to the cart
  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      setCartError('You must be logged in to add items to the cart.');
      return;
    }

    try {
      const response = await axios.post(
        'http://host.docker.internal:3000/api/cart/add',
        { productId, quantity },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data);
      setCartError(null);
    } catch (err) {
      console.error('Add to cart error:', err);
      setCartError(err.response?.data?.message || 'Error adding item to cart.');
    }
  };

  // Function to update cart item quantity
  const updateCartItem = async (productId, quantity) => {
    if (!token) {
      setCartError('You must be logged in to update the cart.');
      return;
    }

    try {
      const response = await axios.put(
        'http://host.docker.internal:3000/api/cart/update',
        { productId, quantity },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data);
      setCartError(null);
    } catch (err) {
      console.error('Update cart error:', err);
      setCartError(err.response?.data?.message || 'Error updating cart.');
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = async (productId) => {
    if (!token) {
      setCartError('You must be logged in to remove items from the cart.');
      return;
    }

    try {
      const response = await axios.delete('http://host.docker.internal:3000/api/cart/remove', {
        data: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
      setCartError(null);
    } catch (err) {
      console.error('Remove from cart error:', err);
      setCartError(err.response?.data?.message || 'Error removing item from cart.');
    }
  };

  // Function to clear the cart (optional)
  const clearCart = () => {
    setCart(null);
  };

  // Function to handle token updates
  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  // Function to logout the user
  const logout = () => {
    handleSetToken(null);
    setUser(null);
    setCart(null);
  };

  // Effect to load user and cart when token changes
  useEffect(() => {
    loadUser(token);
    if (token) {
      fetchCart(token);
    } else {
      setCart(null);
      setCartLoading(false);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        // User authentication state and functions
        user,
        loading,
        error,
        setToken: handleSetToken,
        logout,

        // Cart state and functions
        cart,
        cartLoading,
        cartError,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart, // Expose fetchCart if needed elsewhere
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
