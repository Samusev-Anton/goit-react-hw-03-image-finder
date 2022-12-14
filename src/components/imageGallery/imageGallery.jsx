import React from 'react';
import css from './ImageGallery.module.css';

const ImageGallery = ({ events, picture }) => {
  // console.log(events);
  return (
    <ul className={css.ImageGallery}>
      {events.map(({ id, webformatURL, user, largeImageURL }) => (
        <li key={id} className={css.ImageGalleryItem}>
          <img
            id={id}
            src={webformatURL}
            alt={user}
            className={css.ImageGalleryItemImage}
            onClick={() => picture({ largeImageURL })}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
