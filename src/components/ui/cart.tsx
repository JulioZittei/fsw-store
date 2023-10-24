import { CATEGORY_ICON } from "@/constants/category-icon";
import { Badge } from "./badge";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div>
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCart />
        Carrinho
      </Badge>

      {products.map((product) => (
        <p key={product.name}>{product.name}</p>
      ))}
    </div>
  );
};

export { Cart };
