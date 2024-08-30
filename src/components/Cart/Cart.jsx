import React from "react";
import useQueryCart from '../../Hooks/useQuerryCart'
import Loader from '../Loader/Loader'
import {deleteCartApi, getCartApi,updateCartApi,clearCartApi} from '../Apis/cartApi'
import useMutationCart from "../../Hooks/useMutationCart";
import cartEmpty from '../../assets/images/cart.jpg'
import BasicModal from "../Basicmodal/BasicModal";
import { Helmet } from "react-helmet";
export default function Cart(){
  let {isLoading,data,isError,error}=useQueryCart('getcart',getCartApi)
 let {mutate:delmutate,status,isPending:delpending} = useMutationCart(deleteCartApi)
 let {mutate:updatemutate,isPending:uppendenin} = useMutationCart(updateCartApi)
 let {mutate:clrmutate,isPending:clrpending} = useMutationCart(clearCartApi)
//  if(status==='success'){
//   console.log('deleted')
//  }
 
if (isLoading||delpending||uppendenin||clrpending) return <Loader/>
if (!data?.numOfCartItems) return <div className='text-center my-5 main-color text-xl font-bold'>Cart is Empty <img  src={cartEmpty} className='h-[500px] mx-auto'/></div>
  return (
    <div className="container">
       <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart | Cart`}</title>
  </Helmet>
    <button className="bg-red-700 p-4 text-white my-3" onClick={()=>clrmutate()}>Clear Cart</button>
    {data?.numOfCartItems?<div className="my-4">
      <h1 className="text-3xl text-main text-center my-5">Cart items : {data?.numOfCartItems}</h1>
      <p className="text-xl text-center my-5 text-slate-500 font-extrabold">Total Price: <span className="font-medium">{data?.data?.totalCartPrice} EGP</span></p>
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
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.products?.map((item)=>{
               return <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td className="p-4">
                <span>{item?.product?.quantity}</span>
                 <img
                   src={item?.product?.imageCover}
                   className="w-16 md:w-32 max-w-full max-h-full"
                   alt= {item?.product?.title}
                 />
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                 {item?.product?.title}
               </td>
               <td className="px-6 py-4">
                 <div className="flex items-center">
                   <button onClick={()=>{
                   {item?.count==1?delmutate(item?.product?._id):updatemutate({id:item?.product?._id,count:item?.count?item?.count-1:item?.count})}}
                   }
                     className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                     type="button"
                   >
                    
                     <span className="sr-only">Quantity button</span>
                     <svg
                       className="w-3 h-3"
                       aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 18 2"
                     >
                       <path
                         stroke="currentColor"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth={2}
                         d="M1 1h16"
                       />
                     </svg>
                   </button>
                   <div>
                     <input
                       type="number"
                       id="first_product"
                       className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={item?.count}
                       required
                     />
                   </div>
                   <button onClick={()=>{
                   {item?.product?.count==item?.product?.quantity?item?.count:updatemutate({id:item?.product?._id,count:item?.count+1})}
                   }}
                     className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                     type="button"
                   >
                     <span className="sr-only">Quantity button</span>
                     <svg
                       className="w-3 h-3"
                       aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 18 18"
                     >
                       <path
                         stroke="currentColor"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth={2}
                         d="M9 1v16M1 9h16"
                       />
                     </svg>
                   </button>
                 </div>
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                 {item?.price}  EGP
               </td>
               <td className="px-6 py-4">
                 <button onClick={()=>delmutate(item?.product?._id)}
                   className="font-medium text-red-600 dark:text-red-500 bg-gray-100 p-3"
                 >
                   Remove
                 </button>
               </td>
             </tr>
            })}
           
          </tbody>
        </table>
      </div>
    </div>
    : 
    <div>
     Cart is Empty
    </div>

    }
    <BasicModal cartId={data?.data?._id}/>
    </div>
  );
}
