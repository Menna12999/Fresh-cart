import React ,{useEffect,useState}from 'react'
import {getProductsWithCategories} from '../Apis/getproducts'
import { useParams } from "react-router-dom";
import Items from '../Itemes/items';
import {Helmet} from "react-helmet";

export default function SpecificCategory() {
    let { categoryId,categoryName} = useParams();
    let [specificCategory,setSpecificCategory]=useState([]);
    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState("");
  const getSpecificCartegoriesApi =(async()=>{
    let data = await getProductsWithCategories(categoryId)
    if(data?.data){
      setLoading(true)
     setSpecificCategory(data?.data)
      setLoading(false)
    }
    else {
      setMsg(data?.message)
      setLoading(false)
    }
    })
    useEffect(() => {
        getSpecificCartegoriesApi();
      }, [categoryId]);
      if(loading)  return (<Loader/>)
   
        if(msg) return <h2 className='text-red-700 font-bold my-3'>{msg}</h2>
  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart-${categoryName}-Products`}</title>
  </Helmet>
    <div className='container my-10 gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
    {specificCategory?.length?specificCategory.map((prod=><Items ele={prod} key={prod._id}></Items>)):
    <div className='text-center my-5 main-color text-xl font-bold'>Category is Empty</div>
    }
</div>
    </>
  )
}
