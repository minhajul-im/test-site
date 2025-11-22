import { Discount } from "@/components/common/discount";
import { WishlistButton } from "@/components/common/wishlist-button";
import { getImageUrl } from "@/helper";
import { cn } from "@/lib/utils";
import type { ProductDetailsType, ProductType } from "@/type";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import { MagnifyImage } from "./magnify";
import { OptimizedImage } from "../common/optimized-image";

interface Props {
  product: ProductDetailsType;
  selectedVariantImage?: string | null;
  height?: string;
}

export const ImageSection = ({
  product,
  selectedVariantImage,
  height,
}: Props) => {
  const [img, setImg] = useState<string | null>(selectedVariantImage || null);

  const images = product?.photos || [];

  useEffect(() => {
    setImg(selectedVariantImage || product?.thumbnail_image || null);
  }, [selectedVariantImage, product?.thumbnail_image]);

  return (
    <div className="space-y-2.5 md:space-y-4 w-full overflow-hidden">
      <div className="flex gap-1 md:gap-2">
        {images?.length > 1 && (
          <div
            className={`w-12 md:w-20 mb-4 flex flex-col gap-2 max-h-[250px] md:max-h-[${
              height || "620px"
            }] overflow-y-auto scrollbar-thin overflow-x-hidden scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hide`}>
            {images?.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setImg(image?.path);
                }}
                className={cn(
                  "flex-shrink-0 cursor-pointer w-12 h-12 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all",
                  image?.path === img
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/50"
                )}
                aria-label={`View image ${index + 1}`}>
                <OptimizedImage
                  src={image?.path}
                  alt={`${product?.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  priority={true}
                  quality={90}
                />
              </button>
            ))}
          </div>
        )}
        <div className="flex-1 relative group">
          <div className="aspect-[16/17] overflow-hidden rounded-xl border border-border shadow-lg">
            {img ? (
              <MagnifyImage
                src={getImageUrl(img)}
                alt={product?.name}
                zoomFactor={2}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image className="w-16 h-16 text-muted-foreground" />
              </div>
            )}

            <WishlistButton
              product={product as unknown as ProductType}
              size="DEFAULT"
            />
          </div>

          <Discount product={product} type="DETAILS" />
        </div>
      </div>
    </div>
  );
};

/**
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { ProductDetailsType, ProductType } from "@/type";
import { WishlistButton } from "./wishlist-button";
import { Discount } from "./discount";
import { getImageUrl } from "@/helper";

interface Props {
  img: string | null;
  product: ProductDetailsType;
}

export const ImageGallery = ({ img, product }: Props) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imgUrl, setImgUrl] = useState<string | null>(img || null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const images = useMemo(() => {
    return product?.photos?.map((photo) => getImageUrl(photo?.path)) || [];
  }, [product?.photos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    const nextIndex = (selectedImage + 1) % images?.length;
    setSelectedImage(nextIndex);
    setImgUrl(images?.[nextIndex] || null);
  };

  const prevImage = () => {
    const prevIndex = (selectedImage - 1 + images?.length) % images?.length;
    setSelectedImage(prevIndex);
    setImgUrl(images?.[prevIndex] || null);
  };

  useEffect(() => {
    if (img) {
      const index = images?.findIndex((image) => image === img);
      if (index !== -1) {
        setSelectedImage(index);
        setImgUrl(img);
      }
    }
  }, [img, images]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4">
      <div
        className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}>
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={imgUrl || "/placeholder.svg"}
            alt="Image Gallery"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: isZoomed ? 2 : 1,
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <WishlistButton
          product={product as unknown as ProductType}
          size="DEFAULT"
        />
        <Discount product={product} type="DETAILS" />

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg flex items-center gap-2">
          <ZoomIn size={18} />
        </motion.div>

        {images?.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={24} />
            </motion.button>
          </>
        )}

        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {images?.length}
        </div>
      </div>

      {images?.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images?.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setSelectedImage(index);
                setImgUrl(image);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative size-16 cursor-pointer md:size-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-primary"
                  : "border-accent/20 hover:border-accent/50"
              }`}>
              <img
                src={image || "/placeholder.svg"}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {selectedImage === index && (
                <motion.div
                  layoutId="selectedThumbnail"
                  className="absolute inset-0 border-2 border-primary rounded-lg"
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

 */
