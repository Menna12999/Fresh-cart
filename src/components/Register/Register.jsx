import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Yup from 'yup';
import { userContext } from '../../Context/userContext';
export default function Register() {
  let navigate = useNavigate()
  let {setLogin} =useContext(userContext)
  const[apiError,setError] =useState('');
  const[isLoading,setLoading] = useState(false)
  function handleRegister(values) {
    setLoading(true)
    console.log(values)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then((response) => {
        console.log(response)
        if(response.data.message=='success'){
          setLoading(false)
          localStorage.setItem('userToken',response.data.token)
          setLogin(jwtDecode(response.data.token))
          setError('')
          navigate('/')

        }
        
      })
      .catch((err)=>{
        setLoading(true)
        console.log(err?.response?.data?.message)
        setError(err?.response?.data?.message)
      })
  }
  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'min lenght 3').max(10, 'max lenght 10'),
    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().required('Password is Required').matches(/^[A-z][a-z0-9]{5,10}$/, 'Password is invalid'),
    rePassword: Yup.string().required('confirm passworsd').oneOf([Yup.ref("password")], 'Not Match'),
    phone: Yup.string().required('phone is required').matches(/^(01)[0-25][0-8]{8}$/, 'Inavalid Phone')
  })
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handleRegister
  })

  return (
    <div className='bg-img pt-12'>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-center text-xl font-bold leading-tight tracking-tight main-color md:text-2xl">
                Register Now
              </p>
               {/*alert error api*/}
      {apiError ? <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  {apiError}
                </div>
              </div> : ''}
              {/* input name */}
              <div>
                <label htmlFor='name' className="block mb-2 text-sm font-medium text-gray-900">
                  Your name
                </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="name" type="text" />
              </div>
              {/* alert name */}
              {formik.errors.name && formik.touched.name ? <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  {formik.errors.name}
                </div>
              </div> : ''}
              {/* input email */}
              <div>
                <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="email" type="email" />
              </div>
              {/* alert email */}
              {formik.errors.email && formik.touched.email ? <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  {formik.errors.email}
                </div>
              </div> : ''}
              {/*input password*/}
              <div>
                <label htmlFor='password' className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="password" type="password" />
              </div>
              {/* alert password */}
              {formik.errors.password && formik.touched.password ? <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  {formik.errors.password}
                </div>
              </div> : ''}
              {/*input repassword*/}
              <div>
                <label htmlFor='rePassword' className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="rePassword" type="password" />
              </div>
              {/* alert repassword */}
              {formik.errors.rePassword && formik.touched.rePassword ? <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  {formik.errors.rePassword}
                </div>
              </div> : ''}
              {/*input phone*/}
              <div>
                <label htmlFor='phone' className="block mb-2 text-sm font-medium text-gray-900">
                  Phone
                </label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="phone" type="tel" />
              </div>
              {/* alert phone*/}
              {formik.errors.phone && formik.touched.phone ? <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  {formik.errors.phone}
                </div>
              </div> : ''}
              <div className="flex items-start">
                <div className="ml-3 text-sm">
                  <p>Already have account <Link to={'/login'} className='main-color cursor-pointer'>Log In</Link></p>
                </div>
              </div>
              <button disabled={!(formik.isValid&&formik.dirty)}
              className="w-full bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-green-800 text-white" type="submit">
                {isLoading?<i className='fas fa-spinner fa-spin mx-4'></i>:'Create an account'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
