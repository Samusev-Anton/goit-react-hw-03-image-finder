import React from 'react';
import css from './Button.module.css';

export const Button = ({ totalHits, page, onIncrement }) => {
  //   console.log(page);
  return (
    <>
      {totalHits > 0 && Math.round(totalHits / 12) !== page && (
        <button type="button" className={css.Button} onClick={onIncrement}>
          Load more
        </button>
      )}
    </>
  );
};
