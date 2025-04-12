"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";
import sitelayot from "/public/site-layout.png";

interface AccordionData {
  id: string;
  title: string;
  description: string;
}

const accordionData: AccordionData[] = [
  {
    id: "1",
    title: "Check Your Credit Score for Free",
    description:
      "Sign up and get instant access to your credit score and insights on improving it.",
  },
  {
    id: "2",
    title: "Compare the Best Financial Products",
    description:
      "Sign up and get instant access to your credit score and insights on improving it.",
  },
  {
    id: "3",
    title: "Apply and Track Your Applications",
    description:
      "Sign up and get instant access to your credit score and insights on improving it.",
  },
];

const HowWeWorks = () => {
  return (
    <SectionWrapper>
      <div className="container-md flex flex-col items-center gap-4 md:flex-row lg:gap-16">
        {/* Left Column */}
        <div className="flex-1">
          <div className="mb-10">
            <SectionBadge className="!text-left before:bg-[#7BE963]">
              How It Works
            </SectionBadge>
            <SectionTitle className="lg:text-[40px] lg:leading-[48px]">
              Simplifying Your Financial Decisions in 3 Easy Steps
            </SectionTitle>
          </div>
          <div>
            <Accordion
              defaultValue="1"
              className="fin-accordion with-numbers"
              type="single"
              collapsible
            >
              {accordionData.map(({ id, title, description }, index) => (
                <AccordionItem
                  key={id}
                  className="accordion-item group"
                  value={id.toString()}
                >
                  <AccordionTrigger className="accordion-title">
                    <div className="flex items-center gap-4">
                      <span className="number">{index + 1}</span>
                      <span className="title-text">{title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="accordion-content">
                    {description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="flex-1 rounded-2xl bg-[#F9FAFB] py-12">
          <Image 
            src={sitelayot} 
            alt="Site Layout" 
            className="mx-auto object-cover" 
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HowWeWorks;
