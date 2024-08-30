import { useState } from 'react'
import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserContextProvider from './Context/userContext';
import Forgetpassword from './components/Forgetpassword/Forgetpassword';
import Resetcode from './components/Resetcode/Resetcode';
import Newpassword from './components/Newpassword/Newpassword'
import ProtectedRouting from './components/ProtectedRouting/ProtectedRouting';
import Productdetails from './components/ProductDetails/Productdetails';
import Notfound from './components/Notfound/Notfound';
import 'react-toastify/dist/ReactToastify.css';
import  {ToastContainer} from 'react-toastify';
import Allorderes from './components/Allorderes/Allorderes';
import Categories from './components/Categories/Categories';
import SpecificCategory from './components/SpecificCategory/SpecificCategory';
import Specificbrands from './components/SpecifIcbrands/Specificbrands';
import WhishList from './components/Whishlist/Whishlist';


function App() {
let routes =  createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
  {index:true,element:<ProtectedRouting><Home/></ProtectedRouting>},
  {path:'/home',element:<ProtectedRouting><Home/></ProtectedRouting>},
  {path:'/products',element:<ProtectedRouting><Products/></ProtectedRouting>},
  {path:'/brands',element:<Brands/>},
  {path:'/login',element:<Login/>},
  {path:'/register',element:<Register/>},
  {path:'/forgetpassword',element:<Forgetpassword/>},
  {path:'/reset',element:<Resetcode/>},
  {path:'/newpass',element:<Newpassword/>},
  {path:'/productdetails/:id/:categoryId',element:<Productdetails/>},
  {path:'/specificCategory/:categoryId/:categoryName',element:<SpecificCategory/>},
  {path:'/specificbrands/:brandId/:brandName',element:<Specificbrands/>},
  {path:'/cart',element:<ProtectedRouting><Cart/></ProtectedRouting>},
  {path:'/categories',element:<Categories></Categories>},
  {path:'/whishlist',element:<WhishList></WhishList>},
  {path:'/allorders',element:<Allorderes></Allorderes>},
  {path:'*',element:<Notfound></Notfound>}
  ]}
])
  return (
    <UserContextProvider>
   <RouterProvider router={routes}></RouterProvider>
   <ToastContainer autoClose={500}/>
   </UserContextProvider>
  )
}

export default App
