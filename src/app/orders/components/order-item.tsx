"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { OrderStatus, Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import {
  ProductWithBlurDataUrl,
  calculateProductTotalPrice,
} from "@/helpers/product";
import { getOrderStatus } from "../helpers/status";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderItems: {
        include: { product: true };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderItems.reduce((acc, orderProduct) => {
      return acc + Number(orderProduct.product.price) * orderProduct.quantity;
    }, 0);
  }, [order.orderItems]);

  const total = useMemo(() => {
    return order.orderItems.reduce((acc, product) => {
      const productWithTotalPrice = calculateProductTotalPrice(
        product.product as ProductWithBlurDataUrl,
      );

      return acc + productWithTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderItems]);

  const totalDiscounts = subtotal - total;

  const handleSendToChekout = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

    stripe?.redirectToCheckout({
      sessionId: order.checkoutId!,
    });
  };

  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-sm font-bold uppercase">Pedido: {order.id}</p>

              <span className="text-xs opacity-60">
                {order.orderItems.length} produto(s)
              </span>
              <span className="text-xs opacity-60">
                {format(order.createdAt, "d/MM/y 'às' HH:mm")}
              </span>

              <span className="text-xs opacity-60"></span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162FF]">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>

              {order.orderItems.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderItem={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Entrega</p>
                  <p>GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Descontos</p>
                  <p>-R$ {totalDiscounts.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 text-sm font-bold">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>

                {order.status === OrderStatus.WAITING_FOR_PAYMENT && (
                  <Button onClick={handleSendToChekout}>Pagar agora</Button>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
