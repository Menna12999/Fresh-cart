import React from "react";
import useQueryCart from '../../Hooks/useQuerryCart'
import Loader from '../Loader/Loader'
import {addToCartApi} from '../Apis/cartApi'
import cartEmpty from '../../assets/images/cart.jpg'
import BasicModal from "../Basicmodal/BasicModal";
import { Helmet } from "react-helmet";
import { deleteWhishlist, getWhishListApi } from "../Apis/getWhishListApi";
import useMutationWhishList from './../../Hooks/useMutationWhishList';
import useMutationCart from "../../Hooks/useMutationCart";
import {toast}  from 'react-toastify'

export default function Whishlist(){
    let {status:dataCart,mutate:addMutate,isPending:addPending,data:cartItem} = useMutationCart(addToCartApi)
  let {isLoading,data,isError,error}=useQueryCart('getWhishList',getWhishListApi)
 let {mutate:delmutate,status,isPending:delpending,data:delData} = useMutationWhishList(deleteWhishlist)

if (isLoading||delpending||addPending) return <Loader/>

  return (
    <div className="container my-10">
       <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart | Whishlist`}</title>
  </Helmet>
    {data?.count>0?<div className="my-4">
      <h1 className="text-3xl text-main text-center my-5">Favourite Item : {data?.count}</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Add to cart
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item)=>{
               return <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td className="p-4">
                 <img
                   src={item?.imageCover}
                   className="w-16 md:w-32 max-w-full max-h-full"
                   alt= {item?.title}
                 />
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                 {item?.title}
               </td>
             
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                 {item?.price}  EGP
               </td>
               <td className="px-6 py-4">
                 <button onClick={()=>delmutate(item?._id)}
                   className="font-medium text-red-600 dark:text-red-500 bg-gray-100 p-3"
                 >
                   Remove
                 </button>
               </td>
               <td className="px-6 py-4">
                 <button onClick={()=>addMutate(item?._id)}
                   className="font-medium text-green-600 dark:text-green-500 bg-gray-100 p-3"
                 >
                   Add to cart
                 </button>
               </td>
             </tr>
            })}
           
          </tbody>
        </table>
      </div>
    </div>
    : 
    <div className='text-center my-5 main-color text-xl font-bold'>Favourite is Empty <img  src={cartEmpty} className='h-[500px] mx-auto'/></div>

    }
 
    </div>
  );
}
