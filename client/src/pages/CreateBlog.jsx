import React, { useState } from 'react'
import instance from '../utils/axiosInstance';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from "react-router";
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const {user} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);  
      formData.append('category', category);  
      formData.append('content', content);  
      formData.append('image', image);  
      formData.append('author', user.name);  
      formData.append('userId', user.id);  
      const response = await instance.post(`/blogs`, formData);
      // console.log(response.data);
      if(response.data.success) {
          toast.success(response.data.message);
          navigate("/blogs");
      }
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <div className='flex min-h-full flex-col justify-center px-6 py-12'>
        <h2 className='mt-5 text-center text-2xl font-bold'> Create Blog</h2>
        <form className='space-y-3 mt-5 min-w-lg border rounded-md border-gray-200 p-8' onSubmit={handleSubmit}>
          <input 
            type='text'
            name='title' 
            placeholder='Enter Title' 
            className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
            onChange={(e)=>setTitle(e.target.value)}
            required
            />
          <input 
            type='text'
            name='category' 
            placeholder='Enter Category' 
            className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
            onChange={(e)=>setCategory(e.target.value)}
            required
            />
          <textarea 
            name="content" 
            rows={10} 
            cols={30} 
            placeholder='Enter Blog Content' 
            className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
            onChange={(e)=>setContent(e.target.value)}
            required
            />
          <div className='mb-3 outline-1 outline-gray-300 px-3 py-1.5 rounded-md'>
            <label htmlFor='image' className='block text-sm/6 font-medium text-gray-600'>Select Image</label>
            <input 
              type='file' 
              name="image" 
              className='block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-800'
              onChange={(e)=>setImage(e.target.files[0])}
              />
          </div>  
          <button className='w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-500 font-semibold cursor-pointer'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog