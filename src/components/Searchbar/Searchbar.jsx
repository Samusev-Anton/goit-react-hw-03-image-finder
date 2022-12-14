// import { render } from '@testing-library/react';
import React from 'react';
import { ImSearch } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';

export class SearchBar extends React.Component {
  state = {
    searchName: '',
  };

  handleInputChange = event => {
    const newSearchName = event.currentTarget.value.toLowerCase();
    this.setState({ searchName: newSearchName });
  };

  handleSubmit = event => {
    const { searchName } = this.state;
    event.preventDefault();

    if (searchName.trim() === '') {
      toast.error('введите данные для поиска');
      return;
    }
    this.props.onSubmit(searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <div className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={css.SearchFormInput}
            type="text"
            value={this.state.searchName}
            name="name"
            onChange={this.handleInputChange}
          />
          <button className={css.SearchFormButton} type="submit">
            <ImSearch />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}
