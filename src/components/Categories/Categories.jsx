import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { getCategories } from '../Apis/getCategories'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function Categories() {
  let {isLoading,data,isError}=useQuery({queryKey:['getCategories'],queryFn:getCategories})


  
  if(isLoading) return <Loader/>
  if(isError) return <h2 className='fa-2xl my-2 text-red-700'>{error.message}</h2>
  return (
    <div className='container'>
      <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart | Categories`}</title>
  </Helmet>
            <h2 className='my-5 font-bold text-2xl main-color text-center'>All Categories</h2>

      <div className="gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {data?.data.map(ele=><div key={ele?._id}>
        <Link to={`/specificCategory/${ele?._id}/${ele?.name}`}>
        <div className="brand p-5 cursor-pointer">
          <img src ={ele?.image} className='mx-auto h-[150px]'/>
          <p className='text-center'>{ele?.name}</p>
          </div>
        </Link>
          </div>
      )}
      </div>
    </div>
  )
}

