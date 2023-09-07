import axios from 'axios';
import fs from 'fs';
import puppeteer from 'puppeteer';

//const fs = require('fs');
const target_directory = './memes';
if (!fs.existsSync(target_directory)) {
  fs.mkdirSync(target_directory);
}

axios
  .get('https://memegen-link-examples-upleveled.netlify.app/')
  .then(function (res) {
    // ... do something with the response
    const html = res.data;
    console.log(html);

    var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
    var results = re.exec(html);

    // console.log(results[6]);
