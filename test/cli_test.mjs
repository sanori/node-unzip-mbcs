import assert from 'node:assert';
import { execFileSync } from 'node:child_process';
import { describe, it } from 'node:test';

describe('cli', () => {
  it('emits help text when no argument is provided', () => {
    try {
      const output = execFileSync('npx', ['--no-install', 'unzip-mbcs'], {
        encoding: 'utf8',
        stdio: 'pipe',
      });
      assert.match(output, /Usage: unzip-mbcs/i);
    } catch (err) {
      const output = err.stderr || '';
      assert.match(output, /Usage: unzip-mbcs/i);
    }
  });

  it('emits help text when -h option is provided', () => {
    const output = execFileSync('npx', ['--no-install', 'unzip-mbcs', '-h'], {
      encoding: 'utf8',
    });
    assert.match(output, /Usage: unzip-mbcs/i);
    assert.match(output, /Options:/i);
  });
});
