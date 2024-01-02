// api.js
import axios from 'axios';

const API_BASE_URL = 'api';
const CLIENT_ID = process.env.REACT_APP_NAVER_ID;
const CLIENT_SECRET = process.env.REACT_APP_NAVER_SECRET;

export const searchBooks = async (keyword) => {
  const response = await axios.get(`${API_BASE_URL}/v1/search/book.json`, {
    params: { query: keyword },
    headers: {
      'X-Naver-Client-Id': CLIENT_ID,
      'X-Naver-Client-Secret': CLIENT_SECRET
    }
  });
  return response.data;
};
