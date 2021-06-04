const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

const download = (url, dest, cb) => {
  request(url, (error, response, body) => {
    if (error) {
      console.log('request err: ',error);
    }
    if (response.statusCode !== 200) {
      console.log(`Status Code ${response.statusCode} when fetching. Response: ${body}`);
      return;
    }
    cb(dest, body);
  })
};

function writeToLocal(dest, body) {
  fs.writeFile(dest, body, err => {

    if (err) {
      console.error('write to file err: ', err)
      return `Error`;
    }
    console.log(`Downloaded and saved to ${args[1]}`) //file written successfully
  })
}


download(args[0], args[1], writeToLocal); 