import React from 'react';
import css from './ImageGallery.module.css';

const ImageGallery = ({ events }) => {
  console.log(events);
  return (
    <ul className={css.ImageGallery}>
      {events.map(({ id, webformatURL }) => (
        <li key={id} className={css.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt=""
            className={css.ImageGalleryItemImage}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
