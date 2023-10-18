import { Product } from "@prisma/client";

interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export const calculateProductTotalPrice = (
  product: Product,
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
