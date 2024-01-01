// netlify/functions/search-books.js

const axios = require('axios');

exports.handler = async function(event, context) {
    const query = event.queryStringParameters.query;
    const apiUrl = `https://openapi.naver.com/v1/search/book?query=${query}`;
    // Naver API 요청을 여기에서 수행하고 결과를 반환합니다.
};

// netlify.toml

[build]
  functions = "netlify/functions"
