import React from 'react'
import Slider from 'react-slick'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import banner1 from '../../assets/images/ad-banner-1.jpg'
import banner2 from '../../assets/images/ad-banner-2.jpg'

export default function Mainslider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
      
    };
    return (
        <div className='container my-10  grid md:grid-cols-3 sm:grid-cols-1  max-sm:grid-cols-1  md:gap-4 '>

            <Slider {...settings} className='md:col-span-2 max-sm:col-span-1 max-sm:mb-10 sm:mb-5'>
                <img src={slider1} alt='' className='w-full h-[420px] object-cover rounded-lg' />
                <img src={slider2} alt='' className='w-full h-[420px] object-cover  rounded-lg' />
                <img src={slider3} alt='' className='w-full h-[420px] object-cover  rounded-lg' />
            </Slider>


            <div className="banner">
                <img src={banner1} alt='' className='w-full h-[200px]  rounded-lg mb-5 ' />
                <img src={banner2} alt='' className='w-full  h-[200px]  rounded-lg ' />

            </div>

        </div>
    )
}