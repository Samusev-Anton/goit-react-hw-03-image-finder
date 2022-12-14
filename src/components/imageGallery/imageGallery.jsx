import React from 'react';
import css from './ImageGallery.module.css';
import Image from 'components/Image/Image';

const ImageGallery = ({ events, picture }) => {
  // console.log(events);
  return (
    <ul className={css.ImageGallery}>
      {events.map(({ id, webformatURL, user, largeImageURL }) => (
        <li key={id} className={css.ImageGalleryItem}>
          <Image
            webformatURL={webformatURL}
            user={user}
            onClick={() => picture({ largeImageURL })}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
