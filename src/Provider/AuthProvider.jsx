import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import Swal from "sweetalert2";
import axios from "axios";

import { app } from "../JS-File/firebase/firebase.config";
import decode from "../JS-File/decode";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState("");
  const [loading, setLoading] = useState(true);

  const baseUrl = "http://localhost:5000";

  /**
   * Log in by gmail
   */
  const googleProvider = new GoogleAuthProvider();
  const handleLogIn = (email) => {
    return signInWithPopup(auth, googleProvider);
  };

  /**
   * Log Out
   */
  const handleLogOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        console.log("SignOut Successfully");
      })
      .catch((error) => {
        console.log("Log Out error: ", error);
      });
  };

  /**
   * Check Current User start
   */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  /**
   * Check Current User end
   */

  /**
   * Check db User start
   */
  const [localstorageDep, setLocalStorageDep] = useState(true);
  const [mail, setMail] = useState("");
  // useEffect(() => {
  //   const storedEmail = localStorage.getItem("email");
  //   setMail(storedEmail);
  // }, []);
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const getDecodeEmail = decode(storedEmail);
    setMail(getDecodeEmail);

    if (mail) {
      axios.get(`${baseUrl}/user/${mail}`).then((res) => {
        setDbUser(res.data);
      });
    }
  }, [mail, localstorageDep]);
  // console.log("Current DB User: ", dbUser);

  /**
   * Check db User end
   */

  /**
   * Successfully Toast Start
   */

  const successfullToast = (text) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  /**
   * Successfully Toast end
   */

  const authInfo = {
    baseUrl,
    user,
    dbUser,
    localstorageDep,
    setLocalStorageDep,
    loading,
    handleLogIn,
    handleLogOut,
    successfullToast,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
