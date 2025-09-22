import { CartState } from "@/types/cart.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState: CartState = {
cart : null,
cartInfo: null
}

export const addProductToCart = createAsyncThunk('cart/addToCart', async ({productId , token}:{productId:string, token:string},{dispatch})=>{
    
    
const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      
const {data} = await axios.request(options)
dispatch(getCartInfo(token))
return data
})

export const getCartInfo = createAsyncThunk('cart/cartInfo', async (token:string)=>{
   
    
    
const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
       
      };
const {data} = await axios.request(options)
return data
})

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async ({productId , token}:{productId:string, token:string},{dispatch})=>{
    const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
    }
dispatch(getCartInfo(token))
    const {data} = await axios.request(options)
    return data
})

export const clearCart = createAsyncThunk('cart/clearCart', async (token:string)=>{
    const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/cart',
        method:'DELETE',
        headers: {
            token,
        }
    }

    const {data} = await axios.request(options)
    return data
})

export const updateProductCount = createAsyncThunk('cart/updateProductCount',async ({productId, count,token}:{productId:string, count:number,token:string})=>{
     const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      const { data } = await axios.request(options);
      return data
})


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(addProductToCart.fulfilled, (state, action)=>{
            if (action.payload.message === "Product added successfully to your cart") {
                toast.success(action.payload.message)
                state.cart = action.payload
                
            }
            
        })
        builder.addCase(addProductToCart.rejected, (state, action)=>{
            console.log({state,action});
            
        })

         builder.addCase(getCartInfo.fulfilled, (state, action)=>{
state.cartInfo = action.payload          
            
        })
        builder.addCase(getCartInfo.rejected, ()=>{
            
        })

         builder.addCase(removeItemFromCart.fulfilled, (_, action)=>{
if (action.payload.status === 'success') {
    toast.success('Product removed Successfully')
}
         
            
        })
        builder.addCase(removeItemFromCart.rejected, (state, action)=>{
            console.log({state,action});
            
        })
         builder.addCase(clearCart.fulfilled, (_, action)=>{
            
if (action.payload.message === 'success') {
    toast.success('Your cart is now empty')
}
         
            
        })
        builder.addCase(clearCart.rejected, (state, action)=>{
            console.log({state,action});
            
        })
         builder.addCase(updateProductCount.fulfilled, ()=>{

         
            
        })
        builder.addCase(updateProductCount.rejected, ()=>{
            
        })
    }
})

export const cartReducer = cartSlice.reducer;