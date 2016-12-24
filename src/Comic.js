'use strict';

let http = require('http');
let cheerio = require('cheerio');

function Comic(url) {
  this.url = url;
  this.content = '';

  this.groups = [];
  this.groupTitleSelector = '.relativeRec .cVolTag';
  this.groupSelector = '.relativeRec .cVolList';
  this.chapterSelector = 'a'
}

Comic.prototype = {
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
    let $ = cheerio(this.content.trim());
    let groupTitleNodes = $.find(this.groupTitleSelector);
    let groupNodes = $.find(this.groupSelector);

    let groups = [];
    for (let i = 0, l = groupNodes.length; i < l; i++) {
      let titleNode = groupTitleNodes.eq(i);
      let title = titleNode ? titleNode.text() : 'empty section ' + i;

      let chapterNodes = groupNodes.eq(i).find(this.chapterSelector);
      let chapters = [];
      for (let j = 0, n = chapterNodes.length; j < n; j++) {
        let chapterNode = chapterNodes.eq(j);
        chapters.push({
          text: chapterNode.text(),
          link: chapterNode.attr('href')
        });
      }

      groups.push({
        title: title,
        chapters: chapters
      });
    }

    this.groups = groups;
  }
};

module.exports = Comic;
