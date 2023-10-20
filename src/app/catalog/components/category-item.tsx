import { CategoryWithBlurDataUrl } from "@/helpers/category";
import staticBlurDataUrl from "@/util/staticBlurDataUrl";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: CategoryWithBlurDataUrl;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="flex h-[150px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-category-item-gradient">
          <Image
            className="object-content h-auto max-h-[70%] w-[40%] max-w-[80%]"
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            quality={95}
            placeholder="blur"
            blurDataURL={category.blurDataUrl || staticBlurDataUrl()}
            sizes="(min-width: 1040px) 123px, calc(20vw - 14px)"
          />
        </div>

        <div className="rounded-bl-lg rounded-br-lg bg-accent py-3">
          <p className="text-center text-sm font-semibold">{category.name}</p>
        </div>
      </div>
    </Link>
  );
};

export { CategoryItem };
