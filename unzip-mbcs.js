'use strict';
const fs = require('fs');
const AdmZip = require('adm-zip');
const iconv = require('iconv-lite');

function listSync(zipFilename, encoding) {
  var zip = new AdmZip(zipFilename);
  var zipEntries = zip.getEntries();
  return zipEntries.map(function(x) {
    return {
      path: iconv.decode(x.rawEntryName, encoding)
    };
  });
}

function extractSync(zipFilename, encoding, filters) {
  var zip = new AdmZip(zipFilename);
  var zipEntries = zip.getEntries();

  if (filters) {
    zipEntries.forEach(function(x) {
      var path = iconv.decode(x.rawEntryName, encoding);
      var match = filters
        .map(function(x) {
          return path.startsWith(x);
        })
        .reduce(function(acc, cur) {
          return (acc || cur);
        }, false);
      if (match) {
        if (x.isDirectory) {
          fs.mkdirSync(path);
        } else {
          fs.writeFileSync(path, zip.readFile(x));
        }
      }
    });
  } else {
    zipEntries.forEach(function(x) {
      var path = iconv.decode(x.rawEntryName, encoding);
      if (x.isDirectory) {
        fs.mkdirSync(path);
      } else {
        fs.writeFileSync(path, zip.readFile(x));
      }
    });
  }
}

module.exports = {
  listSync: listSync,
  extractSync: extractSync
};
