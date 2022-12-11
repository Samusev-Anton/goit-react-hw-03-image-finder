import React from 'react';

const ImageGallery = ({ events }) => {
  console.log(events);
  return (
    <ul>
      {events.map(({ id, userImageURL }) => (
        <li key={id}>
          <img src={userImageURL} alt="" />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
