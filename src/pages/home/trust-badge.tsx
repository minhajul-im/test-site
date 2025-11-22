import React from "react";
import { DollarSign, Truck, Shield, Star, BadgeCheck } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustItem = ({ icon, title, description }: Props) => {
  return (
    <div className="h-full rounded-xl border border-primary/20 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col items-center text-center p-4">
        <div className="mb-3 p-4 rounded-full bg-primary/10 text-primary/90">
          {icon}
        </div>
        <h3 className="font-semibold text-sm md:text-base text-primary/90">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-foreground/70">{description}</p>
      </div>
    </div>
  );
};

export const TrustBadgeSection = () => {
  const { getTranslation } = useTranslation();

  const trustItems = [
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: getTranslation("value_for_money") || "Value for money",
      description:
        getTranslation("we_offer_competitive_price") ||
        "We Offer competitive price.",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: getTranslation("fast_delivery") || "Fast Delivery",
      description:
        getTranslation("fast_delivery_desc") ||
        "Faster delivery on selected items.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: getTranslation("safe_payments") || "Safe payments",
      description:
        getTranslation("safe_payments_method") || "Safe payments method.",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title:
        getTranslation("100_authentic_products") || "100% Authentic products",
      description:
        getTranslation("we_provide_authentic_products") ||
        "We provide authentic products.",
    },
    {
      icon: <BadgeCheck className="w-5 h-5" />,
      title: getTranslation("national_delivery") || "National Delivery",
      description:
        getTranslation("national_cash_on_delivery") ||
        "National Cash on delivery.",
    },
  ];

  return (
    <div className="container mx-auto hidden md:block mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-5">
        {trustItems.map((item, index) => (
          <TrustItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
