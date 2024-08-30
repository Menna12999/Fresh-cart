import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Brands() {
  function getBrands (){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let {isLoading,data,isError,error,isFetching}=useQuery({queryKey:['getbrands'],queryFn:getBrands})
  if(isLoading) return <Loader/>
  if(isError) return <h2 className='fa-2xl my-2 text-red-700'>{error.message}</h2>
  return (
    <div className='container'>
       <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart | Brands`}</title>
  </Helmet>
            <h2 className='my-5 font-bold text-2xl main-color text-center'>All Brands</h2>

      <div className="gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {data?.data?.data.map(ele=><div key={ele?._id}>
         <Link  to={`/specificbrands/${ele?._id}/${ele?.name}`}>
         <div className="brand p-5">
          <img src ={ele?.image} className='mx-auto'/>
          <p className='text-center'>{ele?.name}</p>
          </div></Link>
          </div>
      )}
      </div>
    </div>
  )
}
