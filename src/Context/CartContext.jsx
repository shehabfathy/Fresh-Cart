import axios from "axios";
import { createContext, useEffect } from "react";


 export  let CartContext = createContext();
  let headers = {
    token : localStorage.getItem('userToken')
  }

 export default function CartContextProvider(props) {

    function addToCart(id) {
      return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
        productId:id},{
         headers
        },
    ).then((res)=> res).catch((err)=>err)

}


   function getCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers
    }).then((res)=> res).catch((err)=>err)
   }

   function deleteCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers
    }).then((res)=> res).catch((err)=>err)
   }

   function updateCart(id,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      count
    },
      {

      headers
    }).then((res)=> res).catch((err)=>err)
   }

   function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers
    }).then((res)=> res).catch((err)=>err)
   }



   function onlinePayment(shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66cddee22d3b38c3c967dd5a?url=http://localhost:5174`,{
      shippingAddress
    },{
      headers
    }
   ).then((res)=> res).catch((err)=>err)
  }



  async function getUserCart() {
    const {data} = await getCart()
    console.log(data)
   }

    useEffect(()=> {
           getUserCart() 
    },[])

    return <CartContext.Provider value={{addToCart,getCart,deleteCart,clearCart,updateCart,onlinePayment}}>

    

       {props.children}
    </CartContext.Provider>

 }
