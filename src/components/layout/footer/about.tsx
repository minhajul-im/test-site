import { useTranslation } from "@/hooks/useTranslation";
import { Link, useLocation } from "react-router-dom";

export const AboutUsFooter = () => {
  const location = useLocation();
  const { getTranslation } = useTranslation();

  const policies = [
    {
      name: getTranslation("about_us") || "About Us",
      href: "/pages/about-us",
    },
    {
      name: getTranslation("contact_us") || "Contact us",
      href: "/pages/contact-us",
    },
    {
      name: getTranslation("privacy_policy") || "Privacy Policy",
      href: "/pages/privacy-policy",
    },
    {
      name: getTranslation("terms__condition") || "Terms & Condition",
      href: "/pages/terms-condition",
    },
    {
      name: getTranslation("return_policy") || "Return Policy",
      href: "/pages/return-policy",
    },
    {
      name: getTranslation("support_policy") || "Support Policy",
      href: "/pages/support-policy",
    },
    {
      name: getTranslation("seller_policy") || "Seller Policy",
      href: "/pages/seller-policy",
    },
  ];

  return (
    <div>
      <h4 className="font-bold text-lg mb-4">
        {getTranslation("about_us") || "About Us"}
      </h4>
      <ul className="space-y-2">
        {policies?.map((item) => (
          <li key={item?.name}>
            <Link
              to={item?.href}
              className={`hover:text-primary/70 hover:underline capitalize transition-colors text-sm ${
                location.pathname === item?.href ? "text-primary" : ""
              }`}>
              {item?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
