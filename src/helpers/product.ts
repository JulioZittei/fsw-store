import { Product } from "@prisma/client";

export interface ProductWithBlurDataUrl extends Product {
  blurDataUrls: string[];
}

export interface ProductWithTotalPrice extends ProductWithBlurDataUrl {
  totalPrice: number;
}

export const calculateProductTotalPrice = (
  product: ProductWithBlurDataUrl,
): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.price),
    };
  }
  const discount =
    Number(product.price) * Number(product.discountPercentage / 100);
  const totalPrice = Number(product.price) - discount;

  return {
    ...product,
    totalPrice,
  };
};
