import { Badge } from "./badge";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./cart-item";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { createOrder, updateOrderWith } from "@/actions/order";

const Cart = () => {
  const { data } = useSession();
  const { products, subTotal, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data) {
      signIn();
      return;
    }

    const order = await createOrder(products, data.user.id as string);
    const checkout = await createCheckout(products, order.id);
    await updateOrderWith(order.id, checkout.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });

    clearCart();
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCart />
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <ul className="flex h-full flex-col gap-8">
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
        </ScrollArea>
      </div>

      {products.length > 0 && (
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
            <p>Descontos</p>
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

          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export { Cart };
