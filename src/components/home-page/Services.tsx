import serviceIcon1 from "@/assets/images/icons/service-icon-1.png";
import serviceIcon2 from "@/assets/images/icons/service-icon-2.png";
import serviceIcon3 from "@/assets/images/icons/service-icon-3.png";
import serviceIcon4 from "@/assets/images/icons/service-icon-4.png";
import Image from "next/image";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";

const services = [
  {
    id: 1,
    title: "Financial Product Comparison",
    description:
      "Easily compare loans, credit cards, and insurance products to find the best deals tailored to your needs.",
    icon: serviceIcon1,
  },
  {
    id: 2,
    title: "Personalized Recommendations",
    description:
      "Easily compare loans, credit cards, and insurance products to find the best deals tailored to your needs.",
    icon: serviceIcon2,
  },
  {
    id: 3,
    title: "Credit Score Tracking",
    description:
      "Easily compare loans, credit cards, and insurance products to find the best deals tailored to your needs.",
    icon: serviceIcon3,
  },
  {
    id: 4,
    title: "Educational Resources",
    description:
      "Easily compare loans, credit cards, and insurance products to find the best deals tailored to your needs.",
    icon: serviceIcon4,
  },
];

const Services = () => {
  return (
    <SectionWrapper className="pt-0 lg:!pt-20">
      <div className="container-md">
        <div className="mb-4 text-center lg:mb-16">
          <SectionBadge className="before:bg-[#7BE963]">
            Our Services
          </SectionBadge>
          <SectionTitle>Smart Financial Tools for You</SectionTitle>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {services.map(({ id, title, description, icon }) => (
            <div
              key={id}
              className="flex gap-4 rounded-lg bg-[#F9FAFB] px-4 py-6 lg:gap-6 lg:px-7 lg:py-10"
            >
              <div className="w-36 lg:w-32">
                <Image src={icon} alt="Icon" />
              </div>
              <div className="space-y-2">
                <h2 className="text-md font-semibold text-green-950 lg:text-2xl">
                  {title}
                </h2>
                <p className="text-sm text-gray-950 lg:text-lg">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
