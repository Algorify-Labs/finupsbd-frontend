"use client";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";

// Swiper components, modules and styles
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import slide8 from "@/assets/images/partners/AIB.png";
import slide1 from "@/assets/images/partners/DBBL.png";
import slide2 from "@/assets/images/partners/EBL.png";
import slide6 from "@/assets/images/partners/IDLC.png";
import slide4 from "@/assets/images/partners/brac-bank.png";
import slide3 from "@/assets/images/partners/city-bank.png";
import slide5 from "@/assets/images/partners/islami-bank.png";
import slide7 from "@/assets/images/partners/lankabangla.png";

export const sliderData = [
  {
    id: 1,
    image: slide1,
    title: "DBBL",
  },
  {
    id: 2,
    image: slide2,
    title: "Eastern Bank",
  },
  {
    id: 3,
    image: slide3,
    title: "City BAnk",
  },
  {
    id: 4,
    image: slide4,
    title: "DBRAC Bank",
  },
  {
    id: 5,
    image: slide5,
    title: "Islami Bank",
  },
  {
    id: 6,
    image: slide6,
    title: "IDLC",
  },
  {
    id: 7,
    image: slide7,
    title: "LankaBangla",
  },
  {
    id: 8,
    image: slide8,
    title: "AIB",
  },
];

const PartnerSlider = () => {
  return (
    <SectionWrapper className="bg-[#F5FAFF] py-8 lg:py-16">
      <div className="container-md">
        <div className="mb-4 text-center">
          <SectionTitle>Our Partners</SectionTitle>
        </div>
        <div>
          <Swiper
            className="partner-carousel"
            pagination={{ type: "bullets", clickable: true }}
            breakpoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 6,
                spaceBetween: 10,
              },
              "@1.50": {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
            autoplay={true}
            loop={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {sliderData.map(({ id, image, title }) => (
              <SwiperSlide key={id}>
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={title}
                    width={167}
                    height={106}
                    className="lg:-h-auto mx-auto h-auto w-full lg:w-[167px]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default PartnerSlider;
