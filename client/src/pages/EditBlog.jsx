import React, { useState, useEffect } from 'react'
import instance from '../utils/axiosInstance';
import {useAuth} from '../context/AuthContext';
import {useNavigate, useParams} from "react-router";
import toast from 'react-hot-toast';

const EditBlog = () => {
 const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const {id} = useParams(); 
//   const {user} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await instance.put(`/blogs/${id}`, {title, category, content});
      console.log(response.data);
      if(response.data.success) {
          toast.success(response.data.message);
          navigate("/blogs");
      }
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }
  };

  useEffect(()=>{
        instance.get(`/blogs/${id}`)
            .then(response=>{
                // console.log(response.data.blog);
                toast.success(response.data.message)
                setTitle(response.data.blog.title);
                setContent(response.data.blog.content);
                setCategory(response.data.blog.category);
            })
            .catch(err=>{
              console.log(err);
              toast.error(err.message);
            }); 
    },[]);

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <div className='flex min-h-full flex-col justify-center px-6 py-12'>
        <h2 className='mt-5 text-center text-2xl font-bold'> Edit Blog</h2>
        <form className='space-y-3 mt-5 min-w-lg border rounded-md border-gray-200 p-8' onSubmit={handleSubmit}>
          <input 
            type='text'
            name='title'
            value={title} 
            placeholder='Enter Title' 
            className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
            onChange={(e)=>setTitle(e.target.value)}
            required
            />
          <input 
            type='text'
            name='category'
            value={category} 
            placeholder='Enter Category' 
            className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
            onChange={(e)=>setCategory(e.target.value)}
            required
            />
          <textarea 
            name="content" 
            value={content}
            rows={10} 
            cols={30} 
            placeholder='Enter Blog Content' 
            className='mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600'
            onChange={(e)=>setContent(e.target.value)}
            required
            />
          <button className='w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-500 font-semibold cursor-pointer'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EditBlog