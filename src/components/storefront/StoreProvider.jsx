"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getProductById } from "@/lib/store-data";

const STORAGE_KEY = "mystic-commerce-store";

const StoreContext = createContext(null);

const initialState = {
  cartItems: [],
  wishlistIds: [],
  reviewsByProduct: {},
  isHydrated: false,
};

function normalizeReviews(payload) {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(payload)
      .filter(([, reviews]) => Array.isArray(reviews))
      .map(([productId, reviews]) => [
        productId,
        reviews.filter((review) => review && typeof review === "object"),
      ]),
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return {
        cartItems: Array.isArray(action.payload?.cartItems) ? action.payload.cartItems : [],
        wishlistIds: Array.isArray(action.payload?.wishlistIds) ? action.payload.wishlistIds : [],
        reviewsByProduct: normalizeReviews(action.payload?.reviewsByProduct),
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
    case "addReview": {
      const productId = String(action.payload.productId);
      const productReviews = state.reviewsByProduct[productId] ?? [];

      return {
        ...state,
        reviewsByProduct: {
          ...state.reviewsByProduct,
          [productId]: [action.payload.review, ...productReviews],
        },
      };
    }
    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const syncedUserIdRef = useRef(null);

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
        reviewsByProduct: state.reviewsByProduct,
      }),
    );
  }, [state.cartItems, state.isHydrated, state.reviewsByProduct, state.wishlistIds]);

  useEffect(() => {
    if (!state.isHydrated || !user?.id || syncedUserIdRef.current === user.id) {
      return;
    }

    let isMounted = true;

    async function syncServerState() {
      try {
        const [cartResponse, wishlistResponse] = await Promise.all([
          fetch("/api/cart", { credentials: "include" }),
          fetch("/api/wishlist", { credentials: "include" }),
        ]);

        if (!cartResponse.ok || !wishlistResponse.ok) {
          syncedUserIdRef.current = user.id;
          return;
        }

        const cartData = await cartResponse.json();
        const wishlistData = await wishlistResponse.json();

        if (!isMounted) {
          return;
        }

        const mergedCart = [...(cartData.cart?.items ?? [])];
        state.cartItems.forEach((item) => {
          const existing = mergedCart.find(
            (serverItem) => serverItem.productId === item.productId && serverItem.variantId === item.variantId,
          );
          if (existing) {
            existing.quantity = Math.max(existing.quantity, item.quantity);
          } else {
            mergedCart.push(item);
          }
        });

        const mergedWishlist = Array.from(new Set([...(wishlistData.wishlist ?? []), ...state.wishlistIds]));

        dispatch({ type: "hydrate", payload: { ...state, cartItems: mergedCart, wishlistIds: mergedWishlist } });

        await Promise.all([
          fetch("/api/cart", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: mergedCart }),
          }),
          fetch("/api/wishlist", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productIds: mergedWishlist }),
          }),
        ]);
      } catch {
      } finally {
        if (isMounted) {
          syncedUserIdRef.current = user.id;
        }
      }
    }

    syncServerState();

    return () => {
      isMounted = false;
    };
  }, [state, user?.id]);

  const persistCart = useCallback(async (cartItems) => {
    if (!user?.id) {
      return;
    }

    try {
      await fetch("/api/cart", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
    } catch {
    }
  }, [user?.id]);

  const persistWishlist = useCallback(async (wishlistIds) => {
    if (!user?.id) {
      return;
    }

    try {
      await fetch("/api/wishlist", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: wishlistIds }),
      });
    } catch {
    }
  }, [user?.id]);

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
        const existingItem = state.cartItems.find(
          (item) => item.productId === productId && item.variantId === variantId,
        );

        const nextCartItems = existingItem
          ? state.cartItems.map((item) =>
              item.productId === productId && item.variantId === variantId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [...state.cartItems, { productId, variantId, quantity }];

        dispatch({ type: "hydrate", payload: { ...state, cartItems: nextCartItems } });
        persistCart(nextCartItems);
      },
      updateQuantity(productId, variantId, quantity) {
        const nextCartItems = state.cartItems
          .map((item) =>
            item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
          )
          .filter((item) => item.quantity > 0);

        dispatch({ type: "hydrate", payload: { ...state, cartItems: nextCartItems } });
        persistCart(nextCartItems);
      },
      removeFromCart(productId, variantId) {
        const nextCartItems = state.cartItems.filter(
          (item) => !(item.productId === productId && item.variantId === variantId),
        );

        dispatch({ type: "hydrate", payload: { ...state, cartItems: nextCartItems } });
        persistCart(nextCartItems);
      },
      toggleWishlist(productId) {
        const nextWishlistIds = state.wishlistIds.includes(productId)
          ? state.wishlistIds.filter((id) => id !== productId)
          : [...state.wishlistIds, productId];

        dispatch({ type: "hydrate", payload: { ...state, wishlistIds: nextWishlistIds } });
        persistWishlist(nextWishlistIds);
      },
      clearCart() {
        dispatch({ type: "hydrate", payload: { ...state, cartItems: [] } });
        persistCart([]);
      },
      isWishlisted(productId) {
        return state.wishlistIds.includes(productId);
      },
      addReview(productId, review) {
        dispatch({
          type: "addReview",
          payload: {
            productId,
            review: {
              id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              createdAt: new Date().toISOString(),
              ...review,
            },
          },
        });
      },
      getProductReviews(productId) {
        return state.reviewsByProduct[String(productId)] ?? [];
      },
      getProductReviewStats(productId) {
        const reviews = state.reviewsByProduct[String(productId)] ?? [];
        const average = reviews.length
          ? reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / reviews.length
          : 0;

        return {
          average,
          count: reviews.length,
        };
      },
      getAllReviews() {
        return Object.entries(state.reviewsByProduct)
          .flatMap(([productId, reviews]) =>
            reviews.map((review) => ({
              ...review,
              productId,
              product: getProductById(productId),
            })),
          )
          .filter((review) => review.product)
          .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
      },
    };
  }, [persistCart, persistWishlist, state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
