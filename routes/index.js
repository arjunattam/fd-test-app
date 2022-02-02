const { default: axios } = require('axios');
const qs = require('qs');
var express = require('express');
var router = express.Router();

const url = 'https://fd-mock-backend.setu.co';

/* GET home page. */
router.get('/', async function (req, res, next) {
  const clientId = 'test';
  const clientSecret = '7a1958fa-3223-4349-9cde-98f4cd4350ff';

  // Get partner access token
  const data = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  }
  const response = await axios.post(`${url}/auth/token`, qs.stringify(data));
  const { accessToken } = response.data;

  // Get SDK access token
  const data2 = {
    "email": "arjunattam@gmail.com",
    "userId": "579d57be-8c90-4352-8e2b-f9c1c4f8bfdb", //make sure you replace this 
    "userName": "Arjun"
  }
  const response2 = await axios.post(`${url}/auth/sdk/token`, data2,
    { headers: { 'Authorization': `Bearer ${accessToken}` } });
  console.log(response2.data);
  const { accessToken: sdkAccessToken, refreshToken: sdkRefreshToken } = response2.data;

  res.render('index', { title: 'Express', sdkAccessToken, sdkRefreshToken });
});

module.exports = router;
