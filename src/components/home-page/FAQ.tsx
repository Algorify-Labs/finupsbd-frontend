import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, MoveUpRight } from "lucide-react";
import Link from "next/link";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";
import { Button } from "../ui/button";

const accordion_data = [
  {
    id: 1,
    title: "Is FinsUp BD free to use?",
    description:
      "Yes, our platform is completely free for users to check their credit scores, compare products, and apply online",
  },
  {
    id: 2,
    title: "How do I check my credit score?",
    description:
      "Yes, our platform is completely free for users to check their credit scores, compare products, and apply online",
  },
  {
    id: 3,
    title: "Is my data secure with FinsUp BD?",
    description:
      "Yes, our platform is completely free for users to check their credit scores, compare products, and apply online",
  },
  {
    id: 6,
    title: "Can I track my loan application status?",
    description:
      "Yes, our platform is completely free for users to check their credit scores, compare products, and apply online",
  },
  {
    id: 5,
    title: "Is FinsUp BD free to use?",
    description:
      "Yes, our platform is completely free for users to check their credit scores, compare products, and apply online",
  },
];

const FAQ = () => {
  return (
    <SectionWrapper className="py-0 lg:py-16">
      <div className="container-md flex flex-col items-center gap-4 md:flex-row lg:gap-16">
        <div className="mt-10 w-full lg:mt-0 lg:w-5/12">
          <SectionBadge className="!text-left before:bg-[#7BE963]">
            Here to help
          </SectionBadge>
          <SectionTitle className="lg:text-[40px] lg:leading-[48px]">
            Frequently Asked Questions
          </SectionTitle>
          <Link href="" className="my-6 flex gap-4">
            <Info />
            Need further support?
          </Link>
          <Link href="">
            <Button variant="default" className="h-12 w-36">
              View All
              <MoveUpRight size={28} strokeWidth={2.5} />
            </Button>
          </Link>
        </div>
        <div className="w-full lg:w-7/12">
          <Accordion
            defaultValue="1"
            className="fin-accordion default-accordion"
            type="single"
            collapsible
          >
            {accordion_data.map(({ id, title, description }, index) => (
              <AccordionItem
                key={id}
                className="accordion-item group"
                value={id.toString()}
              >
                <AccordionTrigger className="accordion-title">
                  <span className="title-text">{title}</span>
                </AccordionTrigger>
                <AccordionContent className="accordion-content">
                  {description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQ;
