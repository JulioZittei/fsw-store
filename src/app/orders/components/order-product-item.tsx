import {
  ProductWithBlurDataUrl,
  calculateProductTotalPrice,
} from "@/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderItem: Prisma.OrderItemGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderItem }: OrderProductItemProps) => {
  const productWithTotalPrice = calculateProductTotalPrice(
    orderItem.product as ProductWithBlurDataUrl,
  );

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderItem.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
          alt={orderItem.product.name}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="flex w-fit rounded-md bg-accent px-3 py-1">
          <p className="text-[10px]">
            Vendido e entregue por <span className="font-bold">FSW Store</span>
          </p>
        </div>

        <p className="text-xs">{orderItem.product.name}</p>

        <div className="flex w-full items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
              R$ {productWithTotalPrice.totalPrice.toFixed(2)}
            </p>

            {productWithTotalPrice.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                R$ {Number(productWithTotalPrice.price).toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-xs opacity-60">Qntd: {orderItem.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
