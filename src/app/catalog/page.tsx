import { Badge } from "@/components/ui/badge";
import { Shapes } from "lucide-react";
import { CategoryItem } from "./components/category-item";
import { prismaClient } from "@/lib/prisma";
import { CategoryList } from "./components/category-list";
import dynamicBlurDataUrl from "@/util/dynamicBlurDataUrl";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});

  const categoriesWithBlurDataUrl = categories.map(async (category) => ({
    ...category,
    blurDataUrl: await dynamicBlurDataUrl(category.imageUrl),
  }));

  const categoriesList = await Promise.all(categoriesWithBlurDataUrl);

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        variant="outline"
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
      >
        <Shapes size={16} /> <h2>Catálago</h2>
      </Badge>

      <h1 className="sr-only">
        Descontos em todas as categorias do nosso site
      </h1>

      <div>
        <nav>
          <CategoryList categories={categoriesList} />
        </nav>
      </div>
    </div>
  );
};

export default CatalogPage;
