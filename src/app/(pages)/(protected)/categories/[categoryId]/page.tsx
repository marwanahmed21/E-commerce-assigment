"use client";
import Card from "@/components/Card/Card";
import Loading from "@/components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { getCategory } from "@/store/feature/categories.slice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Param = {
    categoryId: string;
};

export default function CategoryDetails() {
    const { categoryId } = useParams<Param>();
    const dispatch = useAppDispatch();
    const categoryDetails = useAppSelector(
        (store) => store.categoriesReducer.category
    );

    useEffect(() => {
        dispatch(getCategory(categoryId));
    }, []);
    return (
        <>
            {categoryDetails?.length === 0 ? (
                <div className="bg-gray-100 rounded-md  mt-5 shadow p-8 flex flex-col justify-center items-center gap-4 ">
                    <h2>
                        Oops! This Category is empty Now . Will be Added soon
                    </h2>
                    <Link
                        href={"/categories"}
                        className="btn bg-yellow-400 hover:bg-yellow-500"
                    >
                        {" "}
                        Back To Categories
                    </Link>
                </div>
            ) : (
                <>
                    {categoryDetails ? (
                        <>
                            <section>
                                <div className="category-details grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-4 md:px-0">
                                    {categoryDetails.map((category) => (
                                        <Card
                                            key={category.id}
                                            productInfo={category}
                                        />
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : (
                        <Loading />
                    )}
                </>
            )}
        </>
    );
}
