# UTF-8 아닌 파일명을 위한 UnZip

파일 이름이 영문 알파벳이 아닌 한글, 히라가나, 한자로 되어 있는 zip 파일을 제대로 풀어주기 위한 unzip 프로그램 및 그 module. 정확하게는, zip 압축 파일 안의 파일명이 UTF-8이 아닌 MBCS(multi-byte character set)라 불리는 지역 character set으로 encoding되어 있어서 Linux의 unzip package나 mingw 환경의 unzip으로 푸는데 어려움이 있는 zip파일을 잘 풀기 위한 node.js 프로그램과 그 module.

각 언어별로 자주 쓰이는 (UTF-8이 아닌) characher encoding은 다음과 같다:

- 한국어: cp949, euc-kr
- 일본어: sjis (shift_jis), cp932, euc-jp
- 중국어: gbk, gb18030, gb2312, cp936, hkscs, big5, cp950

## 사용법

### CLI (command-line interface)로 실행
Node.js 가 설치되어 있다면, `npx`로 바로 실행할 수 있다.

```bash
npx unzip-mbcs [options] [command]
```

### 모듈로 설치
프로젝트 안에서 모듈로 쓰고 싶다면 다른 npm module과 비슷하게 설치하면 된다.

```bash
npm install unzip-mbcs  # 필요에 따라 -S 혹은 -D 옵션 추가
```

## 명령어 인터페이스

- 사용법: `unzip-mbcs [옵션] [명령]`
- `옵션`
  - `-e`, `--encoding <enc>` zip 파일 내 파일명 character encoding을 `enc`로 지정
  - `-h`, `--help` : 도움말 출력
- `명령`
  - `l <zip파일>` : `zip파일`의 내용을 보여준다
  - `x <zip파일> [target ...]` : `zip파일`을 현재 디렉토리에 푼다. target 이 주어진 경우 파일명이 target으로 시작하는 파일들만 푼다.
  - `help [명령]` : `명령`에 대한 설명

## API

### listSync(zipFilename, encoding='cp437')

zip 압축파일 `zipFilename`에 저장된 파일들의 정보를 array형태로 반환함. `zipFilename`의 character encoding을 `encoding`으로 간주함.

### extractSync(zipFilename, encoding='cp437', [filters])

zip 압축파일 `zipFilename`의 내용을 현재 디렉토리에 풂. `zipFilename`의 파일 이름이 `encoding`의 character encoding되어 있다고 가정함. `filter`가 주어질 경우 `filter`로 시작하는 파일들만 풂.

## 제작 동기

.ZIP 형식(또는 PKZIP 압축)은 널리 사용되어 왔으며, 중요한 데이터가 .zip 파일 형태로 보관되어 있는 경우도 많다. 그러나 ASCII나 서구권 문자가 아닌 환경에서는 파일 이름과 관련한 문제가 발생한다.

ZIP 형식은 매우 오래전(1993년)에 만들어졌기 때문에, 아카이브 내 파일 이름을 어떤 문자 인코딩으로 기록해야 하는지 정의되어 있지 않을 뿐 아니라, 기록된 파일명이 어떤 인코딩인지 표시하는 필드도 없다. 그래서, 대부분의 ZIP 파일내 항목은 charset이라고도 부르는 과거의 레거시 문자 인코딩으로 기록되어 있는 경우가 많다.

오늘날 리눅스(Linux)와 같이 유니코드(Unicode)를 기반으로 하거나 전 세계적인 데이터 처리가 이루어지는 환경에서는, 이러한 점이 불편함을 초래한다. 구체적으로는 이식성 저하, 파일 이름 깨짐, 압축 해제 실패 등의 문제가 발생할 수 있다.

이 모듈은 이러한 불편함을 완화하는 데 도움을 줄 수 있다고 생각한다.
