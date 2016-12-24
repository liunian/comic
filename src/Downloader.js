'use strict';

let fs = require('fs');
let http = require('http');
let url = require('url');
let path = require('path');
let request = require('request');

function Downloader(referer) {
  this.options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
      'Referer': referer
    }
  };
}

Downloader.prototype = {
  setReferer: function(referer) {
    this.options.headers.Referer = referer;
  },
  download: function(img, dest) {
    let options = Object.assign({}, url.parse(img), this.options);

    return new Promise((resolve, reject) => {
      let file = fs.createWriteStream(dest);
      file.on('finish', function() {
        resolve();
      }).on('error', function(e) {
        reject(e);
      });

      request.get(img, this.options).pipe(file);
    });
  }
};

module.exports = Downloader;
