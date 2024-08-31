import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { MdDelete } from "react-icons/md";
import img1 from '../../assets/images/3385483.webp'
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
// import { AgeContext } from "../../Context/Counter";
export default function Cart() {
  let [cartDetails, setCartDetails] = useState({});
  let [loading, setLoading] = useState(true);
  let { getCart,deleteCart ,clearCart,updateCart} = useContext(CartContext);
  // let { setCounter,setCartId} = useContext(AgeContext);
  async function getUserCart() {
    let { data } = await getCart();

    setCartDetails(data);
   
    setLoading(false)


  }



  async function deleteUserCart(id) {
   let {data}= await deleteCart(id)
  //  setCounter(data.numOfCartItems)
   setCartDetails(data)
  
  }

  async function updateUserCart(id,count) {
   let {data}= await updateCart(id,count)
   data.data.products.map((ele)=>  {
   
     if(ele.count == 0) {
       deleteUserCart(id)
     }
   }
     )
    
     setCartDetails(data);
  //  setCounter(data.numOfCartItems)
  }


  


  async function clearUserCart() {
   let {data}=await clearCart();
 
   setCartDetails(data);
  }
 
  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <>
      {loading?  <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{ }}
          wrapperClass="center"
          visible={true}
        />:cartDetails.data?.products.length  > 0 ?   <section className="bg-main-light w-7/12 mx-auto p-8">
            <button onClick={clearUserCart} className="text-white bg-red-600 py-1 px-2 block ms-auto mb-5 ">Clear Cart</button>
            <div className="flex mb-5  justify-between items-center">
              <h4 className="text-xl">
                 Total Price: 
                <span className="text-main ">
                  {cartDetails.data?.totalCartPrice } EGP
                </span>
              </h4>
              <h4 className="text-xl ">
                Total Items :
                <span className="text-main">{cartDetails.numOfCartItems}</span>
              </h4>
            </div>
            { cartDetails.data?.products.map((item)=>(
            <>
          
          <div key={item.product._id}  className="grid grid-cols-12 border-b-2 mb-5 py-3">
          <div className="col-span-1 ">
            <img className="w-100" src={item.product.imageCover} alt=''/>
          </div>
          <div className="col-span-11 px-4">
            <div className="flex justify-between mb-2 items-center">
                <h5 className="text-xl">{item.product.title}</h5>
                <div>
                    <button onClick={()=>updateUserCart(item.product._id,item.count+1)} className="border-green-300 border-2  px-2  ">+</button>
                    <span  className="mx-2  inline-block">{item.count}</span>
                    <button onClick={()=>updateUserCart(item.product._id,item.count-1)} className="border-green-300 border-2   px-2   ">-</button>
                </div> 
              </div>
                <p className="font-bold mb-2">Price: {item.price} EGP</p>
                <button onClick={()=>deleteUserCart(item.product._id)} className="text-red-600 flex items-center  "> <MdDelete/>  Remove </button>
              
          </div>
        </div>
        </>
        ))}
        <Link to={'/checkout'}  className="bg-main text-center rounded-md text-white mx-auto  w-80 block py-1 ">Buy Now</Link>
      </section>: (
        <div className=" flex flex-col md:flex-row justify-center items-center space-x-2">
          <p >Your Cart Is Empty   <Link className="font-bold" to={'/'}> Go Back</Link></p>
        
          <img src={img1} alt="cartEmpty Image" />
        </div>
      )
            
      
    }
    </>
  );
}
