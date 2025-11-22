import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export const EmptyCart = () => {
  const { getTranslation } = useTranslation();
  return (
    <div className="text-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20">
        <div className="text-6xl md:text-8xl mb-4">🛍️</div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          {getTranslation("your_cart_is_empty") || "Your cart is empty"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {getTranslation(
            "looks_like_you_havent_added_any_items_to_your_cart_yet"
          ) || "Looks like you haven't added any items to your cart yet."}
        </p>
        <Button asChild>
          <Link to="/products">
            {getTranslation("continue_shopping") || "Continue Shopping"}
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};
