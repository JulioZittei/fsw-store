import { CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { Minus, Plus, Trash } from "lucide-react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            className="max-h=[70%] h-auto w-auto max-w-[80%]"
            src={product.imageUrls[0]}
            width={0}
            height={0}
            quality={95}
            sizes="100vw"
            alt={product.name}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-xs">{product.name}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold">
            {product.totalPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          {product.discountPercentage > 0 && (
            <p className="text-xs line-through opacity-75">
              {Number(product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="h-8 w-8">
            <Minus size={16} />
          </Button>

          <span className="text-xs">{product.quantity}</span>

          <Button size="icon" variant="outline" className="h-8 w-8">
            <Plus size={16} />
          </Button>
        </div>
      </div>

      <Button size="icon" variant="outline">
        <Trash size={16} />
      </Button>
    </div>
  );
};

export { CartItem };
