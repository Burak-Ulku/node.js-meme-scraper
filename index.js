import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { URL } from 'url'; // Import the URL library

const baseUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
const targetDirectory = './memes';

// Create the 'memes' directory if it doesn't exist
if (!fs.existsSync(targetDirectory)) {
  fs.mkdirSync(targetDirectory);
}

axios
  .get(baseUrl)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const imgTags = $('img');

    let imgCounter = 1;

    imgTags.each((index, element) => {
      if (imgCounter <= 10) {
        const imgSrc = $(element).attr('src');
        const imgUrl = new URL(imgSrc, baseUrl);
        const imgExtension = path.extname(imgUrl.pathname);
        const imgFilename = `${imgCounter
          .toString()
          .padStart(2, '0')}${imgExtension}`;
        const imgFilePath = path.join(targetDirectory, imgFilename);

        axios({
          method: 'get',
          url: imgUrl.href,
          responseType: 'stream',
        })
          .then((response) => {
            response.data.pipe(fs.createWriteStream(imgFilePath));
            console.log(`Downloaded: ${imgFilename}`);
          })
          .catch((error) => {
            console.error(`Error downloading ${imgFilename}: ${error.message}`);
          });

        imgCounter++;
      }
    });
  })
  .catch((error) => {
    console.error(`Error fetching the website: ${error.message}`);
  });
