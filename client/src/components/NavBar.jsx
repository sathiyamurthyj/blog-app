import React from 'react'
import { Link, useNavigate} from 'react-router';
import { useAuth } from '../context/AuthContext';
import instance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const NavBar = () => {
  const {user, isLoggedIn, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    instance.get(`/logout`)
      .then(response=>{
        if(response.data.success){
          toast.success(response.data.message);
          logout();
          navigate("/login");
        }
        }
      )
      .catch(err=>{
        console.log(err);
        toast.error(err.message);
      });
  }
  return (
    <div className='w-full h-12 bg-black p-4 text-white flex justify-between items-center'>
        <div><h3>Blog App</h3></div>
        {isLoggedIn?
        <div>
            <Link to='/blogs' className='px-4 cursor-pointer'>Blogs</Link>
            <Link to='/create-blog' className='px-4 cursor-pointer'>Create Blog</Link>
            <Link to='/my-blogs' className='px-4 cursor-pointer'>My Blogs</Link>
        </div>
        :
        null        
        }
        {isLoggedIn?
        <div>
            <input type="button" value="Logout" className='cursor-pointer' onClick={handleLogout} />
        </div>
        :
        <div>
            <h5 className='cursor-pointer'><Link to='/register' className='cursor-pointer'>Register/Login</Link></h5>
        </div>
        }
    </div>
  )
}

export default NavBar;