import React from 'react';
import { Circles } from 'react-loader-spinner';
import css from './loader.module.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <Circles
        height="80"
        width="80"
        color="blue"
        ariaLabel="circles-loading"
        wrapperStyle={{ margin: 'auto' }}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
