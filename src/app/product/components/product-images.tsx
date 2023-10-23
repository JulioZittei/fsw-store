"use client";

import staticBlurDataUrl from "@/util/staticBlurDataUrl";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ProductImagesProps {
  imageUrls: string[];
  blurDataUrls: string[];
  alt: string;
}

const ProductImages = ({
  imageUrls,
  blurDataUrls,
  alt,
}: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (selectedImage: string) => {
    setCurrentImage(selectedImage);
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          src={currentImage}
          width={0}
          height={0}
          quality={95}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataUrls[0] || staticBlurDataUrl()}
          alt={alt}
        />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4 px-5">
        {imageUrls.map((image, index) => (
          <button
            key={image}
            className={twMerge(
              "flex h-[80px] items-center justify-center rounded-lg bg-accent",
              image === currentImage && "border-2 border-solid border-primary",
            )}
            onClick={() => handleImageClick(image)}
          >
            <Image
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
              src={image}
              width={0}
              height={0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={blurDataUrls[index] || staticBlurDataUrl()}
              alt={alt}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export { ProductImages };
