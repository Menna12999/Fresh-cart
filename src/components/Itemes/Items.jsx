import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import {toast}  from 'react-toastify'
import useMutationCart from '../../Hooks/useMutationCart';
import {addToCartApi} from '../Apis/cartApi'
import useMutationWhishList from '../../Hooks/useMutationWhishList';
import { addToWhishListApi } from '../Apis/getWhishListApi';
export default function Items({ ele }) {
let {status,mutate:addMutate,data} = useMutationCart(addToCartApi)
let {status:msg,mutate:addFav,data:favData} = useMutationWhishList(addToWhishListApi)
let[fav,setFav] =useState(false)

if (status==='success') 
toast.success(data?.data.message,{
  toastId:'success'
})
else{
   toast.error(data?.data.message,{
    toastId:'error'
   })
}
if (msg==='success') 
  toast.success(favData?.data.message,{
    toastId:'success-fav'
  })
  else{
     toast.error(favData?.data.message,{
      toastId:'error-fav'
     })
  }
  function handleFav(){
    setFav(!fav)
  }
 
  return (

    <div className="product relative p-20">
      <i className={`${!fav?'text-green-600':'text-red-600'} fas fa-heart text-xl absolute top-2 right-2 fav-icon cursor-pointer`} onClick={()=>{addFav(ele?._id);handleFav()}}></i>
      <Link to ={`/productDetails/${ele?._id}/${ele?.category?._id}`}>
      <img className='w-full' src={ele?.imageCover} alt={ele?.title} />
      <h2 className='font-extrabold main-color'>{ele?.category?.name}</h2>
      <p className='line-clamp-1'>{ele?.title}</p>
      <div className="flex justify-between my-3">
        <span>{ele?.price} EGP</span>
        <span><i className='fas fa-star text-yellow-500'></i>{ele?.ratingsAverage}</span>
      </div>
      </Link>
      <div className="w-full flex justify-center">
        <button className='btn' onClick={()=>addMutate(ele?._id)}>Add to Cart</button>
       </div>
      </div>
  


  )
}
