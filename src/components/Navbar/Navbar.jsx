import React, { useContext, useState } from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/freshcart-logo.svg'
import {userContext} from '../../Context/userContext'
import useQueryCart from '../../Hooks/useQuerryCart';
import { getCartApi } from '../Apis/cartApi';
import { Tooltip } from 'react-tooltip';
import { getWhishListApi } from "../Apis/getWhishListApi";
export default function Navbar() {
  let {isLogin,setLogin} =useContext(userContext)
  let {data:addedData}=useQueryCart('getWhishList',getWhishListApi)
  const[open,setOpen]=useState(false);
  let navigate = useNavigate();
  let {isLoading,data,isError,error}=useQueryCart('getcart',getCartApi)

  function toggle(){
    
      setOpen(!open);
    
  }
  function LogOut(){
    localStorage.removeItem('userToken');
    setLogin(null)
    navigate('/login')
  }
  return (
    <nav className='py-4 bg-[#f0f3f2]'>
      <div className='container justify-between items-center md:flex relative'>
        <div className='md:flex gap-2 items-center'>
        <img src={logo} alt='' className='w-[130] '/>
        {isLogin? <ul className={`md:flex gap-4 ${open?'block':'hidden'}`}>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/products'}>Products</NavLink></li>
        <li><NavLink to={'/categories'}>Categories</NavLink></li>
        <li><NavLink to={'/brands'}>Brand</NavLink></li>
      </ul>:null}
     
    </div>
      <div>
      <ul className={`md:flex gap-4 ${open?'block':'hidden'}`}>
        {!isLogin?<>
          <li><NavLink to={'/login'}>Login</NavLink></li>
          <li ><NavLink to={'/register'}>Register</NavLink></li>
          <li className='gap-4 flex'>
        <a href=''><i className='fab fa-facebook-f'></i></a>
        <a href=''><i className='fab fa-twitter'></i></a>
        <a href=''><i className='fab fa-google'></i></a>
        <a href=''><i className='fab fa-instagram'></i></a></li></>
          :
          <>
          <li className='relative me-2'><Link to={'/whishlist'}><i className='fas fa-heart'></i></Link>
          <span className='absolute bottom-3 left-3 flex justify-center items-center min-w-[25px] min-h-[25px] rounded-full bg-green-700 text-white'>{addedData?.count}</span></li>
          <li className='relative me-2'><Link to={'/cart'}><i className='fas fa-cart-shopping'></i></Link>
          <span className='absolute bottom-3 left-3 flex justify-center items-center min-w-[25px] min-h-[25px] rounded-full bg-green-700 text-white'>{data?.numOfCartItems?data?.numOfCartItems:0}</span></li>
          <li onClick={LogOut} className='cursor-pointer'> |<i class="fa-solid fa-user ms-2 log-out"></i> {isLogin?<b className='text-green-700'>hi {isLogin.name}</b>:''}</li>
          
          </>
          }
       
        

        </ul>
        </div>
        <i onClick={toggle} className={`${!open?'fa-bars':'fa-close'} md:hidden block fas fa-2x absolute top-0 right-2 cursor-pointer>`}></i>
      </div>
      <Tooltip anchorSelect=".log-out" place="bottom">
Log-out
</Tooltip>
    </nav>
  )
}
