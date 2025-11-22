import type { HomePropsType } from "@/type";
import { useTranslation } from "@/hooks/useTranslation";
import { ProductSection } from "@/components/common/product-section";

export const FeaturedProductsSection = ({
  isLoading,
  products,
}: HomePropsType) => {
  const { getTranslation } = useTranslation();

  return (
    <section
      className={`mb-10 md:mb-20 container mx-auto ${
        products?.length === 0 && !isLoading && "hidden"
      }`}>
      <ProductSection
        title={getTranslation("featured_products") || "Featured Products"}
        products={products}
        isLoading={isLoading}
      />
    </section>
  );
};
