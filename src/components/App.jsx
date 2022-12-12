import React from 'react';
// import { ToastContainer } from 'react-toastify';
import ImageGallery from './imageGallery/imageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/loader';

export class App extends React.Component {
  state = {
    searchName: '',
    backEnd: '',
    page: 1,
    error: null,
    status: 'idle',
  };

  handleLodeMore = event => {
    // console.log(event);
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName) {
      this.setState({ backEnd: '', status: 'pending' });
      fetch(
        ` https://pixabay.com/api/?q=${searchName}&page=${page}&key=30760440-578eb64e9c4ff1eb66a65bfe8&image_type=photo&orientation=horizontal&per_page=12 `
      )
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }
          return Promise.reject(
            new Error(`Нет ничего соответствующего поиску ${searchName}`)
          );
        })

        .then(backEnd =>
          this.setState({ backEnd: backEnd, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== page) {
      this.setState({ status: 'pending' });
      fetch(
        ` https://pixabay.com/api/?q=${searchName}&page=${page}&key=30760440-578eb64e9c4ff1eb66a65bfe8&image_type=photo&orientation=horizontal&per_page=12 `
      )
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }
          return Promise.reject(
            new Error(`Нет ничего соответствующего поиску ${searchName}`)
          );
        })
        .then(backEnd =>
          this.setState({ backEnd: backEnd, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { backEnd, page, error, status } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && <h1>Введите текст для поиска</h1>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1> {error.message} </h1>}
        {status === 'resolved' && (
          <>
            <ImageGallery events={backEnd.hits} />
            <Button
              totalHits={backEnd.totalHits}
              page={page}
              onIncrement={this.handleLodeMore}
            />
          </>
        )}
      </>
    );
  }
}
