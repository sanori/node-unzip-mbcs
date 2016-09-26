#!/usr/bin/env node

'use strict';
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
      l.forEach(function(x) {
        console.log(x.path);
      });
    });

  program.command('x <zipfile> [targets...]')
    .description('extract target files from zipfile.')
    .action(function(zipfile, targets){
      unzip.extractSync(zipfile, program.encoding, targets);
    });

  program.parse(process.argv);
}

if (require.main === module) {
  main();
}
