"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface CartContext {
  products: CartProduct[];
  totalPrice: number;
  subTotal: number;
  totalDiscount: number;
  cartSize: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CART_KEY = "@fsw-store:cart";

const CartContext = createContext<CartContext>({
  products: [],
  totalPrice: 0,
  subTotal: 0,
  totalDiscount: 0,
  cartSize: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(products));
  }, [products]);

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.totalPrice) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = (subTotal - totalPrice) * -1;

  const cartSize = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity:
                cartProduct.quantity + product.quantity > 99
                  ? 99
                  : cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
    } else {
      setProducts((prev) => [...prev, product]);
    }
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }

          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return cartProduct.quantity === 99
            ? cartProduct
            : {
                ...cartProduct,
                quantity: cartProduct.quantity + 1,
              };
        }

        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const clearCart = () => {
    setProducts((prev) => []);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        totalPrice,
        subTotal,
        totalDiscount,
        cartSize,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
export type { CartProduct };
