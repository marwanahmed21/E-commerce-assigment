import React from 'react'

export default function ProductSkeleton() {
  return (
    <section className="md:grid md:grid-cols-12 md:gap-10 p-3 md:p-0 animate-pulse">
  {/* Images skeleton */}
  <div className="col-span-4">
    <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
    <div className="flex mt-3 space-x-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-16 h-16 bg-gray-300 rounded"></div>
      ))}
    </div>
  </div>

  {/* Details skeleton */}
  <div className="col-span-8 space-y-4">
    {/* Title + category */}
    <div>
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>

    {/* Description */}
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>

    {/* Price + rating */}
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-300 rounded w-20"></div>
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-8"></div>
      </div>
    </div>

    {/* Button */}
    <div className="h-10 bg-gray-300 rounded w-full"></div>
  </div>
</section>

  )
}
