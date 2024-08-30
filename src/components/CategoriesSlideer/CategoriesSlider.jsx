import React, { useEffect,useState } from 'react'
import {getCategories} from '../Apis/getCategories'
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
export default function CategoriesSlider() {
let [categoriesArr,setCategoriesArr]=useState([]);
let [loading,setLoading]=useState(false);
let [msg,setMsg]=useState('')
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 4,
        autoplay:true,
        autoplaySpeed: 1500,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    }

    const getCategoriesApi=(async()=>{
    setLoading(true)
     let data= await getCategories()
    
    if(data?.data){
        setCategoriesArr(data?.data)
        setLoading(false)
        setMsg('')
    }
    else{
        setMsg(data)
    }
    })
    useEffect(()=>{
        getCategoriesApi()
    },[])
    useEffect(()=>{
        console.log(categoriesArr)
      },[categoriesArr])
    if(loading) 
        return <Loader></Loader>
    if(msg) 
     return <h2 className='text-red-700 font-bold my-3'>{msg}</h2>
  return (
    <div className='my-10 container'>
        <h2 className='mb-5 font-bold text-2xl text-[#373940]'>Shop Popular Categories</h2>
    <Slider {...settings}>
        {categoriesArr.map(ele=><img src={ele?.image} className='h-[150px] w-[80px]' style={{objectFit:'cover'}} key={ele?._id}/>
       
        )}
    </Slider>
    </div>
    
  )
}
