const express = require('express');
const axios = require('axios');

const app = express();
const port = 'https://test-appsite.netlify.app/';

const client_id = 'HjTqhvvcGj1bjRCEuTNG';
const client_secret = 'bIXKGW9Pgb';

app.get('/search/book', async (req, res) => {
  try {
    const query = req.query.query;
    const apiUrl = `https://openapi.naver.com/v1/search/book?query=${encodeURI(query)}`;

    const headers = {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret,
    };

    const response = await axios.get(apiUrl, { headers });

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
