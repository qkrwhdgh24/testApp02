import axios from 'axios';
import React, { useState, useEffect } from 'react';

function SearchBook() {
    const [keywords, setKeywords] = useState('');
    const [bookResults, setBookResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(bookResults);
    }, [bookResults]);

    const bookSearchKeyword = (e) => {
        setKeywords(e.target.value);
    };
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const URL = `${PROXY}/v1/search/book.json`;

const instance = axios.create({
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         'X-Naver-Client-Id': process.env.REACT_APP_NAVER_ID,
         'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_SECRET,
      },
   });

   const searchBookEvent = async () => {
    if (!keywords.trim()) {
        console.log('검색어 없음');
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        // Append keywords to the URL
        const res = await instance.get(`${URL}?query=${encodeURIComponent(keywords)}`);
        if (res.headers['content-type']?.includes('application/json')) {
            setBookResults(res.data.items); // Assuming 'items' is the correct field in the response
        } else {
            console.error(res);    
            setError('No data available');
        }
    } catch (error) {
        console.error(error);
        setError('Failed to load data');
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div>
            <input 
                value={keywords}
                onChange={bookSearchKeyword}
            />
            <button onClick={searchBookEvent}>검색</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {Array.isArray(bookResults) && bookResults.map((book, index) => (
                <div key={index}>
                    <p>{book.title}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchBook;
