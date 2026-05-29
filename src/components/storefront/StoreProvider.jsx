"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getProductById } from "@/lib/store-data";

const STORAGE_KEY = "mystic-commerce-store";

const StoreContext = createContext(null);

const initialState = {
  cartItems: [],
  wishlistIds: [],
  isHydrated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return {
        cartItems: Array.isArray(action.payload?.cartItems) ? action.payload.cartItems : [],
        wishlistIds: Array.isArray(action.payload?.wishlistIds) ? action.payload.wishlistIds : [],
        isHydrated: true,
      };
    case "addToCart": {
      const { productId, variantId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { productId, variantId, quantity }],
      };
    }
    case "updateQuantity":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.productId === action.payload.productId && item.variantId === action.payload.variantId
              ? { ...item, quantity: action.payload.quantity }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "removeFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId),
        ),
      };
    case "toggleWishlist":
      return {
        ...state,
        wishlistIds: state.wishlistIds.includes(action.payload.productId)
          ? state.wishlistIds.filter((id) => id !== action.payload.productId)
          : [...state.wishlistIds, action.payload.productId],
      };
    case "clearCart":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: "hydrate", payload: JSON.parse(stored) });
        return;
      }
    } catch {
    }

    dispatch({ type: "hydrate", payload: initialState });
  }, []);

  useEffect(() => {
    if (!state.isHydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cartItems: state.cartItems,
        wishlistIds: state.wishlistIds,
      }),
    );
  }, [state.cartItems, state.isHydrated, state.wishlistIds]);

  const value = useMemo(() => {
    const cartDetailedItems = state.cartItems
      .map((item) => {
        const product = getProductById(item.productId);

        if (!product) {
          return null;
        }

        return {
          ...item,
          product,
          variant: product.variants.find((variant) => variant.id === item.variantId) ?? product.variants[0],
          lineTotal: product.price * item.quantity,
        };
      })
      .filter(Boolean);

    const cartCount = cartDetailedItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartDetailedItems.reduce((total, item) => total + item.lineTotal, 0);

    return {
      cartItems: cartDetailedItems,
      cartCount,
      subtotal,
      wishlistIds: state.wishlistIds,
      wishlistCount: state.wishlistIds.length,
      isHydrated: state.isHydrated,
      addToCart(productId, variantId, quantity = 1) {
        dispatch({ type: "addToCart", payload: { productId, variantId, quantity } });
      },
      updateQuantity(productId, variantId, quantity) {
        dispatch({ type: "updateQuantity", payload: { productId, variantId, quantity } });
      },
      removeFromCart(productId, variantId) {
        dispatch({ type: "removeFromCart", payload: { productId, variantId } });
      },
      toggleWishlist(productId) {
        dispatch({ type: "toggleWishlist", payload: { productId } });
      },
      clearCart() {
        dispatch({ type: "clearCart" });
      },
      isWishlisted(productId) {
        return state.wishlistIds.includes(productId);
      },
    };
  }, [state.cartItems, state.isHydrated, state.wishlistIds]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
