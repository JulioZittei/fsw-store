"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiscountBadge } from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import {
  ArrowDownIcon,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Truck,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "name" | "price" | "description" | "discountPercentage" | "totalPrice"
  >;
}

const ProductInfo = ({
  product: { name, price, totalPrice, description, discountPercentage },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 99 ? prev : prev + 1));
  };

  return (
    <div className="flex flex-col px-5">
      <h1 className="text-lg">{name}</h1>
      <div className="flex items-center gap-2">
        <p>
          {totalPrice.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          })}
        </p>
        {discountPercentage > 0 && (
          <DiscountBadge>{discountPercentage}</DiscountBadge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-sm opacity-75">
          De:{" "}
          <span className="line-through">
            {Number(price).toLocaleString("pt-BR", {
              currency: "BRL",
              style: "currency",
            })}
          </span>
        </p>
      )}

      <div className="mt-4 flex items-center gap-4">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <Minus size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h2 className="font-bold">Descrição</h2>
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <Button className="mt-8 font-bold uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <Truck size={16} />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-semibold">FSPacket&reg;</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-semibold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
};

export { ProductInfo };
