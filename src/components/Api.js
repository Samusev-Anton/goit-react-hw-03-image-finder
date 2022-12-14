import axios from 'axios';

const URL = 'https://pixabay.com/api';
const KEY_URL = '30760440-578eb64e9c4ff1eb66a65bfe8';
const OPTIONS_URL = 'image_type=photo&orientation=horizontal&per_page=12';

axios.defaults.baseURL = `${URL}`;

export const fetchSearch = async (searchName, page) => {
  const responce = await axios.get(
    `/?q=${searchName}&page=${page}&key=${KEY_URL}&${OPTIONS_URL}`
  );
  return responce.data;
};
