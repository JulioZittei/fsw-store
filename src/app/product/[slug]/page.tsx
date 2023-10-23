import { prismaClient } from "@/lib/prisma";
import { ProductImages } from "../components/product-images";
import { ProductInfo } from "../components/product-info";
import {
  ProductWithBlurDataUrl,
  calculateProductTotalPrice,
} from "@/helpers/product";
import dynamicBlurDataUrl from "@/util/dynamicBlurDataUrl";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductCarouselList } from "@/components/ui/product-carousel-list";

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
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  const imageUrls = product?.imageUrls || [];

  const productWithBlurDataUrl = {
    ...product,
    blurDataUrls: await Promise.all(
      imageUrls.map((image) => dynamicBlurDataUrl(image)),
    ),
  } as ProductWithBlurDataUrl;

  const products = product?.category.products || [];

  const relatedWithBlurDataUrl = await Promise.all(
    products.map(async (product) => ({
      ...product,
      blurDataUrls: await Promise.all(
        product.imageUrls.map((image) => dynamicBlurDataUrl(image)),
      ),
    })),
  );

  const relatedList = relatedWithBlurDataUrl;

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

      <div>
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <ProductCarouselList products={relatedList} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
