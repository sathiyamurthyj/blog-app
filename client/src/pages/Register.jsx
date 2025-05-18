import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import instance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const Register = () => { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    // console.log(name, email, password);
    try {
        const response = await instance.post(`/auth/signup`,{name, email, password});
        // console.log(response.data);
        if(response.data.success) {
            toast.success(response.data.message);
            navigate("/login");
        }
    } catch (error) {
        console.log(error.message);
        toast.error(error.message)
    }
  }
  return (
    <div className='flex justify-center items-center h-[90vh]'>
        <div className='flex min-h-full flex-col justify-center px-6 py-12'>
            <h2 className='mt-10 text-center text-2xl font-bold'>Register</h2>
            <form className='space-y-6 mt-10 min-w-lg border rounded-md border-gray-200 p-8' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name' className='block text-sm/6 font-medium text-gray-900'>Name:</label>
                    <input 
                        type='text' 
                        className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required    
                        />
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>Email:</label>
                    <input 
                        type='email' 
                        className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required    
                        />
                </div>
                <div>
                    <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>Password:</label>
                    <input 
                        type='password' 
                        className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        />
                </div>
                <button type='submit' className='w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-500 font-semibold'>Register</button>
            </form>
            <p className='mt-10 text-center text-gray-500 text-sm/6'>
            Already have account? 
            <Link to='/login' className='font-semibold text-indigo-600 hover:text-indigo-500'> Login</Link>
            </p>
            
        </div>
    </div>
  )
}

export default Register