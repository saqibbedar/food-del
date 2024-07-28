import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from "react-router-dom"
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({setShowLogin}) => {
  const [activeMenu, setActiveMenu] = useState("home");

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <div className="navbar">
      <Link to={"/"}>
      <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="nav-menu">
        <Link to={"/"}
          onClick={() => setActiveMenu("home")}
          className={activeMenu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a href="#explore-menu"
          onClick={() => setActiveMenu("menu")}
          className={activeMenu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a href="#mobile-app"
          onClick={() => setActiveMenu("mobile-app")}
          className={activeMenu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a href="#contact-us"
          onClick={() => setActiveMenu("contact-us")}
          className={activeMenu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="nav-right-icons">
        <img src={assets.search_icon} alt="" className="search-icon" />
        <div className="cart">
          <Link to={"/Cart"} >
          <img src={assets.basket_icon} alt="" className="basket-icon" />
          </Link>
          <div className={getTotalCartAmount() >  0 && "dot"}>
          </div>
        </div>
        <button onClick={()=> setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
