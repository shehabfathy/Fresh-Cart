
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import img4 from '../../assets/images/grocery-banner.png'
import img5 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'
export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        autoplay:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <>
     <h2>MainSlider</h2>
     <div className="grid grid-cols-12 mb-10 ">
        <div className="col-span-8">
        <Slider {...settings} >
           <img src={img1} className=' slider-img  ' alt="Image Slider 1" />
           <img  src={img2} className=' slider-img ' alt="Image Slider 2"  />
           <img  src={img3}className='slider-img ' alt="Image Slider 3"  />
           </Slider>
        </div>
        <div className="col-span-4">
            <img src={img4}  className="sidebar-img " alt="" />
            <img src={img5} className="sidebar-img" alt="" />
        </div>

     </div>
    
    </>
  );
}