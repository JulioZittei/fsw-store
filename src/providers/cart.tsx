"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends Product {
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
