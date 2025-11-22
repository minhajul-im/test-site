import type { HomePropsType } from "@/type";
import { useConfig } from "@/hooks/useConfig";
import { getConfig } from "@/helper";
import { useTranslation } from "@/hooks/useTranslation";
import { ProductSection } from "@/components/common/product-section";

export const BestSellerSection = ({ isLoading, products }: HomePropsType) => {
  const config = useConfig();
  const { getTranslation } = useTranslation();
  const isShow = getConfig(config, "best_selling")?.value as string;

  return isShow ? (
    <section
      className={`mb-10 md:mb-20 container mx-auto  ${
        products?.length === 0 && !isLoading && "hidden"
      }`}>
      <ProductSection
        title={getTranslation("best_sellers") || "Best Sellers"}
        products={products}
        isLoading={isLoading}
      />
    </section>
  ) : null;
};
