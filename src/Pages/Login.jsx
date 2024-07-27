import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "@/db/supabase";
import { MasterContext } from "@/Context/Context";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { IoMdEyeOff } from "react-icons/io";
import { InfinitySpin } from "react-loader-spinner";
import { BsInfo } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

const Login = () => {
  const [pass, setPass] = useState(false);
  const [demo, setDemo] = useState(true);

  const [loading, setLoading] = useState(false);

  const { token, setToken } = useContext(MasterContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errormsg, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email != "" && formData.password != "") {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setError(error);
          setLoading(false);
        } else {
          setToken(data);
          if (token) {
            navigate("/homepage");
          }
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError("All the fileds are required");
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/homepage");
    }
  }, [token, navigate]);
  return (
    <div className=" text-black min-h-[100vh]">
      <div className="flex items-center justify-between">
        <div className="flex items-center p-4 ">
          <div
            className="text-3xl cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <MdKeyboardArrowLeft />
          </div>

          <MdHome className="text-3xl cursor-pointer" />
        </div>
      </div>

      <div className="w-[100%]  flex items-center justify-center">
        <img
          src="./crown.jpg"
          alt=""
          className="md:h-[30%] text-center md:w-[30%]"
        />
      </div>

      <div className="mt-50 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2  flex-col w-[100%]">
          <p className="text-red-600 py-2">
            {errormsg && errormsg ? `${errormsg}` : null}
          </p>
          <label className="text-slate-500">
            Enter your email here <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="aman@example.com"
            className="border border-black outline-green-400 rounded p-2"
          />
          <label className="text-slate-500">
            Enter your password here <span className="text-red-400">*</span>
          </label>

          <div className="flex items-center ">
            <input
              type={`${pass ? "text" : "password"}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="**********"
              className="  w-[100%] border border-black outline-green-400 rounded p-2"
            />

            <div
              className="ml-[-25px] text-xl cursor-pointer"
              onClick={() => {
                setPass(!pass);
              }}
            >
              {pass ? <LuEye /> : <IoMdEyeOff />}
            </div>
          </div>

          <button
            type="submit"
            className="bg-black rounded text-white p-2 mt-3 flex items-center justify-center"
          >
            {loading ? (
              <div className="text-center">
                <InfinitySpin
                  visible={true}
                  width="60"
                  color="white"
                  ariaLabel="infinity-spin-loading"
                  className="text-center"
                />
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>

      <div className="mx-6 text-slate-500 mb-4">
        Don't have an account ?
        <Link to={"/signup"}>
          <span className="underline"> Signup</span>
        </Link>
      </div>
      <div className="pl-6">
        {demo ? (
          <div className="flex gap-2">
            <BsInfo
              className="bg-black text-slate-500 text-xl"
              onClick={() => {
                setDemo(false);
              }}
            />
            <p className="text-black">Demo Account</p>
          </div>
        ) : (
          <div className="text-black">
            <IoCloseOutline
              onClick={() => {
                setDemo(true);
              }}
              className="bg-black text-slate-500 text-xl"
            />

            <p>Email:demo@gmail.com</p>
            <p>Password:demo@567</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;
