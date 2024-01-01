import React, { useState } from 'react';
import axios from 'axios';
import SearchBookResult from './SeachBookResult';


const SearchBook = ({ setBookImageUrl, setModalState }) => {
  const [bookSearchKeyword, setBookSearchKeyword] = useState("");
  const [bookSearchResult, setBookSearchResult] = useState([]);
  const [postResponse, setPostResponse] = useState(null);

  const handleImageSearchInputChange = (e) => {
    setBookSearchKeyword(e.target.value);
  };

  const handleImageSearchClick = async () => {
    if (!bookSearchKeyword.trim()) {
      console.log("검색어 없음");
      return;
    }
    try {
      // Define the API URL for your serverless function
      const apiUrl = 'https://test-appsite.netlify.app/'; // Update with your serverless function endpoint

      // Make the POST request to the specified URL
      const response = await axios.post(apiUrl, { query: bookSearchKeyword });
      console.log(response)

      // Update the state with search results and POST response
      setBookSearchResult(response.data);
      setPostResponse(response.data); // Set the POST response in state
    } catch (err) {
      console.error(err); // Log the error for debugging
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
      
      {/* Display the POST response, if any */}
      {postResponse && (
        <div>
          <h3>POST Response</h3>
          <pre>{JSON.stringify(postResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SearchBook;
