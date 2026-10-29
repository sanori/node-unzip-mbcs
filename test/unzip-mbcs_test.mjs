import assert from 'node:assert';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { default as unzip } from '../unzip-mbcs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('unzip-mbcs', () => {
  const testCases = [
    {
      file: 'NewFolder.zip',
      encoding: 'cp949',
      expected: ['새 텍스트 문서.txt', '새 폴더/', '새 폴더/한글문서.txt'],
    },
    {
      file: 'ja_JP-plain.zip',
      encoding: 'sjis',
      expected: ['ja_JP/パスワード.txt', 'ja_JP/ローマ字テキスト.txt'],
    },
  ];

  it('gives file names in archive', () => {
    for (const { file, encoding, expected } of testCases) {
      const r = unzip.listSync(path.join(__dirname, file), encoding);
      assert.deepStrictEqual(
        r.map((x) => x.path),
        expected,
      );
    }
  });

  for (const { file, encoding, expected } of testCases) {
    it(`extracts ${file} correctly`, async () => {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
      const origDir = process.cwd();
      try {
        process.chdir(tmpDir);
        unzip.extractSync(path.join(__dirname, file), encoding);
        for (const x of expected) {
          const stats = await fs.promises.stat(x);
          assert.ok(stats, `${x} should exist`);
        }
      } finally {
        process.chdir(origDir);
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });
  }
});
