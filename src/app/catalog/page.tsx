import { Badge } from "@/components/ui/badge";
import { Shapes } from "lucide-react";
import { CategoryItem } from "./components/category-item";
import { prismaClient } from "@/lib/prisma";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        variant="outline"
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
      >
        <Shapes size={16} /> <h2>Catálago</h2>
      </Badge>

      <div>
        <nav>
          <ul className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id}>
                <CategoryItem key={category.id} category={category} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CatalogPage;
