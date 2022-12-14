import React from 'react';
import css from './Image.module.css';

const Image = ({ webformatURL, user }) => {
  return (
    <img src={webformatURL} alt={user} className={css.ImageGalleryItemImage} />
  );
};

export default Image;
