import React, { useState } from "react";
import { auth } from "../../firebasy/firebasyConfig";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../apps/userslice";
import { updateProfile } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "../login";
export default function Register() {
  const dispatch = useDispatch();
  // const registergoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //       console.log(user);
  //       dispatch(login(user));
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //       console.log(errorMessage);
  //     });
  // };
  const [net, setnet] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [malumot, setmalumot] = useState({
    username: "",
    images: "",
  });
  const userw = "";
  const navigate = useNavigate();
  const hendlesubmit = (e) => {
    e.preventDefault();
    console.log(data.email, data.password);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        userw == user;
        const data = JSON.parse(localStorage.getItem("users")) ?? [];
        localStorage.setItem("users", JSON.stringify([...data, user]));
        localStorage.setItem("user", JSON.stringify(user));
        setnet(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
      });
  };
  const hendleupdata = (e) => {
    e.preventDefault();
    console.log(malumot.images);
    updateProfile(auth.currentUser, {
      displayName: malumot.username,
      photoURL: malumot.images,
    })
      .then(() => {
        // Profile updated!
        // alert("Profile updated!");

        dispatch(login(auth.currentUser.providerData[0]));
        navigate("/");
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      })
      .finally(() =>
        localStorage.setItem(
          "user",
          JSON.stringify(auth.currentUser.providerData[0])
        )
      );

    navigate("/");
  };
  return (
    <>
      {net ? (
        <div data-theme="night" className="hero min-h-screen bg-base-300">
          <div className="hero-content flex-col ">
            <div className="text-center   ">
              <h2 className="text-5xl font-serif">User info</h2>
              <p className="py-6 w-[400px]"></p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={hendleupdata} className="card-body">
                <div className="form-control">
                  <span className="my-2">Name</span>

                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow  "
                      required
                      placeholder="Enter your Name"
                      onChange={(e) => {
                        setmalumot((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }));
                      }}
                      value={malumot.username}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <span className="my-2">Images</span>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="url"
                      placeholder="Enter your Images"
                      className="grow"
                      required
                      onChange={(e) => {
                        setmalumot((prev) => ({
                          ...prev,
                          images: e.target.value,
                        }));
                      }}
                      value={malumot.images}
                    />
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
            <p style={{ color: "#ffffff95" }}>
              Already have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/"}
                type="submit"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div data-theme="night" className="hero min-h-screen bg-base-300">
          <div className="hero-content flex-col ">
            <div className="text-center   ">
              <h2 className="text-5xl font-serif">Welcome!</h2>
              <p className="py-6 w-[400px]">
                <p className="text-lg font-serif">
                  Use these awesome forms to login or create new account in your
                  project for free.
                </p>
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={hendlesubmit} className="card-body">
                <div className="form-control">
                  <span className="my-2">Email</span>

                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow "
                      required
                      placeholder="Enter your Email"
                      onChange={(e) => {
                        setdata((prev) => ({ ...prev, email: e.target.value }));
                      }}
                      value={data.email}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <span className="my-2">Password</span>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      placeholder="Enter your Password"
                      className="grow"
                      required
                      onChange={(e) => {
                        setdata((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                      value={data.password}
                    />
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Sign up</button>
                </div>
              </form>
            </div>
            <p style={{ color: "#ffffff95" }}>
              Already have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/login"}
                type="submit"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* <div className="min-h-screen grid place-items-center">
        <button onClick={registergoogle} className="btn btn-primary">
          google
        </button>
      </div> */}
    </>
  );
}
