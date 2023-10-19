"use client";

import { Product } from "@prisma/client";
import { ProductItem } from "@/components/ui/product-item";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { calculateProductTotalPrice } from "@/helpers/product";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={"auto"}
      scrollbar={{ draggable: true }}
      centeredSlides={true}
      centeredSlidesBounds={true}
    >
      {products.map((product, key) => (
        <SwiperSlide
          key={product.id}
          className={twMerge(
            "max-w-[170px] items-center justify-center",
            key === 0 && "ml-2",
            key + 1 === products.length && "mr-2",
          )}
        >
          <ProductItem
            product={calculateProductTotalPrice(product)}
            key={product.id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    // <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
    //   {products.map((product) => (
    //     <ProductItem product={product} key={product.id} />
    //   ))}
    // </div>
  );
};

export { ProductList };
