// import { render } from '@testing-library/react';
import React from 'react';
import { ImSearch } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';

export class SearchBar extends React.Component {
  state = {
    searchName: '',
  };

  handleInputChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchName.trim() === '') {
      toast.error('введите данные для поиска');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.searchName}
            name="name"
            onChange={this.handleInputChange}
          />
          <button type="submit">
            <ImSearch />
            Search
          </button>
        </form>
      </>
    );
  }
}
