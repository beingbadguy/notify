import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import supabase from '@/db/supabase';
import { MasterContext } from '@/Context/Context';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { LuEye } from 'react-icons/lu';
import { IoMdEyeOff } from 'react-icons/io';

const Sign = () => {
  const { token, setToken, bgcolor } = useContext(MasterContext);
  const [newerror, setnewerror] = useState();
  const [pass, setPass] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name != '' && formData.email != '' && formData.password != '') {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.name,
            },
            emailRedirectTo: 'http://localhost:5173/homepage',
          },
        });

        if (error) {
          throw error;
        } else {
          // console.log(data);
          setToken(data);
        }
      } catch (error) {
        setnewerror(error.message);
      }
    } else {
      setnewerror('All fields are required');
    }
  };
  useEffect(() => {
    if (token) {
      navigate('/homepage');
    }
  }, [navigate, token]);
  return (
    <div>
      <div className={`flex items-center p-4 `}>
        <div
          className='text-3xl cursor-pointer'
          onClick={() => {
            navigate('/');
          }}
        >
          <MdKeyboardArrowLeft />
        </div>

        <MdHome className='text-3xl cursor-pointer' />
      </div>
      <div className='w-[100%]  flex items-center justify-center'>
        <img src='./crown.jpg' alt='' className='md:h-[30%] text-center md:w-[30%]' />
      </div>
      <div className='mt-50'>
        <form onSubmit={handleSubmit} className='flex gap-2 mb-10 p-5  flex-col w-[100%]'>
          <p className='text-red-400'>{newerror}</p>
          <label className='text-gray-400'>
            Enter your name here <span className='text-red-400'>*</span>
          </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Aman Yadav'
            className='border-b-2 outline-none border-black p-2'
          />
          <label className='text-gray-400'>
            Enter your email here <span className='text-red-400'>*</span>
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='aman@example.com'
            className='border-b-2 outline-none  border-black p-2'
          />
          <label className='text-gray-400'>
            Enter your password here <span className='text-red-400'>*</span>
          </label>
          <div className='flex items-center '>
            <input
              type={`${pass ? 'text' : 'password'}`}
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='whyWouldITellYou'
              className='border-b-2 outline-none w-[100%]  border-black p-2'
            />

            <div
              className='ml-[-20px] text-xl cursor-pointer'
              onClick={() => {
                setPass(!pass);
              }}
            >
              {pass ? <LuEye /> : <IoMdEyeOff />}
            </div>
          </div>

          <button type='submit' className='bg-black rounded-xl text-white p-2'>
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};
export default Sign;
