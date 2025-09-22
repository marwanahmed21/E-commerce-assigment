"use client";
import Card from "@/components/Card/Card";
import Loading from "@/components/Loading/Loading";
import { Product } from "@/types/products.types";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Param = {
    brandsId: string;
};

export default function BrandsDetails() {
    const [brandDetails, setBrandDetails] = useState<Product[] | null>(null);
    const { brandsId } = useParams<Param>();
    const router = useRouter();

    async function getBrand() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?brand=${brandsId}`,
                method: "GET",
            };
            const { data } = await axios.request(options);
            if (data.results === 0) {
                toast.custom((t) => (
                    <div
                        className={`${
                            t.visible ? "animate-enter" : "animate-leave"
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="p-4">
                            <p className="text-sm font-medium text-gray-900">
                                Sorry, This Brand Is empty right now
                            </p>
                        </div>
                    </div>
                ));
                setTimeout(() => {
                    router.push("/brands");
                }, 2000);
            }
            setBrandDetails(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBrand();
    }, []);
    return (
        <>
            {brandDetails ? (
                <section>
                    <div className="category-details grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-0">
                        {brandDetails.map((brand) => (
                            <Card key={brand.id} productInfo={brand} />
                        ))}
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
}
