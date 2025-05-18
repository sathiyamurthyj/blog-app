import React,{useEffect, useState} from 'react'
import { useAuth } from '../context/AuthContext';
import instance from '../utils/axiosInstance';
import Card from '../components/Card';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

const Blogs = () => {
  const {login} = useAuth();
  const [blogs,setBlogs] = useState([]);
  useEffect(()=>{
    instance.get(`/`)
      .then(response=>{
        // console.log(response.data.user);
        login(response.data.user);
        }
      )
      .catch(err=>{
        console.log(err);
        toast.error(err.message);
  });
  },[]);

  useEffect(()=>{
    instance.get(`/blogs`)
      .then(response=>{
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      })
      .catch(err=>{
        console.log(err);
        toast.error(err.message);
      }); 
    },[]);

  return (
    <div className='container mx-auto'>
      <div className="grid auto-rows-fr md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map(blog=>(
          <Link to={`/blogs/${blog._id}`}>
            <Card key={blog._id} blog={blog} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blogs