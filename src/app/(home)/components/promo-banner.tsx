import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      height={0}
      width={0}
      className="h-auto w-full px-5"
      sizes="(max-width: 1400px) 50vw, 75vw, 100vw"
      quality={85}
      alt={alt}
      {...props}
    />
  );
};

export default PromoBanner;
