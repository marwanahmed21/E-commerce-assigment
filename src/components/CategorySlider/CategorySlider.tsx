'use client'
import  { useEffect } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { getCategories } from "@/store/feature/categories.slice";
import Image from "next/image";
import Link from "next/link";

export default function CategorySlider() {
    const categories = useAppSelector((store)=> store.categoriesReducer.categories)
const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, []);
  return (
    <>
      <section className="my-8 text-center md:text-start">
        <h2 className="text-lg font-semibold text-gray-500 mb-2">
          Categories
        </h2>
        {!categories ? (
          <Loading />
        ) : (
          <Swiper breakpoints={
            {320:{
            slidesPerView:1
          },
          480:{
            slidesPerView:3
          },
          640:{
            slidesPerView:4
          },
          860:{
            slidesPerView:6
          }
          
          }} loop={true}>
            {categories.map((category) => (
              <SwiperSlide key={category._id}>
                <div className="h-80 cursor-pointer mb-3">
<Link href={`categories/${category._id}`} >
                  <Image
                  style={{width:'100%', height:"100%", objectFit:'cover'}}
                  width={0}
                  height={0}
                  priority
                    src={category.image}
                    alt={category.name}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </Link>
                </div>

                <h3 className="text-center">{category.name}</h3>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  );
}