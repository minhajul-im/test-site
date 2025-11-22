import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import { SectionTitleSkeleton } from "./section-title";
import type { ProductType } from "@/type";
import { CardLayout } from "./card-layout";

interface Props {
  products: ProductType[];
  isLoading: boolean;
  delay?: number;
  sliderId?: string;
  isTitle?: boolean;
}

export const ProductSlider = ({
  products,
  isLoading,
  isTitle = false,
  delay = 3000,
  sliderId,
}: Props) => {
  if (isLoading) {
    return (
      <div className="w-full">
        {isTitle && (
          <div className="my-6">
            <SectionTitleSkeleton />
          </div>
        )}
        <CardLayout>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </CardLayout>
      </div>
    );
  }

  if (!products || products?.length === 0) {
    return null;
  }

  const maxSlidesPerView = 6;
  const enableLoop = (products?.length || 0) > maxSlidesPerView;
  const uniqueSliderId = sliderId || "default";
  const uniqueSliderClass = `product-slider-${uniqueSliderId}`;

  return (
    <div
      className="w-full mx-1 md:mx-0"
      key={`slider-wrapper-${uniqueSliderId}`}
      id={`slider-wrapper-${uniqueSliderId}`}>
      <Swiper
        key={`swiper-${uniqueSliderId}`}
        modules={[Navigation, Autoplay]}
        slidesPerView={2}
        spaceBetween={1}
        centeredSlides={false}
        loop={enableLoop}
        loopPreventsSliding={false}
        loopAdditionalSlides={maxSlidesPerView}
        autoplay={{ delay: delay, disableOnInteraction: false }}
        speed={1000}
        navigation={false}
        watchOverflow={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 8 },
          768: { slidesPerView: 3, spaceBetween: 8 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
          1280: { slidesPerView: 5, spaceBetween: 16 },
          1536: { slidesPerView: 6, spaceBetween: 16 },
        }}
        className={uniqueSliderClass}>
        {products?.map((product, i: number) => (
          <SwiperSlide key={`${sliderId || "slider"}-${product?.id}-${i}`}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
