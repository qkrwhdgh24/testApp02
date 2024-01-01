var express = require('express');
var request = require('request'); // 파일 상단으로 이동
var app = express();

// 환경 변수 사용으로 보안 강화
var client_id = process.env.NAVER_CLIENT_ID;
var client_secret = process.env.NAVER_CLIENT_SECRET;

app.get('/search/blog', function (req, res) {
   if (!req.query.query) {
       return res.status(400).send('Query parameter is required');
   }

   var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query);
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };

   request.get(options, function (error, response, body) {
     if (error) {
       console.error('Request error:', error);
       return res.status(500).send('Internal Server Error');
     }
     
     if (response.statusCode !== 200) {
       console.error('API error:', response.statusCode);
       return res.status(response.statusCode).send('Error from API');
     }

     res.setHeader('Content-Type', 'application/json;charset=utf-8');
     res.send(body);
   });
});

app.listen(3000, function () {
   console.log('Server is running on port 3000. Go to http://127.0.0.1:3000/search/blog?query=검색어');
});
