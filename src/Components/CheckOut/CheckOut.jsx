
import { useFormik } from 'formik'
import { useContext } from 'react';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
// import { AgeContext } from '../../Context/Counter';
export default function CheckOut() {
  // let {cartId} = useContext(AgeContext);
  let {onlinePayment} = useContext(CartContext)
  const  validationSchema =
    Yup.object({
      details:Yup.string().required('enter your address').matches(/^\d+\s[\w\s]+(?:,\s[\w\s]+)*$/,'should be lik that 456 Elm St  or 123 Main Street'),
      phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'Enter a valid number').required('enter a valid number'),
      city:Yup.string().required('enter your city')
    })
  
    
   async function userOnlinePayment(values) {
   let {data} =  await  onlinePayment(values)
   
   window.location.href = data.session.url
   }
 
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    validationSchema,
    onSubmit: userOnlinePayment
  })
  return (
    <>
    <section >

    <form className=' w-[45rem] py-3  px-4 shadow-lg mx-auto' onSubmit={formik.handleSubmit}>
    <h3 className='mb-5 font-bold'>Checkout</h3>
    <div className='mb-5'>
    <label htmlFor="phone">Phone</label>
       <input
        id= "phone"
         name="phone"
         type="tel"
         className='w-full border border-gray-300 border-solid py-1 px-1 outline-0  mb-1'
         onChange={formik.handleChange}
         value={formik.values.phone}
         onBlur={formik.handleBlur}
       />
       {formik.touched.phone && formik.errors.phone ? (
         <div className='text-red-600 '>{formik.errors.phone}</div>
       ) : null}
       </div>
       <div className='mb-5'>
    <label htmlFor="city" >City</label>
       <input
        id= "city"
         name="city"
         type="text"
         className='w-full border border-gray-300 border-solid py-1 px-1 outline-0  mb-1'
         onChange={formik.handleChange}
         value={formik.values.city}
         onBlur={formik.handleBlur}
       />
        {formik.touched.city && formik.errors.city ? (
         <div className='text-red-600 '>{formik.errors.city}</div>
       ) : null}
       </div >
       <div className='mb-5'>
    <label htmlFor="details">Address</label>
       <textarea
        id= "details"
         name="details"
         rows="3"
         className='w-full border border-gray-300 border-solid px-1 outline-0   mb-1'
         onChange={formik.handleChange}
         value={formik.values.details}
         onBlur={formik.handleBlur}
       > </textarea>
       {formik.touched.details && formik.errors.details ? (
         <div className='text-red-600 '>{formik.errors.details}</div>
       ) : null}
       </div>
       <button onClick={userOnlinePayment} type='submit' disabled={!(formik.isValid && formik.dirty)} className=' bg-main block text-white px-5 py-1 rounded-md'>PayOnline</button>

      </form>
      </section>
    </>

  )
}
