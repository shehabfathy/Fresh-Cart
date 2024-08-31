import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home() {
  
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <MainSlider />
      <CategoriesSlider />
      <FeatureProduct />
    </>
  );
}
