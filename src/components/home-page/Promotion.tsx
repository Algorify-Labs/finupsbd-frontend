import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";
import mobile from "/public/mobile.png";

const Promotion = () => {
  return (
    <SectionWrapper className="min-h-[300px] w-full bg-[url('/promotion-bg.jpg')] bg-cover bg-center p-6 lg:py-16">
      <div className="container-md flex flex-col items-center gap-4 md:flex-row lg:gap-16">
        <div className="order-2 flex-1 lg:order-1">
          <div className="mb-10">
            <SectionBadge className="!text-left text-[#FF5F00] before:bg-[#7BE963]">
              Promotion
            </SectionBadge>
            <SectionTitle className="text-white lg:text-[40px] lg:leading-[48px]">
              Ready to Take Control <br /> of Your{" "}
              <span className="text-[#FF5F00]">Finances?</span>
            </SectionTitle>
            <p className="my-6 text-white">
              Join thousands of Bangladeshis who are making smarter financial
              decisions.
            </p>
            <Link href="" className="flex gap-4 text-white">
              <Info />
              Terms and disclosures applied
            </Link>
          </div>
        </div>
        <div className="order-1 mb-6 mt-6 flex-1 lg:order-2 lg:mb-0 lg:mt-0">
          <div className="text-center">
            <Image src={mobile} alt="Background" className="mx-auto" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Promotion;
