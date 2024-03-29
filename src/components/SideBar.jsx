import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowFoward } from "react-icons/io";
import logo from '../assets/logo.png'
import { categories } from "../utils/data";

const SideBar = ({user,closeToggle}) => {
    const handleclosesiderbar = ()=>{
        if (closeToggle) {
            closeToggle(false)
        }
    }
    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
    const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'
    
  return <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
          <Link to='/' onClick={handleclosesiderbar}  className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'>
              <img src={logo} alt="logo" className="w-full" />
          </Link>
          <div className="flex flex-col gap-5">
              <NavLink to='/' onClick={handleclosesiderbar} className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}><RiHomeFill/>Home</NavLink>
              <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
              {categories.slice(0,6).map((category)=>(
                    <NavLink onClick={handleclosesiderbar} to={`/category/${category.name}`} key={category.name} className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}><img alt={category.name} className="w-8 h-8 rounded-full shadow-sm" src={category.image}/>{category.name}</NavLink>
              ))}

          </div>
      </div>
    {user && (
        <Link onClick={handleclosesiderbar} to={`user-profile/${user._id}`} className="flex my-5 object-cover mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"><img src={user.image} className="w-10 h-10 rounded-full" alt="" /><p>{user.username}</p></Link>
    )}
  </div>;
};

export default SideBar;
