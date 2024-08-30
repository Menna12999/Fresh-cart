import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import axios from "axios";
import * as Yup from 'yup';
export default function Forgetpassword() {
  let navigate = useNavigate()
  const [apiError, setError] = useState('');
  const [isLoading, setLoading] = useState(false)
  const handleForgetpassword=(async(values)=>{
    try{
        setLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        console.log(data)
        if(data.statusMsg=='success'){
            setError('')
            navigate('/reset')
        }
    }
    catch(error){
    setLoading(false)
    console.log(error?.response?.data?.message)
     setError(error?.response?.data?.message)
    }
 
  }) 
   
  let validationSchema = Yup.object({
    email: Yup.string().email('invalid email').required('email is required'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: handleForgetpassword
  })

  return (
    <div className='bg-img pt-12 h-[100vh]'>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-center text-xl font-bold leading-tight tracking-tight main-color md:text-2xl">
                Forget password 
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
              
           
               
             
              <button disabled={!(formik.isValid&&formik.dirty)}
                className="w-full bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-green-800 text-white" type="submit">
                {isLoading ? <i className='fas fa-spinner fa-spin mx-4'></i> : 'Send Code'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
