import { Badge } from "./badge";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./cart-item";
import { Separator } from "./separator";

const Cart = () => {
  const { products, subTotal, totalPrice, totalDiscount } =
    useContext(CartContext);

  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCart />
        Carrinho
      </Badge>

      <ul className="flex flex-col gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <CartItem product={product} />
            </li>
          ))
        ) : (
          <p className="text-center font-semibold">Carrinho vazio =[</p>
        )}
      </ul>

      <div className="flex flex-col gap-3">
        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>
            {subTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p className="uppercase">Grátis</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Total de Desconto</p>
          <p>
            {totalDiscount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-sm">
          <p className="font-bold">Total</p>
          <p className="font-bold">
            {totalPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Cart };
