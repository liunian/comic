'use strict';

let fs = require('fs');
let path = require('path');
let Comic = require('../src/Comic');
let Chapter = require('../src/Chapter');
let Downloader = require('../src/Downloader');

//let comic = new Comic('http://www.iibq.com/comic/82012134447/');
//comic.getPage()
//  .then(function() {
//    comic.parsePage()
//  })
//  .then(function() {
//    console.log(JSON.stringify(comic.groups));
//  });

//let chapter = new Chapter('http://www.iibq.com/comic/82012134447/viewcomic284356/');
//chapter.content = fs.readFileSync(path.join(__dirname, '../data/chapter.html'), 'utf-8');
//chapter.parsePage();
//console.log(JSON.stringify(chapter.imgs));

console.log('download');
let downloader = new Downloader('http://www.iibq.com/comic/82012134447/viewcomic284356/');
downloader.download('http://comic.jmydm.com:8080/jmydm2/34447/284356/zz_0002_6128.JPG', 'a.jpg')
  .then(() => {
    console.log('save');
  }, e => {
    console.error(e);
  });

console.log('test end');
