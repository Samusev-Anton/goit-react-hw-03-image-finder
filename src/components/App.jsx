import React from 'react';
import { toast } from 'react-toastify';
import ImageGallery from './imageGallery/imageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/loader';
import { Modal } from './Modal/Modal';
import { fetchSearch } from './Api';
import 'react-toastify/dist/ReactToastify.css';

// const URL = 'https://pixabay.com/api/';
// const KEY_URL = '30760440-578eb64e9c4ff1eb66a65bfe8';
// const OPTIONS_URL = 'image_type=photo&orientation=horizontal&per_page=12';

export class App extends React.Component {
  state = {
    searchName: '',
    backEnd: '',
    page: 1,
    error: null,
    status: 'idle',
    largeImage: '',
  };

  handleImgClick = largeImageURL => {
    // console.log(largeImageURL);
    this.setState({ largeImage: largeImageURL });
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

  modalClose = () => {
    this.setState({ largeImage: '' });
  };

  async componentDidUpdate(_, prevState) {
    const { searchName, page } = this.state;
    const newSearchName = prevState.searchName !== searchName;
    const newPage = prevState.page !== page;

    if (newSearchName || newPage) {
      this.setState({ backEnd: '', status: 'pending' });
      if (newSearchName) {
        this.setState({ page: 1 });
      }

      try {
        const responce = await fetchSearch(searchName, page);
        this.setState({ backEnd: responce, status: 'resolved' });

        console.log(responce);
      } catch (error) {
        this.setState({
          status: 'rejected',
        });
        toast.error('Что-то пошло не так, попробуйте перезагрузить страницу');
      }
    }
  }

  // componentDidUpdate(_, prevState) {
  //   const { searchName, page } = this.state;
  //   const newSearchName = prevState.searchName !== searchName;
  //   const newPage = prevState.page !== page;

  //   if (newSearchName || newPage) {
  //     this.setState({ backEnd: '', status: 'pending' });
  //     if (newSearchName) {
  //       this.setState({ page: 1 });
  //     }
  //     fetch(
  //       ` ${URL}?q=${searchName}&page=${page}&key=${KEY_URL}&${OPTIONS_URL} `
  //     )
  //       .then(responce => {
  //         if (responce.ok) {
  //           return responce.json();
  //         }
  //         return Promise.reject(
  //           new Error(`Нет ничего соответствующего поиску ${searchName}`)
  //         );
  //       })

  //       .then(backEnd =>
  //         this.setState({ backEnd: backEnd, status: 'resolved' })
  //       )
  //       .catch(error => this.setState({ error, status: 'rejected' }));
  //   }
  // }

  render() {
    const { backEnd, page, error, status, largeImage } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && (
          <h1 style={{ textAlign: 'center' }}>Введите текст для поиска</h1>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1> {error} </h1>}
        {status === 'resolved' && (
          <>
            <ImageGallery events={backEnd.hits} picture={this.handleImgClick} />
            <Button
              totalHits={backEnd.totalHits}
              page={page}
              onIncrement={this.handleLodeMore}
            />
            {largeImage && (
              <Modal onClose={this.modalClose}>
                <img
                  src={largeImage.largeImageURL}
                  alt="тут должна быть картинка"
                />
              </Modal>
            )}
          </>
        )}
      </>
    );
  }
}
