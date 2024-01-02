//SearchBook.jsx

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

    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}/v1/search/book.json`;

    const instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Naver-Client-Id': 'HjTqhvvcGj1bjRCEuTNG',
            'X-Naver-Client-Secret': 'bIXKGW9Pgb'
        },
    });

    const handleImageSearchClick = async () => {
        if (!bookSearchKeyword.trim()) {
            console.log("검색어 없음");
            return;
        }
        try {


            // Make the POST request to the Naver API
            const response = await instance.get(URL, {
                params: { query: bookSearchKeyword },
                
            });

            // Update the state with search results and POST response
            setBookSearchResult(response.data.items);
            setPostResponse(response.data); // Set the POST response in state
        } catch (err) {
            console.error(err); // Log the error for debugging
        }
    };

    return (
        <div title="이미지 검색하기">
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
