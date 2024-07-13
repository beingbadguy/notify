import { Outlet } from 'react-router-dom';
import { RiNotionFill } from 'react-icons/ri';
import { CiInstagram } from 'react-icons/ci';
import { motion } from 'framer-motion';
import { MasterContext } from '@/Context/Context';
import { useContext } from 'react';

const Layout = () => {
  // const { bgcolor } = useContext(MasterContext);
  return (
    <div className={`select-none `}>
      <div className='flex items-center justify-between p-1'>
        <motion.div
          className='p-4 text-2xl flex items-center'
          initial={{ y: -200, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          transition={{
            // delay: 1,
            duration: 1,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <RiNotionFill />
          <p>otify</p>
        </motion.div>
        <div>
          <a href='https://www.instagram.com/beingbadguy' target='_blank'>
            <CiInstagram className='text-xl mr-4 text-red-600' />
          </a>
        </div>
      </div>

      <main className=' min-h-[58vh] container'>
        <Outlet />
      </main>
      <footer className=' text-black p-8 w-[100%] text-center'>
        <h1>Made with ❤️ by Aman</h1>
      </footer>
    </div>
  );
};

export default Layout;
