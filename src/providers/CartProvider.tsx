"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { Product, CartProduct } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface CartContextProps {
  cartItems: CartProduct[];
  addToCart: (product: Product) => void;
  getTotalQuantity: () => number;
  removeFromCart: (product: CartProduct) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  getTotalQuantity: () => 0,
  removeFromCart: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data == null) {
      setCartItems([]);
    } else {
      setCartItems(JSON.parse(data));
    }
  }, []);

  const addToCart = (product: Product) => {
    // first check if you have the same product in the cart
    let containsProduct = cartItems.some(
      (cartItem) => cartItem.id === product.id,
    );

    let newCartItems = [...cartItems];

    // if you do, then update the quantity
    if (containsProduct) {
      newCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === product.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }

        return cartItem;
      });
    } else {
      // if you don't, then add the product to the cart
      newCartItems = [...cartItems, { ...product, quantity: 1 }];
    }

    try {
      setCartItems(newCartItems);
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    } catch (err) {
      console.error(err);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Error adding product to cart",
      });
    } finally {
      toast({
        title: "Added to cart",
        description: `${product.name} added to cart`,
      });
    }
  };

  const removeFromCart = (item: CartProduct) => {
    const newCartItems = cartItems.filter((cartItem) => {
      return cartItem.id !== item.id;
    });
    try {
      setCartItems(newCartItems);
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error removing product from cart",
      });
    } finally {
      toast({
        title: "Removed from cart",
        description: `${item.name} removed from cart`,
      });
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error clearing cart",
      });
    } finally {
      toast({
        title: "Cleared cart",
        description: `Cleared cart`,
      });
    }
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const contextValue: CartContextProps = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export { CartProvider, useCartContext };
