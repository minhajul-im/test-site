import { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/helper";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  sizes = "100vw",
  placeholder = "empty",
  blurDataURL,
  loading = "lazy",
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [priority]);

  const generateSrcSet = (baseUrl: string, widths: number[]) => {
    return widths
      .map((w) => {
        const url = new URL(baseUrl);
        url.searchParams.set("w", w.toString());
        url.searchParams.set("q", quality.toString());
        url.searchParams.set("f", "webp");
        return `${url.toString()} ${w}w`;
      })
      .join(", ");
  };

  const generateModernFormats = (baseUrl: string) => {
    const url = new URL(baseUrl);
    url.searchParams.set("w", width?.toString() || "800");
    url.searchParams.set("q", quality.toString());

    const webpUrl = new URL(url);
    webpUrl.searchParams.set("f", "webp");

    const avifUrl = new URL(url);
    avifUrl.searchParams.set("f", "avif");

    return {
      webp: webpUrl.toString(),
      avif: avifUrl.toString(),
      fallback: url.toString(),
    };
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={cn(
          "bg-muted animate-pulse flex items-center justify-center",
          className
        )}>
        {placeholder === "blur" && blurDataURL ? (
          <img
            src={blurDataURL}
            alt=""
            className="w-full h-full object-cover filter blur-sm"
          />
        ) : (
          <Image className="w-8 h-8 text-muted-foreground" />
        )}
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={cn("bg-muted flex items-center justify-center", className)}
        style={{ width, height }}>
        <Image className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  const imageUrl = src.startsWith("http") ? src : getImageUrl(src);

  let formats, srcSet;
  try {
    formats = generateModernFormats(imageUrl);
    srcSet = generateSrcSet(imageUrl, [320, 640, 800, 1024, 1200, 1600]);
  } catch {
    formats = { webp: imageUrl, avif: imageUrl, fallback: imageUrl };
    srcSet = imageUrl;
  }

  return (
    <picture>
      <source srcSet={formats.avif} type="image/avif" sizes={sizes} />

      <source srcSet={formats.webp} type="image/webp" sizes={sizes} />

      <img
        ref={imgRef}
        src={formats.fallback}
        srcSet={srcSet}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
      />
    </picture>
  );
};
