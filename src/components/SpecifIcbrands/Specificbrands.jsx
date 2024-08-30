import React ,{useEffect,useState}from 'react'
import {getProductsWithBrands} from '../Apis/getproducts'
import { useParams } from "react-router-dom";
import Items from '../Itemes/items';
import {Helmet} from "react-helmet";

export default function Specificbrands() {
    let { brandId,brandName} = useParams();
    let [specificbrands,setSpecificBrands]=useState([]);
    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState("");
  const getSpecificCartegoriesApi =(async()=>{
    let data = await getProductsWithBrands(brandId)
    if(data?.data){
      setLoading(true)
     setSpecificBrands(data?.data)
      setLoading(false)
    }
    else {
      setMsg(data?.message)
      setLoading(false)
    }
    })
    useEffect(() => {
        getSpecificCartegoriesApi();
      }, [brandId]);
      if(loading)  return (<Loader/>)
   
        if(msg) return <h2 className='text-red-700 font-bold my-3'>{msg}</h2>
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{`FreshCart-${brandName}-Products`}</title>
      </Helmet>
    <div className='container my-10 gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
    {specificbrands?.length?specificbrands.map((prod=><Items ele={prod} key={prod._id}></Items>)):
    <div className='text-center my-5 main-color text-xl font-bold'>brands is Empty</div>
    }
</div>
</>
  )
}
