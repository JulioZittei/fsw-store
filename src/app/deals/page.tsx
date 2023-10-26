import { Badge } from "@/components/ui/badge";
import { ProductItem } from "@/components/ui/product-item";
import { ProductList } from "@/components/ui/product-list";
import {
  ProductWithBlurDataUrl,
  calculateProductTotalPrice,
} from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import dynamicBlurDataUrl from "@/util/dynamicBlurDataUrl";
import { PercentIcon } from "lucide-react";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const productsWithBlurDataUrl = await Promise.all(
    deals?.map(async (product) => ({
      ...product,
      blurDataUrls: await Promise.all(
        product.imageUrls.map((image) => dynamicBlurDataUrl(image)),
      ),
    })),
  );

  const productsList = productsWithBlurDataUrl;

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge variant="heading">
        <PercentIcon size={16} />
        Ofertas
      </Badge>

      <ProductList products={productsList} />
    </div>
  );
};

export default DealsPage;
