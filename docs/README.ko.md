# UTF-8 아닌 파일명을 위한 UnZip [![Build Status](https://travis-ci.org/sanori/node-unzip-mbcs.svg?branch=master)](https://travis-ci.org/sanori/node-unzip-mbcs)

파일 이름이 영문 알파벳이 아닌 한글, 히라가나, 한자로 되어 있는 zip 파일을 제대로 풀어주기 위한 unzip 프로그램 및 그 module. 정확하게는, zip 압축 파일 안의 파일명이 UTF-8이 아닌 MBCS(multi-byte character set)라 불리는 지역 character set으로 encoding되어 있어서 Linux의 unzip package나 mingw 환경의 unzip으로 푸는데 어려움이 있는 zip파일을 잘 풀기 위한 node.js 프로그램과 그 module.

각 언어별로 자주 쓰이는 (UTF-8이 아닌) characher encoding은 다음과 같다:

- 한국어: cp949, euc-kr
- 일본어: sjis (shift_jis), cp932, euc-jp
- 중국어: gbk, gb18030, gb2312, cp936, hkscs, big5, cp950

## 설치

```
npm install -g unzip-mbcs
```

## 명령어 (CLI: Command-Line Interface)

```
unzip-mbcs [options] [command]
```

- command

  - `l <zip파일>` : zip 파일의 내용을 보여준다
  - `x <zip파일> [target ...]` : zip 파일을 현재 디렉토리에 푼다. target 이 주어진 경우 target으로 시작하는 파일들만 푼다.

- options:

  - `-h`, `--help` : 도움말 출력
  - `-e`, `--encoding <enc>` zip 파일의 파일 이름 character encoding 지정

## API

### listSync(zipFilename, encoding='cp437')

zip 압축파일 `zipFilename`에 저장된 파일들의 정보를 array형태로 반환함. `zipFilename`의 character encoding을 `encoding`으로 간주함.

### extractSync(zipFilename, encoding='cp437', [filters])

zip 압축파일 `zipFilename`의 내용을 현재 디렉토리에 풂. `zipFilename`의 파일 이름이 `encoding`의 character encoding되어 있다고 가정함. `filter`가 주어질 경우 `filter`로 시작하는 파일들만 풂.
