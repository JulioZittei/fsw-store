import { Badge } from "@/components/ui/badge";
import { ProductList } from "@/components/ui/product-list";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { prismaClient } from "@/lib/prisma";
import dynamicBlurDataUrl from "@/util/dynamicBlurDataUrl";

interface CategoryProductsPageProps {
  params: {
    slug: string;
  };
}

const CategoryProductsPage = async ({
  params: { slug },
}: CategoryProductsPageProps) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug,
    },
    include: {
      products: true,
    },
  });

  const products = category?.products || [];

  const productsWithBlurDataUrl = await Promise.all(
    products.map(async (product) => ({
      ...product,
      blurDataUrls: await Promise.all(
        product.imageUrls.map((image) => dynamicBlurDataUrl(image)),
      ),
    })),
  );

  const productsList = productsWithBlurDataUrl;

  if (!category) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge variant="heading">
        {CATEGORY_ICON[slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>

      <h1 className="sr-only">Os melhores descontos em {category.name}</h1>

      <ProductList products={productsList} />
    </div>
  );
};

export default CategoryProductsPage;
