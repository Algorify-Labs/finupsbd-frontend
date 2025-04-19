"use client";

// Swiper components, modules and styles
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import slide1 from "@/assets/images/slider/slide-1.jpg";
import slide2 from "@/assets/images/slider/slide-2.jpg";
import slide3 from "@/assets/images/slider/slide-3.jpg";
import slide4 from "@/assets/images/slider/slide-4.jpg";
import slide5 from "@/assets/images/slider/slide-5.jpg";
import EligiblityPage from "./EligiblityPage";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EmiCalculator from "../tools/EMICalculator";

export const sliderData = [
  {
    id: 1,
    image: slide1,
    title: "Dhaka",
  },
  {
    id: 2,
    image: slide2,
    title: "Dhaka",
  },
  {
    id: 3,
    image: slide3,
    title: "Dhaka",
  },
  {
    id: 4,
    image: slide4,
    title: "Dhaka",
  },
  {
    id: 5,
    image: slide5,
    title: "Dhaka",
  },
];

const HomeSlider = () => {
  return (
    <section className="relative mb-6 w-full lg:mb-20">
      <Swiper
        pagination={{ type: "bullets", clickable: true }}
        autoplay={true}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
        {sliderData.map(({ id, image, title }) => (
          <SwiperSlide key={id}>
            <div className="relative">
              <Image src={image} alt={title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative -bottom-[18%] left-0 right-0 z-10 lg:absolute">
        <EligiblityPage />
      </div>


      <div
        className="fixed top-1/2 right-0 z-50 rotate-90 origin-top-right bg-gradient-to-br from-red-600 to-red-500 text-white px-6 py-2 text-sm lg:text-base font-semibold tracking-wider rounded-bl-md shadow-xl transition-all hover:brightness-110 hover:scale-105 cursor-pointer"
        title="View EMI Calculator"
      >
        <Dialog>
          <DialogTrigger asChild>
            <span className="inline-block">💸 EMI Calculator</span>
          </DialogTrigger>
          <DialogContent className="w-[1000px]" >
            <EmiCalculator/>
          </DialogContent>
        </Dialog>

      </div>

    </section>
  );
};

export default HomeSlider;
