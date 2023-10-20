import { prismaClient } from "@/lib/prisma";
import { CategoryItem } from "./category-item";

const Categories = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <nav>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryItem category={category} key={category.id} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
