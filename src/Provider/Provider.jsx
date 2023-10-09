import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase.config";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [purchasedData, setPurchasedData] = useState([]);

  const auth = getAuth(app);

  const handelPurchasedData = (data) => {
    const newData = purchasedData.find((value) => value.id == data.id);
    if (newData) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Are Already Purchased This",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      setPurchasedData([...purchasedData, data]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "SuccessFully Purchased",
        showConfirmButton: true,
        timer: 2000,
      });
    }
  };
  // create user with email and password
  const userCreateWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const handelManageUser = (userName, photoURL) => {
    setLoading(true);
    console.log(userName, photoURL);
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoURL,
    });
  };

  //login with email and password
  const loginWithEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = (googleProvider) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    signOut(auth);
  };

  // current user
  useEffect(() => {
    const currentUser = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      currentUser();
    };
  }, [auth]);

  const Auth = {
    user,
    isLoading,
    userCreateWithEmailPassword,
    loginWithEmailPassword,
    logout,
    handelPurchasedData,
    loginWithGoogle,
    handelManageUser,
  };
  return (
    <div>
      <AuthContext.Provider value={Auth}>{children}</AuthContext.Provider>
    </div>
  );
};

Provider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Provider;
