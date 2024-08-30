import React from 'react'
import error from '../../assets/error.svg'
export default function Notfound() {
  return (
    <div className='text-center my-4'>
      <h2 className='text-center my-3 text-2xl'>NotFound</h2>
      <img src={error} className='mx-auto'/>
    </div>
  )
}