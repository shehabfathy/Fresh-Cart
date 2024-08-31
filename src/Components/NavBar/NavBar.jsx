import { Link, useNavigate } from "react-router-dom";
import { SlSocialInstagram, SlSocialLinkedin } from "react-icons/sl";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import pic from "../../assets/images/freshcart-logo.svg";
import { userToken } from "../../Context/Token.jsx";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AgeContext } from "../../Context/Counter.jsx";
import { Badge } from "antd";

export default function NavBar() {
  let { count } = useContext(AgeContext);
  let { token, setToken } = useContext(userToken);
  let navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-main-light paddingX flex justify-between mb-6   items-center w-full py-3 ">
        <div className="left flex items-center space-x-5">
          <Link to={"/"}>
            <img className="" width={130} src={pic} alt="logo" />{" "}
          </Link>

          {token ? (
            <ul className="flex font-light text-sm space-x-4">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/products"}>Products</Link>
              </li>
              <li>
                <Link to={"/category"}>Categories</Link>
              </li>
              <li>
                <Link to={"/brands"}>Brands</Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>

        <div className="right flex space-x-5">
          <div className="icon flex items-center space-x-3">
            <a href="#">
              <SlSocialInstagram />
            </a>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              {" "}
              <SlSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
          </div>
          <ul className="flex items-center text-sm space-x-5">
            {token ? (
              <>
                <li>
                  <Link to={"/cart"} className=" items-center flex">
                    <Badge   count={count}>
                      <FaShoppingCart className="text-xl" />
                    </Badge>
                  </Link>
                </li>
                <li>
                  <button onClick={Logout}>SignOut</button>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
