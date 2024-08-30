import React from 'react'
import Featuredproducts from '../FeaturedProducts/Featuredproducts'
import Mainslider from '../Mainslider/Mainslider'
import CategoriesSlider from '../CategoriesSlideer/CategoriesSlider'
import { Helmet } from 'react-helmet'
export default  function Home() {
 
  return (
    <>
     <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart | Home`}</title>
  </Helmet>
    <Mainslider/>
    <CategoriesSlider/>
     <Featuredproducts/>
    </>
  )
}
