import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setshowLogin }) => {
  const [menu, setmenu] = useState("home")
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()
  const onlogout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }
  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setmenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setshowLogin(true)}>Sign in</button> :
          <div>
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={onlogout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          </div>}
      </div>
    </div>
  );
};

export default Navbar;
