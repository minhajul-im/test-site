import { Skeleton } from "../common/skeleton";
import { getImageUrl, slugify } from "@/helper";
import { Image } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

interface CategoryType {
  id: number;
  name: string;
  banner: string;
  icon: string;
  number_of_children: number;
  links: {
    products: string;
    sub_categories: string;
  };
}

export const CategoryCard = ({ category }: { category: CategoryType }) => {
  const { getTranslation } = useTranslation();

  return (
    <Link
      to={`/categories/${category?.id}/${slugify(category?.name)}`}
      className="group relative rounded-lg shadow-sm border border-border overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col">
      <div className="relative w-full h-32 md:h-40 overflow-hidden flex-shrink-0">
        {category?.banner ? (
          <img
            src={getImageUrl(category?.banner)}
            alt={category?.name}
            className="w-full h-full absolute object-cover"
          />
        ) : (
          <div className="w-full absolute h-full bg-muted flex items-center justify-center">
            <Image className="w-20 h-20 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-2 flex-1 flex flex-col justify-center">
        <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {category?.name}
        </h3>
        {category?.number_of_children > 0 && (
          <p className="text-xs text-muted-foreground">
            {category?.number_of_children}{" "}
            {getTranslation("subcategories") || "subcategories"}
          </p>
        )}
      </div>
    </Link>
  );
};

export const CategoryCardSkeleton = () => {
  return (
    <div className="group relative rounded-lg shadow-sm border border-border overflow-hidden transition-all duration-300 cursor-pointer flex flex-col">
      <div className="relative w-full h-32 md:h-40 overflow-hidden flex-shrink-0">
        <Skeleton className="w-full h-full absolute" />
      </div>

      <div className="p-2 flex-1 flex flex-col justify-center">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-2.5 w-20" />
      </div>
    </div>
  );
};
