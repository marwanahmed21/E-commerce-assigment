"use client";
import Loading from "@/components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { getCategories } from "@/store/feature/categories.slice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Categories() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (store) => store.categoriesReducer.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      {categories ? (
        <section>
          <div className="grid sm:grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-4 md:px-0 ">
            {categories.map((category) => (
              <div
                onClick={() => {
                  router.push(`categories/${category._id}`);
                }}
                key={category._id}
                className="category-item border-solid border-2 border-gray-400 border-opacity-30 rounded-md overflow-hidden cursor-pointer"
              >
                <Image
                  src={category.image}
                  alt="Product Image"
                  priority
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="title text-center my-4">
                  <Link
                    href={`categories/${category._id}`}
                    className="text-gray-500 font-semibold text-2xl"
                  >
                    {category.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
