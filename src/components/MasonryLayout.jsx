import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin'
const breakpoints = {
    default: 4,
    3000:6,
    1200:3,
    1000:2,
    500:1
}
const MasonryLayout = ({Pins}) => {
  return <div>
      <Masonry className='flex animate-slide-fwd' breakpointCols={breakpoints}>
          {Pins?.map((pin)=>(
              <Pin key={pin._id} pin={pin} className='w-max'/>
          ))}
      </Masonry>
  </div>;
};

export default MasonryLayout;
