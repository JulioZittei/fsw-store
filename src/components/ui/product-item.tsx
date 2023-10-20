import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";
import staticBlurDataUrl from "@/util/staticBlurDataUrl";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
        <Image
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-cover"
          src={product.imageUrls[0]}
          width={136}
          height={119}
          sizes="136px"
          quality={95}
          placeholder="blur"
          blurDataURL={product.blurDataUrls[0] || staticBlurDataUrl()}
          alt={product.name}
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[2px] ">
            <ArrowDownIcon size={14} />
            {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </h3>
        <div className="flex items-center justify-start gap-2">
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
