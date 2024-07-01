import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className='font-bold  '>
      <motion.h1
        className='text-4xl mt-36'
        initial={{
          x: -100,
          rotate: 0,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
      >
        You suck at taking notes brother, you need us : )
      </motion.h1>
      <div className='flex gap-6  min-h-[40vh] flex-row items-center justify-center'>
        <p
          onClick={() => {
            navigate('/signup');
          }}
          className='bg-green-200  text-sm  p-4 cursor-pointer rounded-xl'
        >
          Become a member
        </p>
        <p
          onClick={() => {
            navigate('/login');
          }}
          className='bg-purple-200  text-sm p-4 cursor-pointer rounded-xl'
        >
          Already a member ?
        </p>
      </div>
    </div>
  );
};
export default LandingPage;
