

import axios from 'axios'
import { Input,Alert } from 'antd';
import {  useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LuLoader2 } from "react-icons/lu";
import { userToken } from '../../Context/Token.jsx';

export default function Login() {
  let {setToken} = useContext(userToken)

  let [error, setError]=useState('')
  let [loading,setLoading] = useState(false)
  let navigate = useNavigate()

  async function callApi(values) {
    setLoading(true)
    try {
      setError('')
      let {data} =   await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      console.log(data)
       setLoading(false)

      if(data.message == 'success') {
        localStorage.setItem('userToken',data.token)
        setToken(data.token)
        navigate('/')
    }
    }catch (e) {
     
      setLoading(false)
      setError(e.response.data.message)

    }

  }
   
  const  validationSchema =  Yup.object({
        email:Yup.string().email().required('email is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,'invalid Password').required('password is required'),
      
      })
      
  

 const formik = useFormik({
   initialValues: {
    email:"",
    password:"",
   },
   validationSchema,
   onSubmit: callApi
 }) 
  
  return (
    <>
    <div className='px-6 py-8 mb-10   w-8/12 mx-auto shadow-md'>
    <h2 className='mb-3 fs- text-lg text-center '>Login</h2>
    {error? <Alert message={error} type="error " />:null}
    <form  onSubmit={formik.handleSubmit}>
   
     <div className='mb-5'>
     <label htmlFor="mail">Email</label>
     <Input type='email'className=''  name='email' id='mail'onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
     {formik.errors.email&&formik.touched.email?<div className='text-red-600'>{formik.errors.email}</div>:null}
     </div>

     <div className='mb-5'>
     <label htmlFor="pass">Password</label>
     <Input type='password' className='' name='password'onBlur={formik.handleBlur} id='pass' onChange={formik.handleChange} value={formik.values.password} />
     {formik.errors.password &&formik.touched.password?<div className='text-red-600'>{formik.errors.password}</div>:null}
     </div>
    
     <button  disabled={!(formik.isValid && formik.dirty)}  className='bg-main py-2  flex items-center justify-around  rounded-md px-4 block ml-auto text-white'>{loading?<LuLoader2 className='animate-spin'/> :''}  Sign In</button>
    </form>
    </div>
   </>

  )
}
