import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";


const Navbar = ({showLogin , setShowLogin}) => {
  const [menu, setMenu] = useState('home');

  const navigate = useNavigate();

  const {cartTotalAmt, token, setToken} = useContext(StoreContext);

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  }

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} className="logo" onClick={() => setMenu('home')}/></Link>
      <ul className="navbar-menu">
        <Link to='/' className={menu === 'home'? 'active' : ''}  onClick={() => setMenu('home')}>home</Link>
        <a href='#explore-menu' className={menu === 'menu'? 'active' : ''} onClick={() => setMenu('menu')} >menu</a>
        <a href='#footer' className={menu === 'contact-us'? 'active' : ''}  onClick={() => setMenu('contact-us')}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} className="search-icon" />
        <div className="navbar-basket">
          <Link to='/cart'><img src={assets.basket_icon} className="basket-icon" onClick={() => setMenu('cart')} /></Link>
          {cartTotalAmt() > 0 ? <div className="dot"></div> : <></>}
        </div>
        {!token?
          <button className="sign-in" onClick={() => setShowLogin(true)}>Sign In</button>:
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" className="profile-icon"/>
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
