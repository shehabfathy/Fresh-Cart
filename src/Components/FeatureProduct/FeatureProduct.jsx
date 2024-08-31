// import styles from "./FeatureProduct.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { FaStar } from "react-icons/fa";
import { BallTriangle } from "react-loader-spinner";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
// import { AgeContext } from "../../Context/Counter";


export default function FeatureProduct() {

  let {addToCart} = useContext(CartContext)


  async function addCart(id) {

     let response = await addToCart(id)
     if  (response.data.status) {
      toast.success('Product Add To Your Cart')
  
     }
   
  }

  function getProducts() {
   

      return axios.get("https://ecommerce.routemisr.com/api/v1/products");
      
    }
    let { data, isLoading } = useQuery("featureProduct", getProducts,{
      // cacheTime:3000,
      // refetchOnMount:false,
      // enabled:false
      
    });
  //  console.log(data.data)
  
  return (
    <> 
    {isLoading ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) :
      (
        <> 
        <div className="text-right mb-3"><Link to={'/products'} className="   text-gray-400">View Products</Link> </div> 
        <div className="grid grid-cols-12 gap-3 pb-12 mb-5">
          {data?.data.data.slice(0,6).map((product) => (
            
            <div className="col-span-2 px-2 py-1 product" key={product.id}>
             <Link to={`details/${product.id}`} >
              <img
                src={product.imageCover}
                className="mb-2"
                alt={product.title || 'Product image'} // Fallback alt text for accessibility
              />
              <p className="text-main mb-2">{product.category.name}</p>
              <h3 className="mb-2">
                {product.title.split(' ').slice(0, 3).join(' ')}
              </h3>
              <div className="flex justify-between items-center">
                <span>{product.price}</span>
                <span className="flex items-center mb-3">
                  <FaStar className="rating-color" /> {product.ratingsAverage}
                </span>
              </div>
              </Link>
               <button onClick={()=>addCart(product.id)} className="bg-main btn text-white w-full ">Add To Cart </button>
            </div>
            
          ))}
        </div>
        </>
      )
      }

    </>
  );
}
