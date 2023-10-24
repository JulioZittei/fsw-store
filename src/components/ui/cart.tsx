import { Badge } from "./badge";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);

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
        {products.map((product) => (
          <li key={product.id}>
            <CartItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Cart };
