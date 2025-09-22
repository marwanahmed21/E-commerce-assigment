import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";


export default function RelatedProductsSkeleton() {
  return (
    <Swiper
  breakpoints={{
    320: { slidesPerView: 1 },
    480: { slidesPerView: 3 },
    640: { slidesPerView: 3 },
    860: { slidesPerView: 4 },
  }}
  spaceBetween={20}
  loop={true}
>
  {[...Array(4)].map((_, i) => (
    <SwiperSlide key={i}>
      <div className="animate-pulse">
        {/* صورة المنتج */}
        <div className="w-full h-40 bg-gray-300 rounded-md mb-3"></div>
        {/* عنوان */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        {/* وصف قصير */}
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
        {/* السعر */}
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
  )
}
