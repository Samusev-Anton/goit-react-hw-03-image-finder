import React from 'react';
import css from './Modal.module.css';

export const Modal = ({ modalImage }) => {
  console.log(modalImage);
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={modalImage} alt="тут должна быть картинка" />
      </div>
    </div>
  );
};
