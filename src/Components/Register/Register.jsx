import axios from 'axios'

import { Input,Alert } from 'antd';
import {  useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LuLoader2 } from "react-icons/lu";

export default function Register() {
  let [error, setError]=useState('')
  let [loading,setLoading] = useState(false)
  let navigate = useNavigate()

  async function callApi(values) {
    setLoading(true)
    try {
      setError('')
      let {data} =   await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
      console.log(values)
       setLoading(false)

      if(data.message == 'success') {
        navigate('/login')
    }
    }catch (e) {
     
      setLoading(false)
      setError(e.response.data.message)

    }

  }
   
  const  validationSchema =  Yup.object({
        name:Yup.string().min(3,'name  is too short').required('name is required'),
        email:Yup.string().email().required('email is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,'invalid Password').required('password is required'),
        rePassword:Yup.string().oneOf([Yup.ref('password')],'password and rePassword should match').required('password is required'),
        phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'invalid number').required('phone is required')
      })
      
  

 const formik = useFormik({
   initialValues: {
   name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
   },
   validationSchema,
   onSubmit: callApi
 }) 
  
  return (
    <>
     <div className='px-6 py-8 mb-10  w-8/12 mx-auto shadow-lg'>
     <h2 className='mb-3 fs- text-lg text-center '>Register Now</h2>
     {error? <Alert message={error} type="error " />:null}
     <form className='' onSubmit={formik.handleSubmit}>
     <div className='mb-5'>
      <label htmlFor="user">Name</label>
      <Input type='text' className=' '  name='name' id='user' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
     {formik.errors.name &&formik.touched.name ?<div className='text-red-600'>{formik.errors.name}</div>:null}
      </div>
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
      <div className='mb-5'>
      <label htmlFor="repass">rePassword</label>
      <Input type='password' className=''  name='rePassword' onBlur={formik.handleBlur} id='repass' onChange={formik.handleChange} value={formik.values.rePassword} />
      {formik.errors.rePassword &&formik.touched.rePassword?<div className='text-red-600'>{formik.errors.rePassword}</div>:null}
     </div>
     <div className='mb-5'>
      <label htmlFor="phone">Phone</label>
      <Input type='tel' className=''  name='phone' onBlur={formik.handleBlur} id='phone' onChange={formik.handleChange} value={formik.values.phone} />
      {formik.errors.phone && formik.touched.phone?<div className='text-red-600'>{formik.errors.phone}</div>:null}
      </div>
      <button  disabled={!(formik.isValid && formik.dirty)}  className='bg-main py-2  flex items-center justify-around  rounded-md px-4 block ml-auto text-white'>{loading?<LuLoader2 className='animate-spin'/> :''}  Register</button>
     </form>
     </div>
    </>
  )
}

