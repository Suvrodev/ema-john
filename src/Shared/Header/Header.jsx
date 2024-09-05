import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/Images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
const Header = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  console.log("User Header: ", user);
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div className="LK flex items-center">
        <Link to="/">shop</Link>
        <Link to="/order">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        {user ? (
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL}
              className="w-[35px] h-[35px] rounded-full"
              alt=""
            />
            <button onClick={handleLogOut} className="btn btn-warning">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
