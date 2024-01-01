import React, { useState } from 'react';
import axios from 'axios';
import SearchBookResult from './SeachBookResult';

const SearchBook = ({ setBookImageUrl, setModalState }) => {
  const [bookSearchKeyword, setBookSearchKeyword] = useState("");
  const [bookSearchResult, setBookSearchResult] = useState([]);

  const handleImageSearchInputChange = (e) => {
    setBookSearchKeyword(e.target.value);
  };

  const handleImageSearchClick = async () => {
    if (!bookSearchKeyword.trim()) {
      console.log("검색어 없음");
      return;
    }
    try {
      // Define the apiUrl for your serverless function
      const apiUrl = '/.netlify/functions/netlify'; // Update with your serverless function endpoint

      // Make the API request to your serverless function
      const { data } = await axios.get(`${apiUrl}?query=${encodeURIComponent(bookSearchKeyword)}`);

      // Update the state with search results
      setBookSearchResult(data);
    } catch (err) {
      console.error(err); // Log the error for debugging
    }
  };

  // Include your sample Axios POST request code here
  const sendSamplePostRequest = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://openapi.naver.com/v1/search/book.json?query=김겨울',
      headers: {
        'X-Naver-Client-Id': 'HjTqhvvcGj1bjRCEuTNG',
        'X-Naver-Client-Secret': 'bIXKGW9Pgb',
      },
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div title="이미지 검색하기" setModalState={setModalState}>
      {/* ... Your modal content ... */}
      <input
        placeholder="책 제목, 지은이, 키워드로 검색할 수 있습니다."
        value={bookSearchKeyword}
        onChange={handleImageSearchInputChange}
      />
      <button onClick={handleImageSearchClick}>검색</button>
      {bookSearchResult.map((item, index) => (
        <SearchBookResult
          key={index}
          item={item}
          setBookImageUrl={setBookImageUrl}
          setModalState={setModalState}
        />
      ))}
      
      {/* Include a button to trigger your sample POST request */}
      <button onClick={sendSamplePostRequest}>Send Sample POST Request</button>
    </div>
  );
};

export default SearchBook;
