import Image from "next/image";
import Categories from "./components/categories";
import { ProductList } from "./components/product-list";
import { prismaClient } from "@/lib/prisma";
import { SectionTitle } from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const headphones = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "headphones",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });
  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês!"
      />

      <section className="px-5">
        <Categories />
      </section>

      <section>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </section>

      <PromoBanner
        src="/banner-home-02.png"
        alt="Até 55% de desconto em mouses!"
      />

      <section>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </section>

      <section>
        <PromoBanner
          src="/banner-home-03.png"
          alt="Até 55% de desconto em mouses!"
        />
      </section>

      <section>
        <SectionTitle>Fones</SectionTitle>
        <ProductList products={headphones} />
      </section>
    </div>
  );
}
