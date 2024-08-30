import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Yup from 'yup';
import { userContext } from '../../Context/userContext';
export default function Login() {
  let navigate = useNavigate()
  let { setLogin } = useContext(userContext)
  const [apiError, setError] = useState('');
  const [isLoading, setLoading] = useState(false)
  function handleLogin(values) {
    setLoading(true)
    console.log(values)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((response) => {
        console.log(response)
        if (response.data.message == 'success') {
          setLoading(false)
          localStorage.setItem('userToken', response.data.token)
          setLogin(jwtDecode(response.data.token))
          setError('')
          navigate('/')

        }

      })
      .catch((err) => {
        setLoading(true)
        console.log(err?.response?.data?.message)
        setError(err?.response?.data?.message)
      })
  }
  let validationSchema = Yup.object({
    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().required('Password is Required').matches(/^[A-z][a-z0-9]{5,10}$/, 'Password is invalid'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  })

  return (
    <div className='bg-img pt-12 h-[100vh]'>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-center text-xl font-bold leading-tight tracking-tight main-color md:text-2xl">
                Login Now
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
              {formik.errors.email && formik.touched.name ? <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
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
              <div className="ml-3 text-sm">
                <p>Don't have Account <Link to='/register' className='main-color font-bold cursor-pointer'>Register</Link></p>
                <p className="text-center mt-5"><Link className="main-color font-bold underline" to='/forgetPassword'>Forget Password</Link></p>
              </div>

              <button disabled={!(formik.isValid && formik.dirty)}
                className="w-full bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-green-800 text-white" type="submit">
                {isLoading ? <i className='fas fa-spinner fa-spin mx-4'></i> : 'Log in'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
