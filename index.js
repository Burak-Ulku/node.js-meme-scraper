import axios from 'axios';
import fs from 'fs';
import https from 'https';

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

const imageUrl = 'https://example.com/image.jpg';
const imageName = 'image.jpg';

const file = fs.createWriteStream(imageName);

https
  .get(imageUrl, (response) => {
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Image downloaded as ${imageName}`);
    });
  })
  .on('error', (err) => {
    fs.unlink(imageName);
    console.error(`Error downloading image: ${err.message}`);
  });
