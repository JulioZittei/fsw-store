import Image from "next/image";
import Categories from "./components/categories";
import { ProductList } from "./components/product-list";
import { prismaClient } from "@/lib/prisma";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <section>
      <Image
        src="/banner-home-01.png"
        height={150}
        width={350}
        sizes="100vw"
        alt="Até 55% de desconto só esse mês"
        className="mt-8 h-auto w-full px-5"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <ProductList products={deals} />
      </div>
    </section>
  );
}
