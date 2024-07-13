import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-bold flex flex-col items-center justify-center ">
      <motion.img
        className="mt-0 text-center  "
        initial={{
          x: -100,
          rotate: 0,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        src="./bgNew.png"
        alt=""
      >
        {/* You suck at taking notes brother, you need us : ) */}
      </motion.img>
      <div className="flex gap-6  min-h-[30vh] flex-row items-center justify-center">
        <p
          onClick={() => {
            navigate("/signup");
          }}
          className="bg-green-200  text-sm  p-4 cursor-pointer rounded-xl"
        >
          Sign Up
        </p>
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="bg-purple-200  text-sm p-4 cursor-pointer rounded-xl"
        >
          Log In
        </p>
      </div>
    </div>
  );
};
export default LandingPage;
