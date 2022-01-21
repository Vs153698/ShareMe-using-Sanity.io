import React, { useState, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { AiOutlineLogout } from 'react-icons/ai'
import { MdCenterFocusStrong } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom'
import { client } from '../client';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
const randomImage = 'https://source.unsplash.com/1600x900/?nature,technology,travel,snow,mountains'
const activeBtnStyles = 'bg-red-500 mt-3 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mt-3 mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'
const UserProfile = () => {
  const [user, setuser] = useState(null);
  const [pins, setpins] = useState(null);
  const [text, settext] = useState('Created');
  const [activateBtn, setactivateBtn] = useState('created');
  const navigate = useNavigate()
  const { userId } = useParams()
  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query).then((data) => {
      setuser(data[0])
    })
  }, [userId]);
  useEffect(() => {
    if (text === 'Created') {
      const createdpinsquery = userCreatedPinsQuery(userId)
      client.fetch(createdpinsquery).then((data) => {
        setpins(data)
      })
    } else {
      const savedpinsquery = userSavedPinsQuery(userId)
      client.fetch(savedpinsquery).then((data) => {
        setpins(data)
      })

    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }
  if (!user) {
    return (
      <Spinner message='Loading Profile' />
    )
  }
  console.log('user_id', JSON.parse(localStorage.getItem('user')));
  return <div className='relative pb-2 h-full justify-center items-center' >
    <div className="flex flex-col pb-5">
      <div className="relative flex flex-col mb-7">
        <div className="flex flex-col justify-center items-center">
          <img src={randomImage} className='w-full h-370 2xl:h-510 shadow-lg object-cover ' alt="banner-pic" />
          <img src={user?.image} className='rounded-full w-50 h-50 -mt-10 shadow-xl object-cover' alt="user-pic" />
          <h1 className='font-bold text-3xl text-center mt-3'>{user.username}</h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === JSON.parse(localStorage.getItem('user')).googleId && <GoogleLogout clientId={process.env.REACT_APP_CLIENT_ID} render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} type='button' className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md '><AiOutlineLogout color='red' fontSize={21} /></button>
            )} onLogoutSuccess={logout} cookiePolicy='single_host_origin' />}
          </div>
        </div>
        <div className="text-center mb-7">
          <button type='button' onClick={(e) => {
            settext(e.target.textContent)
            setactivateBtn('created')
          }} className={`${activateBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}>Created</button>
          <button type='button' onClick={(e) => {
            settext(e.target.textContent)
            setactivateBtn('saved')
          }} className={`${activateBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}>Saved</button>
        </div>
        {pins?.length ? <div className="px-2">
          <MasonryLayout Pins={pins} />
        </div>: <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>You haven't created any pin till now !</div>}
      </div>
    </div>

  </div>;
};

export default UserProfile;
