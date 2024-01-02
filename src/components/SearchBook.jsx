//SearchBook.jsx

import React, { useState } from 'react';
import axios from 'axios';
import SearchBookResult from './SeachBookResult';


const SearchBook = ({ setBookImageUrl, setModalState }) => {
    const [bookSearchKeyword, setBookSearchKeyword] = useState("");
    const [bookSearchResult, setBookSearchResult] = useState([]);
    const [postResponse, setPostResponse] = useState(null);


    return (
        <div title="이미지 검색하기" >
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
