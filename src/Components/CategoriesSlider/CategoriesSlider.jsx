import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from 'react-slick'
export default function CategoriesSlider() {
    let [categories, setCategories] = useState([]);
    async function getCategory() {
        let { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/categories"
        );
        console.log(data.data)
        setCategories(data.data);
    }
    useEffect(() => {
        getCategory();
    }, []);
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay:true,
      slidesToShow: 8,
      slidesToScroll: 1,
    };
    
  return (
    <>
    <div className="text-right mb-3"><Link to={'/category'} className="   text-gray-400">View Category</Link> </div> 
      <Slider {...settings}  className="mb-20">
        {categories.map((category)=> (
            <div className="item  px-1" key={category._id}>
          <img src={category.image} className="w-full object- h-48"     alt={category.name} />
          <p>{category.name}</p>
          </div>
        ))}
      </Slider>
    </>
  );
}
