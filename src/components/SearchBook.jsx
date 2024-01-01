import React, { useState } from 'react';
import axios from 'axios';
import SearchBookResult from './SeachBookResult';

const SeachBook = ({ setBookImageUrl, setModalState }) => {
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
        const { data } = await axios.get(`https://openapi.naver.com/v1/search/book?query=${encodeURIComponent(bookSearchKeyword)}`);
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

export default SeachBook
