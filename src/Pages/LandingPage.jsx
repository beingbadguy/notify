import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-bold flex flex-col items-center justify-center min-h-[90vh] ">
      <div className=" flex items-center justify-center mt-20 text-center">
        <p className="text-2xl sm:w-[60%] font-bold">
          Capture and Organize Your Thoughts Effortlessly
        </p>
      </div>
      <div className=" flex items-center justify-center mt-4 text-center">
        <p className="text-sm sm:w-[60%]">
          Enjoy unlimited access to your notes anywhere, anytime. From quick
          reminders to detailed plans, we've got you covered.
        </p>
      </div>
      <div className="flex gap-6  min-h-[30vh] flex-row items-center justify-center">
        <p
          onClick={() => {
            navigate("/signup");
          }}
          className="bg-green-200  text-sm px-4 py-2 cursor-pointer rounded w-[120px] flex justify-center items-center shadow-md shadow-green-200/40 "
        >
          Sign Up
        </p>
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="bg-cyan-200  text-sm px-4 py-2 cursor-pointer rounded w-[120px] flex justify-center items-center shadow-md shadow-cyan-200/40"
        >
          Log In
        </p>
      </div>
    </div>
  );
};
export default LandingPage;
