import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogged from "../GoogleLogged/GoogleLogged";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]  border-black p-5 ">
      <div className=" p-6 rounded-lg shadow-md  border-2 border-black border-opacity-20 w-[450px] ">
        {" "}
         <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-4">Email:</label>
            <input
              type="email"
              className="border border-black border-opacity-50 rounded px-3 py-2 bg-transparent "
              placeholder="Your Email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-4">Password:</label>
            <input
              type="password"
              className="border border-black border-opacity-50 rounded px-3 py-2  bg-transparent"
              placeholder="Your Password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#FF9900] w-full text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <p className="text-gray-500 text-sm">
            New to Ema-john?{" "}
            <Link to={"/signup"} className="text-blue-500">
              Create New Account
            </Link>
          </p>
        </form>
        <div className="flex items-center gap-4 my-4">
          <p className="h-[1px] w-[210px] bg-black opacity-20"></p>
          <p>or</p>
          <p className="h-[1px] w-[210px] bg-black opacity-20"></p>
        </div>
        <GoogleLogged />
      </div>
    </div>
  );
};

export default Login;
