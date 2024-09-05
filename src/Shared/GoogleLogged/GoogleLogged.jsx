import React, { useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const GoogleLogged = () => {
  const { handleLogIn, successfullToast } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogle = () => {
    handleLogIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        successfullToast("Login Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <button
      onClick={handleGoogle}
      className="border border-black w-full flex justify-center gap-4 p-4 rounded-lg"
    >
      <GoogleIcon className="pText" /> <p>Login By Google</p>
    </button>
  );
};

export default GoogleLogged;
