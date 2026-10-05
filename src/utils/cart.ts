import { CartItemReference } from '../types/database';

const CART_STORAGE_KEY = 'bo_lightweight_cart_v1';

export function getStoredCart(): CartItemReference[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item) => item && typeof item.productId === 'string' && typeof item.quantity === 'number')
        .map((item) => ({
          productId: item.productId,
          quantity: Math.max(1, Math.floor(item.quantity))
        }));
    }
    return [];
  } catch (err) {
    console.error('Failed to read lightweight cart from localStorage:', err);
    return [];
  }
}

export function saveStoredCart(items: CartItemReference[]): void {
  try {
    // Only store minimal references
    const minimal = items.map((item) => ({
      productId: item.productId,
      quantity: Math.max(1, item.quantity)
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimal));
  } catch (err) {
    console.error('Failed to save lightweight cart to localStorage:', err);
  }
}

export function clearStoredCart(): void {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear cart storage:', err);
  }
}
