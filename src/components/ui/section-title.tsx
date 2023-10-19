import { ComponentProps } from "react";

const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <h2 className="mb-3 pl-5 text-base font-bold uppercase" {...props}>
      {children}
    </h2>
  );
};

export { SectionTitle };
