'use strict';

let http = require('http');
let url = require('url');

function Chapter(url) {
  this.url = url;
  this.content = '';
  this.imgs = [];

  this.sourcePtn = /var sFiles="(.*?)";/;
  this.pathPtn = /var sPath="(.*?)";/;

  // http://www.iibq.com/script/ds.js
  this.domains = ['http://comic.jmydm.com:8080/', 'http://comic.dm33.lol:2813/'];
}

Chapter.prototype = {
  getPage: function() {
    let ctx = this;

    return new Promise(function getPagePromise(resolve, reject) {
      http.get(ctx.url, function(res) {
          let body = '';

          res.on('data', function(chunk) {
            body += chunk;
          });
          res.on('end', function() {
            ctx.content = body;
            resolve(body);
          })
        })
        .on('error', function(e) {
          console.error(e.message);
          reject(e);
        });
    });
  },
  parsePage: function() {
    let content = this.content.trim();
    let rawSource = content.match(this.sourcePtn)[1];
    let prefix = content.match(this.pathPtn)[1];

    let imgs = decodeSource(rawSource).split('|');
    this.imgs = imgs.map(img => prefix + img);
  }
};

function decodeSource(source) {
  let hostList = "jmmh.net|iibq.com";
  let hostname = 'www.iibq.com';
  let isValidHost = false;
  for (let i = 0; i < hostList.split("|").length; i++) {
    if (hostname.indexOf(hostList.split("|")[i]) > -1) {
      isValidHost = true;
      break
    }
  }
  if (!isValidHost) return "";
  let lastChar = source.substring(source.length - 1);
  let d = "abcdefghijklmnopqrstuvwxyz".indexOf(lastChar) + 1;
  let e = source.substring(source.length - d - 12, source.length - d - 1);
  source = source.substring(0, source.length - d - 12);
  let k = e.substring(0, e.length - 1);
  let f = e.substring(e.length - 1);
  for (let j = 0; j < k.length; j++) {
    eval("source=source.replace(/" + k.substring(j, j + 1) + "/g,'" + j + "')")
  }
  let g = source.split(f);
  source = "";
  for (let m = 0; m < g.length; m++) {
    source += String.fromCharCode(g[m])
  }
  return source
}

module.exports = Chapter;
