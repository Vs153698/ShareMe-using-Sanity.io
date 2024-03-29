import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { categories } from "../utils/data";
import Spinner from "./Spinner";
// categories [{name:'sports',image:''}]
const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(null);
  const navigate = useNavigate();
  const uploadimage = (e) => {
    const { type, name } = e.target.files[0];
    if (type === "image/png" || type === "image/svg" || type === "image/jpeg" || type === "image/gif" || type === "image/tiff") {
      setWrongImageType(false);
      setLoading(true);
      client.assets.upload("image", e.target.files[0], {
        contentType: type,
        filename: name,
      }).then((document) => {
        setImageAsset(document)
        setLoading(false)
      }).catch((err) => console.log("image upload error", err))
    } else {
      setWrongImageType(true);
    }
  };
  const savepin = ()=>{
    setFields(false)
    if (title && about && imageAsset?._id && category) {
      // we had used reference for image because image store in assets of sanity 
      const doc = {
        _type:'pin',
        title,
        about,
        destination,
        category,
        image:{
          _type:'image',
          asset:{
            _type:'reference',
            _ref: imageAsset?._id
          }
        },
        userId:user._id,
        postedBy:{
          _type:'postedBy',
          _ref:user._id
        }
      }
      client.create(doc).then(()=>navigate('/'))
    }else{
      setFields(true)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the details!
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0 7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full ">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold text-2xl ">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG, PNG, GIF less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadimage}
                  className="w-0 h-0"
                  id=""
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img src={imageAsset?.url} alt="uploade-pic" className="h-full w-full" />
                <button type="button" className="absolute bottom-3 right-3 bg-white opacity-70 hover:opacity-100 p-3 rounded-full text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out" onClick={() => setImageAsset(null)}><MdDelete color="red" /></button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input type="text" className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 outline-none " name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add your title here" />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img src={user.image} className="w-10 h-10 rounded-full" alt="userimage" />
              <p className="font-bold">{user.username}</p>
            </div>
          )}
          <input type="text" className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 outline-none " name="title" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="What is your pin about" />
          <input type="text" className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 outline-none " name="title" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Add destination link  (optional)" />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">Choose Pin Category</p>
              <select onChange={(e)=>setCategory(e.target.value)} className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
              <option value="other" className="bg-white">Select Category</option>
              {categories.map((cat)=>(
                <option value={cat.name} className="text-base border-0 outline-none capitalize bg-white text-black">{cat.name}</option>
              ))
              }
              </select>
            </div>
            <div className="flex jutify-end items-end mt-5">
              <button type="button" onClick={savepin} className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none" >Publish</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePin;
