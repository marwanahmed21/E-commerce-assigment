'use client'
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import sliderImg1 from "../../../public/assets/slider-image-1.jpeg";
import sliderImg2 from "../../../public/assets/slider-image-2.jpeg";
import sliderImg3 from "../../../public/assets/slider-image-3.jpeg";
import Image from "next/image";

export default function HomeSlider() {
  return (
    <>
      <section className="grid grid-cols-12 my-4">
        <div className="col-span-8">
          <Swiper loop={true} className="h-full">
            <SwiperSlide>
              <Image
              style={{objectFit:"cover", width:'100%', height:"100%"}}
                width={0}
                height={0}
                src={sliderImg3}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
              style={{objectFit:"cover", width:'100%', height:"100%"}}
                width={0}
                height={0}
                src={sliderImg3}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                style={{objectFit:"cover", width:'100%', height:"100%"}}
                width={0}
                height={0}
                src={sliderImg3}
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          <Image style={{width:'100%', height:"auto"}} width={0} height={0} src={sliderImg1} alt="" />
          <Image style={{width:'100%', height:"auto"}} width={0} height={0}src={sliderImg2} alt="" />
        </div>
      </section>
    </>
  );
}