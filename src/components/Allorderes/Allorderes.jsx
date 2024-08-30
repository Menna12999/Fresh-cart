import React, { useEffect,useContext, useState } from 'react'
import {getAllOrderes} from '../Apis/payment'
import { userContext } from '../../Context/userContext';
import axios from 'axios';
import { Helmet } from 'react-helmet';
export default function Allorderes() {
    let {isLogin,setLogin} = useContext(userContext)
    let[orderArr,setOrderArr] = useState([])

    const getAllordersesApi=async(id)=>{
        let {data} = await getAllOrderes(isLogin.id);
      setOrderArr(data)
      console.log(orderArr)
    }
    useEffect(()=>{
     getAllordersesApi()
    })
  return (
    <div>
      <div className="container">
       <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart | All orders`}</title>
  </Helmet>
    {orderArr?<div className="my-4">
      <h1 className="text-3xl text-main text-center my-5">Num of items : {orderArr?.length}</h1>
    
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
            
            </tr>
          </thead>
          <tbody>
            {orderArr?.map((item)=>{
               return <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td className="p-4">
                 <img
                   src={item?.cartItems?.product?.imageCover}
                   className="w-16 md:w-32 max-w-full max-h-full"
                   alt= {item?.cartItems?.category?.name}
                 />
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                 {item?.cartItems?.category?.name}
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
   
    </div>
    </div>
  )
}
