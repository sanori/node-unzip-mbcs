#!/usr/bin/env node

'use strict';
const sprintf = require('sprintf-js').sprintf;
const program = require('commander');
const unzip = require('./unzip-mbcs');

function main() {
  program
    .option('-e, --encoding <enc>', 'character encoding of filename in .zip');

  program
    .command('l <zipfile>')
    .description('list files in zipfile')
    .action(function(zipfile) {
      var l = unzip.listSync(zipfile, program.encoding);
      console.log('  Length     Date    Time   Name');
      console.log('--------- ---------- ----- -----------');
      l.forEach(function(x) {
        console.log(sprintf('%9d %4d-%02d-%02d %02d:%02d %s',
          x.size,
          x.time.getFullYear(), x.time.getMonth() + 1, x.time.getDate(),
          x.time.getHours(), x.time.getMinutes(),
          x.path
        ));
      });
    });

  program.command('x <zipfile> [targets...]')
    .description('extract target files from zipfile.')
    .action(function(zipfile, targets) {
      unzip.extractSync(zipfile, program.encoding, targets);
    });

  program.parse(process.argv);
}

if (require.main === module) {
  main();
}
