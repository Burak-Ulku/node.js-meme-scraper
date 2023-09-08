import axios from 'axios';
import fs from 'fs';

//const fs = require('fs');
const target_directory = './memes';
if (!fs.existsSync(target_directory)) {
  fs.mkdirSync(target_directory);
}

axios
  .get('https://memegen-link-examples-upleveled.netlify.app/')
  .then(function (res) {
    console.log(res);
    // ... do something with the response
  })
  .catch(function (error) {
    console.log(error);
  });
