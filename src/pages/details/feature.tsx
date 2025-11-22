import { Card } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { DollarSign, Truck, CreditCard, CheckCircle } from "lucide-react";

interface FeatureCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export const FeatureCards = () => {
  const { getTranslation } = useTranslation();
  const featureData: FeatureCard[] = [
    {
      id: "money-back",
      icon: DollarSign,
      title: getTranslation("money_back_guaranty") || "Money back guaranty!",
      description:
        getTranslation("we_offer_competitive_price") ||
        "We Offer competitive price.",
    },
    {
      id: "fast-delivery",
      icon: Truck,
      title: getTranslation("fast_delivery") || "Fast Delivery",
      description:
        getTranslation("faster_delivery_on_selected_items") ||
        "Faster delivery on selected items.",
    },
    {
      id: "safe-payments",
      icon: CreditCard,
      title: getTranslation("safe_payments") || "Safe payments",
      description:
        getTranslation("safe_payments_method") || "Safe payments method",
    },
    {
      id: "authentic-products",
      icon: CheckCircle,
      title:
        getTranslation("100_authentic_products") || "100% Authentic products",
      description:
        getTranslation("we_provide_authentic_products") ||
        "We provide authentic products.",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
      {featureData.map((feature) => {
        const IconComponent = feature.icon;
        return (
          <Card key={feature.id} className="p-2">
            <div className="flex flex-col items-center text-center">
              <IconComponent className="w-6 h-6 text-primary" />
              <h3 className="text-sm font-bold text-primary">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
