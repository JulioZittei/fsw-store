import { prismaClient } from "@/lib/prisma";
import { CategoryItem } from "./category-item";

const Categories = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {categories.map((category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </div>
  );
};

export default Categories;
