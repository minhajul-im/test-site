import { SeoWrapper } from "@/components/common/seo-wrapper";
import { BaseLayout } from "@/components/layout/base-layout";
import { useTranslation } from "@/hooks/useTranslation";
import { SectionTitle } from "@/components/common/section-title";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BreadcrumbWrapper } from "@/components/common/breadcrumb-wrapper";
import { OrderTrack } from "./components/order";

export const OrderTrackGuestPage = () => {
  const { getTranslation } = useTranslation();

  return (
    <>
      <SeoWrapper title={getTranslation("order_track") || "Order Track"} />
      <BaseLayout isShowMegaMenu={false}>
        <section className="mb-10 md:mb-20 mt-10 px-4 md:px-0">
          <SectionTitle
            title={getTranslation("order_track") || "Order Track"}
          />

          <OrderTrack path="/track-order" />
        </section>
      </BaseLayout>
    </>
  );
};

export const OrderTrackUserPage = () => {
  const { getTranslation } = useTranslation();
  return (
    <>
      <SeoWrapper title={getTranslation("track_order") || "Track Order"} />
      <DashboardLayout>
        <div className="mx-4 md:mx-0 mb-4">
          <BreadcrumbWrapper
            type="dashboard"
            items={[
              {
                title: getTranslation("track_order") || "Track Order",
              },
            ]}
          />
        </div>
        <SectionTitle title={getTranslation("track_order") || "Track Order"} />

        <div className="mx-4 md:mx-0">
          <OrderTrack path="/dashboard/track-order" />
        </div>
      </DashboardLayout>
    </>
  );
};
