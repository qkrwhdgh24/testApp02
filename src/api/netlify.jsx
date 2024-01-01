const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/search/book', async (req, res) => {
  try {
    const query = req.query.query;
    const apiUrl = `https://openapi.naver.com/v1/search/book?query=${encodeURIComponent(query)}`;

    // Set up headers with your Naver API credentials
    const headers = {
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
    };

    const response = await axios.get(apiUrl, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
