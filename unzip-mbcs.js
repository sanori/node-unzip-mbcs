'use strict';
const fs = require('node:fs');
const AdmZip = require('adm-zip');
const iconv = require('iconv-lite');
const method2String = {
  0: 'stored',
  1: 'shrunk',
  6: 'imploded',
  8: 'deflated',
  9: 'deflate64',
  14: 'LZMA',
};

function fixZipFilename(filename, encoding) {
  encoding = encoding || 'cp437';
  return iconv.decode(filename, encoding);
}

function listSync(zipFilename, encoding) {
  var zip = new AdmZip(zipFilename);
  var results = zip.getEntries().map((x) => {
    return {
      path: fixZipFilename(x.rawEntryName, encoding),
      time: x.header.time,
      size: x.header.size,
      method: method2String[x.header.method] || 'unknown',
    };
  });
  return results;
}

function extractSync(zipFilename, encoding, filters) {
  var zip = new AdmZip(zipFilename);
  var zipEntries = zip.getEntries();

  if (filters && filters.length > 0) {
    zipEntries.forEach((x) => {
      var path = fixZipFilename(x.rawEntryName, encoding);
      var match = filters
        .map((x) => {
          return path.startsWith(x);
        })
        .reduce((acc, cur) => {
          return acc || cur;
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
    zipEntries.forEach((x) => {
      var path = fixZipFilename(x.rawEntryName, encoding);
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
  extractSync: extractSync,
};
