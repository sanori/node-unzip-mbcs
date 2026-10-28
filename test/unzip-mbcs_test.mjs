import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { chdir } from 'node:process';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { default as unzip } from '../unzip-mbcs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('unzip-mbcs', () => {
  const testCase = {
    file: path.join(__dirname, 'NewFolder.zip'),
    encoding: 'cp949',
    expected: ['새 텍스트 문서.txt', '새 폴더/', '새 폴더/한글문서.txt'],
  };

  after(() => {
    var files = testCase.expected.slice().reverse();
    files.forEach((x) => {
      try {
        if (x.slice(-1) === '/') {
          fs.rmdirSync(x);
        } else {
          fs.unlinkSync(x);
        }
      } catch (e) {
        if (e.code !== 'ENOENT') {
          throw e;
        }
      }
    });
  });

  it('gives file names in archive', () => {
    var r = unzip.listSync(testCase.file, testCase.encoding);
    assert.deepStrictEqual(
      r.map((x) => x.path),
      testCase.expected,
    );
  });

  it('extracts files in current directory', (_, done) => {
    chdir(__dirname);
    unzip.extractSync(testCase.file, testCase.encoding);
    Promise.all(
      testCase.expected.map(
        (x) =>
          new Promise((resolve, reject) => {
            fs.stat(x, (err, stats) => {
              if (err) {
                reject(err);
              }
              resolve(stats);
            });
          }),
      ),
    ).then(
      () => done(),
      (reason) => done(reason),
    );
  });
});
