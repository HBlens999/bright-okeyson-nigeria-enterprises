import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { CartItemReference, Product } from '../types/database';
import { getStoredCart, saveStoredCart, clearStoredCart } from '../utils/cart';
import { getProductsByIds } from '../services/dataService';

export interface CartItemWithProduct {
  productId: string;
  quantity: number;
  product: Product;
}

interface CartContextValue {
  items: CartItemReference[];
  cartItemsWithProducts: CartItemWithProduct[];
  totalItemCount: number;
  loading: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  refreshCartProducts: () => Promise<void>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  cartItemsWithProducts: [],
  totalItemCount: 0,
  loading: false,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  refreshCartProducts: async () => {},
  isDrawerOpen: false,
  setIsDrawerOpen: () => {}
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItemReference[]>(() => getStoredCart());
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    saveStoredCart(items);
  }, [items]);

  // Re-fetch product details when item list changes
  const refreshCartProducts = useCallback(async () => {
    if (items.length === 0) {
      setCartProducts([]);
      return;
    }
    setLoading(true);
    try {
      const ids = items.map((i) => i.productId);
      const fetched = await getProductsByIds(ids);
      setCartProducts(fetched);
    } catch (err) {
      console.error('Error refreshing cart products:', err);
    } finally {
      setLoading(false);
    }
  }, [items]);

  useEffect(() => {
    refreshCartProducts();
  }, [items, refreshCartProducts]);

  const addItem = (productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCartProducts([]);
    clearStoredCart();
  };

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Match items with fresh fetched product definitions
  const cartItemsWithProducts: CartItemWithProduct[] = items
    .map((item) => {
      const prod = cartProducts.find((p) => p.id === item.productId);
      if (!prod) return null;
      return {
        productId: item.productId,
        quantity: item.quantity,
        product: prod
      };
    })
    .filter((item): item is CartItemWithProduct => item !== null);

  return (
    <CartContext.Provider
      value={{
        items,
        cartItemsWithProducts,
        totalItemCount,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        refreshCartProducts,
        isDrawerOpen,
        setIsDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
