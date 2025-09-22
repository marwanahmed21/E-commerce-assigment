"use client";
import Card from "@/components/Card/Card";
import Loading from "@/components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { getCartInfo } from "@/store/feature/cart.slice";
import { getProducts } from "@/store/feature/products.slice";
import { Product } from "@/types/products.types";
import { useEffect, useState } from "react";

export default function Products() {
  const products = useAppSelector((store) => store.productsReducer.products);
  const token = useAppSelector((store) => store.userReducer.token);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [filterProducts, setFilterProducts] = useState<Product[] | null>(null);

  // handleSearchOnChange
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);
    const filtered = products?.filter((product) => {
      return product.title.toLowerCase().includes(search);
    });
    return setFilterProducts(filtered ?? []);
  };

  useEffect(() => {
    dispatch(getProducts());
    if (token) {
      dispatch(getCartInfo(token));
    }
  }, []);
  return (
    <>
      <div className="search grow w-3/4 mx-auto my-5">
        <input
          className="form-control"
          value={searchValue}
          onChange={onChange}
          type="search"
          placeholder="search products..."
        />
      </div>
      <section className=" p-3 md:p-0 my-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {filterProducts?.length === 0 ? (
          <div className="flex justify-center items-center bg-slate-200 col-span-12 p-4">
            <p className="text-2xl">
              No result found for:{" "}
              <span className="text-vioconst-300">{searchValue}</span>
            </p>
          </div>
        ) : (
          <>
            {filterProducts ? (
              filterProducts.map((product) => (
                <Card key={product._id} productInfo={product} />
              ))
            ) : (
              <>
                {products ? (
                  products.map((product: Product) => (
                    <Card key={product._id} productInfo={product} />
                  ))
                ) : (
                  <Loading />
                )}{" "}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}
