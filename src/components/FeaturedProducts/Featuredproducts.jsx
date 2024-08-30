import React, { useEffect, useState } from 'react'
import { getProducts } from '../Apis/getproducts'
import Loader from '../Loader/Loader'
import Items from '../Itemes/items'
export default function Featuredproducts({filterArr}) {
  let [productArr, setProductArr] = useState([])
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState('')
  const getProductsApi = (async () => {
    setLoading(true)
    let data = await getProducts()
    console.log(data)
    if (data?.data) {
      setProductArr(data?.data)
      setError('')
      setLoading(false)
    }
    else {
      setError(data)
    }
  })
  useEffect(() => {
    getProductsApi()
  }, [])
  if(loading) return <Loader/>
  if(error) return <h2 className='text-red-700 font-bold my-3'>{error}</h2>
  return (
    <div className='container my-20'>
      <h2 className='mb-5 font-bold text-2xl text-[#373940]'>Featured Products</h2>
      <div className='gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
      {filterArr?.length?filterArr.map((prod)=><Items key={prod?._id} ele={prod}></Items>):
        productArr.map((prod)=><Items key={prod?._id} ele={prod}></Items>)}
     </div>
    </div>
  )
}
