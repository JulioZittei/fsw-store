import {
  ProductWithBlurDataUrl,
  calculateProductTotalPrice,
} from "@/helpers/product";
import { ProductItem } from "./product-item";

interface ProductListProps {
  products: ProductWithBlurDataUrl[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={calculateProductTotalPrice(product)}
        />
      ))}
    </div>
  );
};

export { ProductList };
