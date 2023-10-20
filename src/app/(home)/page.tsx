import Categories from "./components/categories";
import { ProductCarouselList } from "./components/product-carousel-list";
import { prismaClient } from "@/lib/prisma";
import { SectionTitle } from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import staticBlurDataUrl from "@/util/staticBlurDataUrl";
import dynamicBlurDataUrl from "@/util/dynamicBlurDataUrl";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const dealsWithBlurDataUrl = await Promise.all(
    deals.map(async (product) => ({
      ...product,
      blurDataUrls: await Promise.all(
        product.imageUrls.map((image) => dynamicBlurDataUrl(image)),
      ),
    })),
  );

  const dealsList = dealsWithBlurDataUrl;

  const headphones = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "headphones",
      },
    },
  });

  const headphonesWithBlurDataUrl = await Promise.all(
    headphones.map(async (product) => ({
      ...product,
      blurDataUrls: await Promise.all(
        product.imageUrls.map((image) => dynamicBlurDataUrl(image)),
      ),
    })),
  );

  const headphonesList = headphonesWithBlurDataUrl;

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  const mousesWithBlurDataUrl = await Promise.all(
    mouses.map(async (product) => ({
      ...product,
      blurDataUrls: await Promise.all(
        product.imageUrls.map((image) => dynamicBlurDataUrl(image)),
      ),
    })),
  );

  const mousesList = mousesWithBlurDataUrl;

  const { promoBanner1, promoBanner2, promoBanner3 } = await Promise.all([
    dynamicBlurDataUrl("/banner-home-01.png"),
    dynamicBlurDataUrl("/banner-home-02.png"),
    dynamicBlurDataUrl("/banner-home-03.png"),
  ]).then((result) => {
    return {
      promoBanner1: result[0],
      promoBanner2: result[1],
      promoBanner3: result[2],
    };
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        src="/banner-home-01.png"
        priority={true}
        alt="Até 55% de desconto esse mês!"
        blurDataURL={promoBanner1 || staticBlurDataUrl()}
      />

      <section className="px-5">
        <Categories />
      </section>

      <section>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductCarouselList products={dealsList} />
      </section>

      <PromoBanner
        src="/banner-home-02.png"
        alt="Até 55% de desconto em mouses!"
        blurDataURL={promoBanner2 || staticBlurDataUrl()}
      />

      <section>
        <SectionTitle>Mouses</SectionTitle>
        <ProductCarouselList products={mousesList} />
      </section>

      <section>
        <PromoBanner
          src="/banner-home-03.png"
          alt="Até 55% de desconto em mouses!"
          blurDataURL={promoBanner3 || staticBlurDataUrl()}
        />
      </section>

      <section>
        <SectionTitle>Fones</SectionTitle>
        <ProductCarouselList products={headphonesList} />
      </section>
    </div>
  );
}
