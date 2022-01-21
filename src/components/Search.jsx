import React, { useState, useEffect } from 'react';
import { client } from '../client';
import { FeedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
const Search = ({searchTerm }) => {
  const [pins, setpins] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (searchTerm) {
      setloading(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then((data)=>{
        setpins(data)
        setloading(false)

      })
    }else{
      setloading(true)
      client.fetch(FeedQuery).then((data)=>{
        setpins(data)
        setloading(false)

      })
    }

    
   
  }, [searchTerm]);
  
  return <div>
      {loading && <Spinner message='Searching for pins'/> }
      {pins?.length !== 0 && <MasonryLayout Pins={pins}/>}
      {pins?.length === 0 && searchTerm !== '' && !loading && (<div className='mt-10 text-center text-xl'>No Pins Found !</div>)}
  </div>;
};

export default Search;
