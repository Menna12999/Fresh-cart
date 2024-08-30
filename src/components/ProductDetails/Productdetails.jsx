import React ,{useEffect,useState}from 'react'
import { getSpecificProduct } from '../Apis/getSpecificProduct'
import {getProductsWithCategories} from '../Apis/getproducts'
import { useParams } from "react-router-dom";
import Items from '../Itemes/items';
import Loader from '../Loader/Loader';
import { motion } from "framer-motion";
import { Tooltip } from 'react-tooltip';
import {toast}  from 'react-toastify'
import {addToCartApi} from '../Apis/cartApi'
import useMutationCart from "../../Hooks/useMutationCart";
import { Helmet } from 'react-helmet';

export default function Productdetails() {
    let { id, categoryId } = useParams();
    let [product, setProduct] = useState([]);
    let [relatedProducts, setrelatedProducts] = useState([]);
    let [loading, setLoading] = useState(false);
    let [imgSrc, setImgSrc] = useState("");
    let [msg, setMsg] = useState("");
    let {status,mutate:addMutate,data} = useMutationCart(addToCartApi)
  
    if (status==='success') 
      toast.success(data?.data.message,{
        toastId:'success'
      })
      else{
         toast.error(data?.data.message,{
          toastId:'error'
         })
      }
    async function getSpecificProductApi() {
      setLoading(true);
      let data = await getSpecificProduct(id);
      if (data?.data) {
        setProduct(data?.data);
        setMsg("");
        setLoading(false);
      } else {
        setMsg(data);
        
      }
    }
    async function getProductsWithCategoriesApi() {
      let data = await getProductsWithCategories(categoryId);
      if (data?.data) {
        setrelatedProducts(data?.data);
        setMsg("");
        setLoading(false);
        setImgSrc(null)
      } else {
        setMsg(data);
        setLoading(true);
      }
    }
    function changeSrc(e) {
      setImgSrc(e.target.src);
    }
    useEffect(() => {
      getSpecificProductApi();
      getProductsWithCategoriesApi();
    }, [id]);
    
    if(loading)  return (<Loader/>)
   
      if(msg) return <h2 className='text-red-700 font-bold my-3'>{msg}</h2>
  return (
    <div className='container my-10'>
       <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart | Product details`}</title>
  </Helmet>
      <div className="grid  md:grid-cols-3 md:ps-11">
        <div className=" md:col-span-1 ">
          <img
            src={imgSrc ? imgSrc : product?.imageCover}
            alt={product?.title}
            className="w-full custom-border"
          />
          <ul className="flex justify-center my-3 gap-5">
            {product?.images?.map((img) => (
              <li key={img}>
                <motion.img
                  src={img}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="w-[80px] cursor-pointer"
                  onClick={changeSrc}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 p-11">
          <p className="font-extrabold main-color text-xl mb-5">{product?.category?.name}</p>
          <p className="font-extrabold text-[#21313c] text-2xl mb-5">{product?.title}</p>
          <p className=" text-[#889397] mb-5">{product?.description}</p>
          <div className="flex justify-between my-3 mn-5">
            <p className='text-[#21313c] text-xl'>
              <i className="fas fa-star text-yellow-500"></i>
              {product?.ratingsAverage}
            </p>
          </div>
          <p className='text-[#21313c] text-xl mb-5'>EGP: {product?.price}</p>
          <hr/>
          <div className="flex my-3 items-center">
          <button className='btn-details me-5'onClick={()=>{addMutate(product?._id)}}><i className='fas fa-cart-arrow-down me-2'></i>Add to Cart</button>
          <i className='fa-regular fa-heart text-xl fav-details text-[#21313c] '></i>
          </div>

        </div>
      </div>

      <h2 className='my-10 font-bold text-2xl text-[#0AAD0A] text-center'> Related Products</h2>
      <div className='gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
    {relatedProducts.map((prod=><Items ele={prod} key={prod._id}></Items>))}

    <Tooltip anchorSelect=".fav-details" place="bottom">
Add to favourite
</Tooltip>
</div>
      
    
   
    </div>
  )
}


