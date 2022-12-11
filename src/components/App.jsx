import React from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './imageGallery/imageGallery';
import { SearchBar } from './Searchbar/Searchbar';

// import { render } from 'react-dom';

export class App extends React.Component {
  state = {
    searchName: '',
    backEnd: '',
    loading: false,
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      this.setState({ backEnd: '' });
      const searchName = this.state.searchName;
      this.setState({ loading: true });
      // if (searchName === '') {
      //   return;
      // }
      fetch(
        ` https://pixabay.com/api/?q=${searchName}&page=1&key=30760440-578eb64e9c4ff1eb66a65bfe8&image_type=photo&orientation=horizontal&per_page=12 `
      )
        .then(res => res.json())
        .then(backEnd => this.setState({ backEnd: backEnd }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {this.state.loading && <h1>Gruzim...</h1>}
        {this.state.backEnd && (
          <ImageGallery events={this.state.backEnd.hits} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

// https://pixabay.com/api/?q=cat&page=1&key=30760440-578eb64e9c4ff1eb66a65bfe8&image_type=photo&orientation=horizontal&per_page=12
