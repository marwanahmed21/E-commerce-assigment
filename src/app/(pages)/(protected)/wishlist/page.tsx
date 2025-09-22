'use client'
import Loading from "@/components/Loading/Loading"
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook"
import { getWishListInfo, removeProductFromWishList } from "@/store/feature/wishlist.slice"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export default function WishList() {
    const token = useAppSelector((store)=> store.userReducer.token)
    const dispatch = useAppDispatch()
    const wishList = useAppSelector((store)=> store.wishListReducer.wishListInfo)

    useEffect(()=>{
        if (token) {
            dispatch(getWishListInfo(token))
        }
    },[wishList])



  return (
    <>
  {wishList === null ? <Loading/> : <section className="my-8 px-4 md:px-0">
    <h1 className="mb-4 font-semibold text-xl text-gray-500">Your wishlist:</h1>
    
    {wishList.count === 0 ?
     <div className="bg-gray-100 rounded-md  mt-5 shadow p-8 flex flex-col justify-center items-center gap-4">
     <h2>
       Oops! Your Wishlist is empty. Start shopping now by clicking the
       button below and find something you love!
     </h2>
     <Link href={"/"} className="btn bg-yellow-400 hover:bg-yellow-500">
       {" "}
       Back To Home
     </Link>
   </div>
    : 
    <div className="wishlist p-4 border-solid border-2 border-gray-400 border-opacity-25 rounded-lg">
    <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {wishList.data.map((wishList) => (
                  <div
                    key={wishList._id}
                    className="product-item overflow-hidden border-solid border-2 border-gray-400 border-opacity-30 rounded-lg"
                  >
                    <Image
                    width={0}
                  height={0}
                  style={{ width: "100%", height: "90px", objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                      src={wishList.imageCover}
                      alt={wishList.title}
                    />
                    <div className="p-3">
                      <h3 className="text-lg font-semibold text-gray-500 line-clamp-1">
                        <Link href={`/product/${wishList.id}`}>
                          {wishList.title}
                        </Link>
                      </h3>
                      <div className="flex mt-2 justify-between items-center">
                        <span>{wishList.price} L.E</span>
                        <button
                        onClick={()=>{
                            if (token) {
                                dispatch(removeProductFromWishList({productId:wishList.id, token}))
                            }
                        }}
                         className="btn bg-red-600 text-sm px-2 py-1 cursor-pointer "><i className="fa-solid fa-trash-can mr-2"></i>remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        
    </div>}
  
    </section>}
  </>
  )
}
