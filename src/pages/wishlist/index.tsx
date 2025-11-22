import { BaseLayout } from "@/components/layout/base-layout";
import { SectionTitle } from "@/components/common/section-title";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { useTranslation } from "@/hooks/useTranslation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { WishlistItems } from "./items";
import { BreadcrumbWrapper } from "@/components/common/breadcrumb-wrapper";

export const WishlistPublicPage = () => {
  const { getTranslation } = useTranslation();

  return (
    <>
      <SeoWrapper title={getTranslation("my_wishlist") || "My Wishlist"} />

      <BaseLayout>
        <section className="mb-10 md:mb-20 mt-10">
          <SectionTitle
            title={getTranslation("my_wishlist") || "My Wishlist"}
          />

          <WishlistItems />
        </section>
      </BaseLayout>
    </>
  );
};

export const WishlistPrivatePage = () => {
  const { getTranslation } = useTranslation();
  return (
    <>
      <SeoWrapper title={getTranslation("my_wishlist") || "My Wishlist"} />
      <DashboardLayout>
        <div className="mx-4 md:mx-0 mb-4">
          <BreadcrumbWrapper
            type="dashboard"
            items={[{ title: getTranslation("my_wishlist") || "My Wishlist" }]}
          />
        </div>
        <SectionTitle title={getTranslation("my_wishlist") || "My Wishlist"} />
        <WishlistItems />
      </DashboardLayout>
    </>
  );
};
