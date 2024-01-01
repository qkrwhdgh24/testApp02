const axios = require('axios');

exports.handler = async function(event, context) {
    const query = event.queryStringParameters.query;
    const apiUrl = `https://openapi.naver.com/v1/search/book?query=${encodeURIComponent(query)}`;

    // Set up the headers with your Naver API credentials
    const headers = {
        'X-Naver-Client-Id': process.env.REACT_APP_NAVER_ID,
        'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_SECRET,
    };

    try {
        const response = await axios.get(apiUrl, { headers });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        // Handle errors (e.g., API request failed)
        return {
            statusCode: error.response ? error.response.status : 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
