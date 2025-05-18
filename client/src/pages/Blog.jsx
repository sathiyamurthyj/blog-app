import React, { useEffect, useState } from 'react'
import instance from '../utils/axiosInstance';
import { Link, useParams, useNavigate } from 'react-router';
import {useAuth} from '../context/AuthContext';
import toast from 'react-hot-toast';

const Blog = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState({});
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(()=>{
        instance.get(`/blogs/${id}`)
            .then(response=>{
                // console.log(response.data.blog);
                setBlog(response.data.blog);
            })
            .catch(err=>{
              console.log(err);
              toast.error(err.message);
            }); 
    },[]);

    const handleDelete = (deleteId) => {
        instance.delete(`/blogs/${deleteId}`)
            .then(response=>{
                console.log(response.data.message);
                navigate("/blogs");
            })
            .catch(err=>{
              console.log(err);
              toast.error(err.message);
            });
    };
  return (
    <div className="flex flex-col justify-center items-center md:max-w-xl md:flex-row">
      <img
        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg m-1"
        src={`http://localhost:5000/images/${blog.image}`}
        alt={blog.title} />
      <div className="flex flex-col justify-start p-6">
        <h5
          className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
          {blog.title}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {blog.content}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-300">
          Author: {blog.author}
        </p>
        {user.id === blog.userId?(
        <div className='flex justify-between items-center mt-5'>
            <Link to={`/edit-blog/${blog._id}`}><button className='w-full justify-center rounded-md bg-indigo-600 px-2 py-1 text-white hover:bg-indigo-500 font-semibold cursor-pointer'>Edit</button></Link>
            <button className='w-[25%] justify-center rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-500 font-semibold cursor-pointer' onClick={(e)=>handleDelete(blog._id)}>Delete</button>
        </div>
        ):null}
      </div>
    </div>
  )
}

export default Blog;