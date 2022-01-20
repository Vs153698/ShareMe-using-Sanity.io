import { selectOptions } from '@testing-library/user-event/dist/select-options';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { FeedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
const Feed = () => {
  const [loading, setloading] = useState(false);
  const [Pins, setPins] = useState(null);
  const {categoryId} = useParams()
  useEffect(() => {
    setloading(true)
   if (categoryId) {
     const query = searchQuery(categoryId)
     client.fetch(query).then((data)=>{
      setPins(data)
      setloading(false)
    })
   }else{
    client.fetch(FeedQuery).then((data)=>{
      setPins(data)
      console.log(data);
      setloading(false)
    })
   }
  }, [categoryId]);
  
  if(loading) return <Spinner message = "we are adding new ideas to your feed!"/>
  return <div>
      {Pins && <MasonryLayout Pins={Pins}/>}
  </div>;
};

export default Feed;
