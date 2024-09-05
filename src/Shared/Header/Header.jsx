import React from "react";
import "./Header.css";
import logo from "../../assets/Images/Logo.svg";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div className="LK">
        <Link to="/">shop</Link>
        <Link to="/order">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Header;
