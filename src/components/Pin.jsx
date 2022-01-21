import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { client, urlFor } from "../client";
import { v4 as uuidv4 } from "uuid";
import { AiTwotoneDelete,AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchuser";
const Pin = ({ pin: { postedBy, image, _id, destination,save } }) => {
    const [PostHovered, setPostHovered] = useState(false);
    const navigate = useNavigate()
    console.log('data is',postedBy);
    const user = fetchUser()
    console.log("save is ",save);
    const alreadySaved = !!(save?.filter((item)=> item?.postedBy?._id === user?.googleId))?.length
    // 1, [2,3,1] -> [1].length -> 1 -> !1 -> false -> !false -> true 
    // 4, [2,3,1] -> [].length -> 0 !0 -> true -> !true -> false 
    // we added !! for making this boolean
    const savePinfunc = (id)=>{
        if(!alreadySaved){
  
            client.patch(id).setIfMissing({save:[]}).insert('after','save[-1]',[{
                _key: uuidv4(),
                userId: user.googleId,
                postedBy:{
                    _type:'postedBy',
                    _ref:user?.googleId
                }
            }])
            .commit()
            .then(()=>{
                window.location.reload()
            })
        }
    }
    const deletepin = (id) =>{
        client.delete(id).then(()=>{
            window.location.reload()
        })
    }
  return (
    <div className="m-2">
      {/* this src is sanity way to fetch image more optimizely for particular width  */}
      <div onMouseEnter={()=>setPostHovered(true)} onMouseLeave={()=>setPostHovered(false)} onClick={()=>navigate(`/pin-detail/${_id}`)} className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out ">
      <img
        src={urlFor(image).width(250).url()}
        className="rounded-lg w-full"
        alt="user-post"
      />
      {PostHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2 z-50" style={{height:'100%'}}>
              <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                      {/* e.stopPropagation stop the task after downloading */}
                      <a className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none transition duration-100 ease-in" href={`${image?.asset?.url}?dl=`} download onClick={(e)=>e.stopPropagation()}><MdDownloadForOffline /></a>
                  </div>
                  {alreadySaved ? (
                      <button type="button" className="bg-red-500 opacity-100 text-white fontbold p-2 text-base rounded-full hover:shadow-md outlined-none flex items-center justify-center"> <AiFillHeart/></button>
                  ):(
                      <button onClick={(e)=>{
                          e.stopPropagation();
                          savePinfunc(_id)

                      }} type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white fontbold p-2 text-base rounded-full hover:shadow-md outlined-none flex items-center justify-center"><AiOutlineHeart/> </button>
                  )}
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                  {destination && (
                      <a href={destination} onClick={(e)=>e.stopPropagation()} target='_blank' rel='noreferrer' className="bg-white flex items-center gap-2 text-black font-bod p-2  rounded-full opacity-70 hover:opacity-100 hover:shadow-md"><BsFillArrowRightCircleFill/></a>
                    //   {destination.length > 20 ? destination.slice(8,20) : destination.slice(8)}
                  )}
              {postedBy?._id === user.googleId && (
                  <button type="button" onClick={(e)=>{
                    e.stopPropagation();
                    deletepin(_id)
                }} className="bg-red-500 opacity-70 hover:opacity-100 text-white fontbold p-2 text-base rounded-full hover:shadow-md outlined-none flex items-center justify-center" ><AiTwotoneDelete/></button>
              )}
              </div>
          </div>
      )}


      </div>
    
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
          <img src={postedBy?.image} className='w-8 h-8 rounded-full object-cover' alt="user-profile" />
          <p className='font-semibold capitalize'>{postedBy?.username} </p>
      </Link>
    </div>
  );
};

export default Pin;
