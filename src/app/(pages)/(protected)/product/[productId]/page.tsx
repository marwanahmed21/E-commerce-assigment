"use client";
import Card from "@/components/Card/Card";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import {
    getProductDetails,
    getRelatedProducts,
} from "@/store/feature/products.slice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { addProductToCart } from "@/store/feature/cart.slice";
import RelatedProductsSkeleton from "@/components/RelatedProductsSkeleton/RelatedProductsSkeleton";
import ProductSkeleton from "@/components/ProductSkeleton/ProductSkeleton";

type Params = {
    productId: string;
};

export default function ProductDetails() {
    const { productId } = useParams<Params>();
    const dispatch = useAppDispatch();
    const productDetails = useAppSelector(
        (store) => store.productsReducer.product
    );
    const relatedProducts = useAppSelector(
        (store) => store.productsReducer.relatedProducts
    );

    const token = useAppSelector((store)=> store.userReducer.token)


    useEffect(() => {
        dispatch(getProductDetails(productId));
    }, []);

    useEffect(() => {
        if (productDetails === null) return;

        dispatch(getRelatedProducts(productDetails.category._id));
    }, [productDetails]);

    return (
        <>
            {productDetails ? (
                <>
                    <section className="md:grid md:grid-cols-12 md:gap-10 p-3 md:p-0">
                        <div className="col-span-4">
                            <ReactImageGallery
                                showNav={false}
                                showPlayButton={false}
                                items={productDetails.images.map((image) => {
                                    return {
                                        original: image,
                                        thumbnail: image,
                                    };
                                })}
                            />
                        </div>

                        <div className="col-span-8 space-y-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-500">
                                    {productDetails.title}
                                </h2>
                                <h3 className="text-yellow-300">
                                    {productDetails.category.name}
                                </h3>
                            </div>
                            <p className="text-gray-400">
                                {productDetails.description}
                            </p>
                            <div className=" flex justify-between items-center">
                                <span>{productDetails.price} L.E</span>
                                <div className="">
                                    <i className="fa-solid fa-star text-yellow-300 mr-2"></i>
                                    <span>{productDetails.ratingsAverage}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                 if (token) {
                                    dispatch(addProductToCart({productId: productDetails.id,token}))
                                 }
                                }}
                                className="btn bg-green-600 hover:bg-green-700 transition-colors duration-300 font-semibold w-full cursor-pointer"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </section>

                    <section>
                        <h2 className="my-6 font-semibold text-2xl text-gray-600">
                            Related Products
                        </h2>
                        {relatedProducts ? (
                            <Swiper
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                    },
                                    480: {
                                        slidesPerView: 3,
                                    },
                                    640: {
                                        slidesPerView: 3,
                                    },
                                    860: {
                                        slidesPerView: 4,
                                    },
                                }}
                                spaceBetween={20}
                                loop={true}
                            >
                                {relatedProducts.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <Card productInfo={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <RelatedProductsSkeleton />
                        )}
                    </section>
                </>
            ) : (
                <ProductSkeleton />
            )}
        </>
    );
}

