import productIcon1 from "@/assets/images/icons/product-icon-1.png";
import productIcon2 from "@/assets/images/icons/product-icon-2.png";
import productIcon3 from "@/assets/images/icons/product-icon-3.png";
import productIcon4 from "@/assets/images/icons/product-icon-4.png";
import productIcon5 from "@/assets/images/icons/product-icon-5.png";
import productIcon6 from "@/assets/images/icons/product-icon-6.png";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";

export default function FinancialProducts() {
  const products = [
    {
      id: 1,
      title: "Credit Cards",
      description:
        "From 50+ Options, Choose a card matching  your lifestyle & needs",
      icon: productIcon1,
    },
    {
      id: 2,
      title: "Personal Loans",
      description:
        "From 50+ Options, Choose a card matching  your lifestyle & needs",
      icon: productIcon2,
    },
    {
      id: 3,
      title: "Life Insurance",
      description:
        "From 50+ Options, Choose a card matching  your lifestyle & needs",
      icon: productIcon3,
    },
    {
      id: 4,
      title: "Car Insurance",
      description:
        "From 50+ Options, Choose a card matching  your lifestyle & needs",
      icon: productIcon4,
    },
    {
      id: 5,
      title: "SME Loan",
      description:
        "From 50+ Options, Choose a card matching  your lifestyle & needs",
      icon: productIcon5,
    },
    {
      id: 6,
      title: "Home Loan",
      description:
        "From 50+ Options, Choose a card matching  your lifestyle & needs",
      icon: productIcon6,
    },
  ];

  return (
    <SectionWrapper>
      <div className="bg-[#FFFCF5] py-16">
        <div className="container-md">
          <div className="mb-4 text-center lg:mb-16">
            <SectionBadge className="before:bg-[#FF5F00]">
              Featured Products
            </SectionBadge>
            <SectionTitle>Popular Financial Products</SectionTitle>
          </div>
          {/* Enhanced Products Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map(({ id, title, description, icon }) => (
              <Card
                key={id}
                className="group overflow-hidden border border-[#EAECF0] bg-white transition-all duration-300 hover:border-[#7BE963] hover:bg-[#F7FFF5] hover:shadow-lg"
              >
                <CardContent className="space-y-3 p-6 pt-8">
                  <div className="w-64 lg:w-32">
                    <Image src={icon} alt="Icon"  className="h-auto w-16" />
                  </div>

                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold text-green-950">
                      {title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600">{description}</p>
                  <Link
                    href=""
                    className="flex items-center group-hover:text-primary"
                  >
                    Compare Now
                    <ArrowRight className="ml-1 h-4 w-4 -rotate-45 transition-transform group-hover:-rotate-0" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
