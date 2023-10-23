import { prismaClient } from "@/lib/prisma";
import { ProductImages } from "../components/product-images";
import { ProductInfo } from "../components/product-info";
import {
  ProductWithBlurDataUrl,
  calculateProductTotalPrice,
} from "@/helpers/product";
import categories from "@/app/(home)/components/categories";
import dynamicBlurDataUrl from "@/util/dynamicBlurDataUrl";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({
  params: { slug },
}: ProductDetailPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
  });

  const imageUrls = product?.imageUrls || [];

  const productWithBlurDataUrl = {
    ...product,
    blurDataUrls: await Promise.all(
      imageUrls.map((image) => dynamicBlurDataUrl(image)),
    ),
  } as ProductWithBlurDataUrl;

  if (!product) return null;
  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages
        imageUrls={product.imageUrls}
        blurDataUrls={productWithBlurDataUrl.blurDataUrls}
        alt={product.name}
      />

      <ProductInfo
        product={calculateProductTotalPrice(productWithBlurDataUrl)}
      />
    </div>
  );
};

export default ProductDetailPage;
