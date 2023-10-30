"use server";

import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";

const createOrder = async (cartProducts: CartProduct[], userId: string) => {
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderItems: {
        createMany: {
          data: cartProducts.map((product) => ({
            price: product.price,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    },
  });

  return order;
};

const updateOrderWith = async (orderId: string, checkoutId: string) => {
  const order = await prismaClient.order.update({
    where: {
      id: orderId,
    },
    data: {
      checkoutId,
    },
  });

  return order;
};

export { createOrder, updateOrderWith };
