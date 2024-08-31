import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function Details() {
  let {addToCart} = useContext(CartContext)
  let [details, setDetails] = useState({});
  let params = useParams();


  async function addCart(id) {

    let response = await addToCart(id)
    if  (response.data.status) {
     toast.success('Product Add To Your Cart')
    }
  
 }

  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
  }
  useEffect(() => {
    getProductDetails(params.id);
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-4 ">
          <Slider {...settings}>
            {details.images?.map((ele, index) => (
              <img src={ele} key={index} className=" w-full h-96"  alt="slider Image" />
            ))}
          </Slider>
        </div>
        <div className="col-span-8">
          <h2 className="mb-4 font-bold ">{details.title}</h2>
          <p className="mb-4 text-gray-700">{details.description}</p>
          <p className="mb-4 text-gray-600">{details.category?.name}</p>
          <div className="flex justify-between items-center mb-3 ">
            <h5 className="font-bold ">{details.price} EGP</h5>
            <h5 className="flex items-center">
              <FaStar className="rating-color" /> {details.ratingsAverage}
            </h5>
          </div>
          <button onClick={()=>addCart(details.id)} className="bg-main w-full text-white p-1 rounded-md">
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
