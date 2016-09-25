'use strict';
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const unzip = require('../unzip-mbcs');

describe('unzip-mbcs', function() {
  const testCase = {
    file: path.join(__dirname, 'NewFolder.zip'),
    encoding: 'cp949',
    expected: ['새 텍스트 문서.txt', '새 폴더/', '새 폴더/한글문서.txt']
  };

  it('gives file names in archive', function() {
    var r = unzip.listSync(testCase.file, testCase.encoding);
    expect(r.map(x => x.path)).to.deep.equal(testCase.expected);
  });

  it('extracts files in current directory', function(done) {
    unzip.extractSync(testCase.file, testCase.encoding);
    Promise.all(
      testCase.expected
      .map(x => new Promise((resolve, reject) => {
        fs.stat(x, function(err, stats) {
          if (err) {
            reject(err);
          }
          resolve(stats);
        });
      }))
    ).then(function() {
      done();
    }, function(reason) {
      done(reason);
    });
  });
});
