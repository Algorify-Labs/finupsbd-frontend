import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";

const FinTestimonial = () => {
  return (
    <SectionWrapper>
      <div className="bg-[#FFFCF5] py-16">
        <div className="container-md">
          <div className="mb-16 text-center">
            <SectionBadge className="before:bg-[#FF5F00]">
              User Testimonials
            </SectionBadge>
            <SectionTitle>What Our Users Say About Us</SectionTitle>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FinTestimonial;
