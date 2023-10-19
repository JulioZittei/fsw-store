import { ProductWithTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          placeholder="empty"
          alt={product.name}
          style={{
            objectFit: "contain",
          }}
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[2px] ">
            <ArrowDownIcon size={14} />
            {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>
        <div className="flex items-center justify-center gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                {product.totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                {Number(product.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </>
          ) : (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
              {Number(product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductItem };
