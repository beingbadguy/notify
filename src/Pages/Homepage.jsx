import { MasterContext } from '@/Context/Context';
import { useContext, useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import supabase from '@/db/supabase';
import { CiCalendar } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineTask } from 'react-icons/md';
import { InfinitySpin } from 'react-loader-spinner';

const Homepage = () => {
  const { token, setToken } = useContext(MasterContext);
  const [loading, setLoading] = useState(false);

  const [val, setVal] = useState();
  const [addTodo, setaddTodo] = useState(false);
  const [newerror, setnewerror] = useState();
  const [log, setlog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // console.log(token ? 'user is Authenticated' : 'user is not authenticated');
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        console.log('User signed out successfully');
      } else {
        console.error(error);
      }
      sessionStorage.removeItem('token');
      setToken(null);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title != '' && formData.description != '') {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('todos')
          .insert([
            { title: formData.title, description: formData.description, userId: token?.user?.id },
          ]);
        fetchTodo();
        setFormData({
          title: '',
          description: '',
        });

        if (error) {
          throw error;
        }
        console.log('Data inserted:', data);
        setnewerror('Task has been created successfully');
        setaddTodo(true);
        setLoading(false);
      } catch (error) {
        setnewerror('Error inserting data:', error.message);
      }
    } else {
      setnewerror('Please fill all fields');
    }
  };

  const fetchTodo = async () => {
    try {
      let { data: todos, error } = await supabase.from('todos').select('*');

      setVal(todos);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/homepage');
    }
  }, [token, navigate]);

  return (
    <div className='flex flex-col items-center w-[100%] select-none'>
      <div className='flex items-center justify-between p-4 w-[100%]'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <p>Hello</p>
            <img src='./hi.svg' alt='' className='h-4' /> ,
            <p className='font-bold'> {token?.user?.user_metadata.first_name}</p>
          </div>
          <p>Welcome Back Again!</p>
        </div>
        <div className=' relative flex items-center gap-10  '>
          <p
            className=' text-white bg-black rounded p-2 cursor-pointer'
            onClick={() => {
              setlog(true);
            }}
          >
            logout
          </p>
          {/* <p
            className='absolute text-green-700
          top-10 right-[0%] w-20'
          >
            You can still do it!
          </p> */}
        </div>
      </div>
      {log && log ? (
        <div className=' p-2 text-white rounded-2xl'>
          <p>Do you really want to go?</p>
          <div className='flex justify-between mt-2 text-black'>
            <p className='bg-red-200 rounded-xl p-2' onClick={logout}>
              yes
            </p>
            <p
              className='bg-green-200 rounded-xl p-2'
              onClick={() => {
                setlog(false);
              }}
            >
              no
            </p>
          </div>
        </div>
      ) : null}

      <div
        className='text-3xl  text-center rounded-[100%] text cursor-pointer py-5'
        onClick={() => {
          setaddTodo(!addTodo);
        }}
      >
        <CiCirclePlus />
      </div>
      <div
        className={`w-[80%] ${
          addTodo ? 'h-1' : 'h-[320px]'
        } transition-all duration-500 overflow-hidden`}
      >
        <p className='text-red-500'>{newerror}</p>

        <form onSubmit={handleSubmit} className='flex gap-2 mb-10 flex-col w-[100%]'>
          <label className='text-gray-500'>
            Enter title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Create notes on gravitational force'
            className='p-2 border-b-2 outline-none'
          />
          <label className='text-gray-500'>
            Whats the plan
            <span className='text-red-500'> *</span>
          </label>
          <textarea
            type='text'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='oh! Shit'
            className='border-b-2 p-2 outline-none text-4xl'
          />
          <button
            type='submit'
            className='bg-black text-white p-2 rounded-xl flex items-center justify-center'
          >
            {loading ? (
              <div className='text-center'>
                <InfinitySpin
                  visible={true}
                  width='60'
                  color='white'
                  ariaLabel='infinity-spin-loading'
                  className='text-center'
                />
              </div>
            ) : (
              'Create Task'
            )}
          </button>
        </form>
      </div>
      {/* <div className=' flex justify-center gap-20 mb-5 items-center w-[100%]'>
        <div className='border border-purple-300 p-5 rounded-2xl'>
          <MdOutlineTask className=' text-xl rounded text-black' />
          <p>Task Created</p>
          <p>
            <span className='font-bold text-xl'>{val && val.length}</span> Tasks
          </p>
        </div>

        <div className='border border-purple-300 p-5 rounded-2xl'>
          <MdOutlineTask className=' text-xl rounded text-black' />
          <p>Task Created</p>
          <p>
            <span className='font-bold text-xl'>{val && val.length}</span> Tasks
          </p>
        </div>
      </div> */}

      {val && val.length == 0 ? (
        <div>
          <h1 className='text-xl mt-20 text-red-600 font-bold text-center'>
            BOOOOOOOM!!! <br /> It's time to hit some goals.
          </h1>
        </div>
      ) : (
        <div className=' relative flex flex-col p-4 gap-5 w-[100%]'>
          <div className='flex items-center justify-center absolute left-3 top-[-16px]  gap-2'>
            <p className=''>Your Task</p>(<p className='font-bold text-xl'>{val && val.length}</p>)
          </div>
          {val &&
            val.map((item, index) => (
              <div
                key={index}
                // style={{ backgroundColor: colors[index] }}
                className={` text-white bg-black  rounded-xl p-4 min-h-[200px]`}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div>
                      <CiCalendar />
                    </div>
                    <p> {new Date(item.created_at).getFullYear()}</p>
                  </div>

                  <div className='text-xl text-red-400 cursor-pointer'>
                    <MdDeleteOutline />
                  </div>
                </div>

                <h1 className='font-bold text-4xl'>{item.title}</h1>
                <p className='mt-3'>{item.description}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default Homepage;
