import { Outlet } from "react-router-dom";
import { RiNotionFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { motion } from "framer-motion";
import { MasterContext } from "@/Context/Context";
import { useContext } from "react";

const Layout = () => {
  // const { bgcolor } = useContext(MasterContext);
  return (
    <div
      className={`select-none bg-gradient-to-r from-green-400 via-green-500 to-green-600 `}
    >
      <div className="flex items-center justify-between p-1">
        <motion.div
          className="p-4 text-2xl flex items-center"
          initial={{ y: -200, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          transition={{
            // delay: 1,
            duration: 1,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <RiNotionFill />
          <p>otify</p>
        </motion.div>
        <div>
          <a href="https://www.instagram.com/beingbadguy" target="_blank">
            <CiInstagram className="text-xl mr-4 text-black" />
          </a>
        </div>
      </div>

      <main className=" container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
