import React,{useEffect,useState} from 'react'
import Featuredproducts from '../FeaturedProducts/Featuredproducts'
import { getCategories } from '../Apis/getCategories';
import { getProductsWithCategories } from '../Apis/getproducts';
import { getProducts } from '../Apis/getproducts'
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';
export default function Products() {
  let [categoriesArr,setCategoriesArr]=useState([]);
let [loading,setLoading]=useState(false);
let [error, setError] = useState('')

const [searchValue, setSearchValue] = useState("");

let [msg,setMsg]=useState('')
async function getCategoriesApi(){
setLoading(true)
let data= await getCategories();
if(data?.data){
setCategoriesArr(data?.data)
setMsg('')
setLoading(false)
}
else {
  setMsg(data?.message)
  setLoading(false)
}
    }
    useEffect(()=>{
      getProductsApi()
    },[])

    const getProductsApi = (async () => {
      setLoading(true)
      let data = await getProducts()
      console.log(data)
      if (data?.data) {
        setCategoriesArr(data?.data)
        setError('')
        setLoading(false)
      }
      else {
        setError(data)
      }
    })
const filteredProducts = categoriesArr?.filter((item) =>
  item?.category?.name.toLowerCase().includes(searchValue.toLowerCase())
);
if(loading) return <Loader/>
if(msg) return <h2 className='text-red-700 font-bold my-3'>{msg}</h2>

return (
  <>
   <Helmet>
    <meta charSet="utf-8" />
    <title>{`FreshCart | Products`}</title>
  </Helmet>
  
<div className="max-w-md mx-auto mt-[5rem]">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input value={searchValue} onChange={(e) => {
              setSearchValue(e.target.value);
            }} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search for products"/>
    <button className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>
  </div>
</div>
  <Featuredproducts filterArr={filteredProducts}/>
  
  </>
)
}