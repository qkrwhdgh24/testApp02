import React, { useState } from 'react';
import axios from 'axios';
import SearchBookResult from './SearchBookResult'; // Import your search result component

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
      console.log(err);
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
    </div>
  );
};

export default SearchBook;
