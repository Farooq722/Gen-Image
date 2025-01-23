import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios  from 'axios'
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backend_url, setToken, setUser } = useContext(AppContext);
  /* */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      if (state === "Login") {
        try {
          const { data } = await axios.post(
            `${backend_url}/api/user/login`,
            { email, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true, // Required if you're using credentials
            }
          );

          if (data.success) {
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem("token", data.token);
            setShowLogin(false);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      } else {
        try {
          const { data } = await axios.post(
            `${backend_url}/api/user/register`, 
            { name, email, password },
            { headers: { "Content-Type": "application/json" } } 
          );
          if (data.success) {
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem("token", data.token);
            setShowLogin(false);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      }      

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
        document.body.style.overflow = 'unset';
    }
  },[]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
      onSubmit={onSubmitHandler}
      className="relative bg-white p-10 rounded-xl text-slate-500"
      initial={{opacity:0.2,y:50}}
      transition={{duration: 0.5}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img
              src={assets.user_icon}
              alt=""
              className="outline-none text-sm"
            />

            <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text" 
            placeholder="Full Name" 
            required />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img
            src={assets.email_icon}
            alt=""
            className="outline-none text-sm"
          />

          <input
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          value={email}
          type="email" 
          placeholder="Email" 
          required />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="" className="outline-none text-sm" />
          <input 
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
          type="password" 
          placeholder="Password" 
          required />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create account "}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600   cursor-pointer"
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setState("Login");
              }}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => {
            setShowLogin(false)
          }}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
        />
      </motion.form>
    </div>
  );
};

export default Login;

