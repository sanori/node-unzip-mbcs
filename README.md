[한국어 README](docs/README.ko.md)

# UnZip for non-UTF-8 encoding

Extract ZIP files with MBCS (multi-byte character set) filenames, such as those created in MS Windows, especially in East Asian environments.

Major non-UTF-8 encodings by language:

- Korean: cp949, euc-kr
- Japanese: sjis (shift_jis), cp932, euc-jp
- Chinese: gbk, gb18030, gb2312, cp936, hkscs, big5, cp950

## Usage

### Run via CLI

You can run the command-line interface directly using `npx`:

```bash
npx unzip-mbcs [options] [command]
```

### Install as a Module (for programmatic use)

If you want to use this package in your project, you can install it in the same way as any other npm module.

```bash
npm install unzip-mbcs  # Add the -S or -D option if needed
```

## Command-line Interface

```
Usage: unzip-mbcs [options] [command]

Options:
  -e, --encoding <enc>      character encoding of filename in .zip
  -h, --help                display help for command

Commands:
  l <zipfile>               list files in zipfile
  x <zipfile> [targets...]  extract target files from zipfile.
  help [command]            display help for command
```

## API

### listSync(zipFilename, encoding='cp437')

Returns information about the files in the zip archive `zipFilename` using the specified character `encoding`.

### extractSync(zipFilename, encoding='cp437', [filters])

Extracts files from the zip archive `zipFilename` into the current directory, assuming the file names inside are encoded with `encoding`. If `filters` are provided, only files whose names start with the values in the `filters` list will be extracted.

## Motivation

The .ZIP format (or PKZIP compression) has been widely used. Some valuable data are archived as .zip files. But in non-ASCII, non-Western environments, this causes trouble with filenames.

Because the ZIP format was created a long time ago (in 1993), it lacks a defined standard for the character encoding used for file names within an archive. Furthermore, no field indicates which encoding was used for a given file name. Consequently, entries in most ZIP files are often recorded using legacy character encodings, frequently referred to as "charsets."

In a modern Unicode-based or global data-processing environment such as Linux, this causes inconvenience, reduces portability, mangled filenames, failed extractions, and more.

This module aims to mitigate these difficulties.
