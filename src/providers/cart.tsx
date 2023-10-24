"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface CartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartSubTotal: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
}

const CartContext = createContext<CartContext>({
  products: [],
  cartTotalPrice: 0,
  cartSubTotal: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
} as CartContext);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

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
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cartTotalPrice: 0,
        cartSubTotal: 0,
        cartTotalDiscount: 0,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
export type { CartProduct };
