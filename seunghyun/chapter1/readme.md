# 1장. 리액트 프로젝트 시작하기

## 1.1 리액트란 무엇인가

- 페이스북에서 개발하고 관리한 라이브러리
- UI 기능만 제공하므로 상태관리, 라우팅, 빌드 시스템 등을 직접 구축해야 한다.
- 이를 돕기 위해 `create-react-app` 이 생김
- 상태가 변하면 UI를 자동으로 업데이트해주는 기능이 있기에 리액트와 같은 라이브러리를 사용한다
  - 리액트의 차별점은 가상 돔(virtual DOM)을 이용하여 변경될 UI의 최소 집합을 계산하여 최적화된 랜더링을 할 수 있다는 것이다.
- 함수형 프로그래밍을 적극 활용한다
  - render 함수는 순수함수, state가 변하지 않으면 항상 같은 값 반환
  - state는 불변 변수로 관리한다.

## 1.2 리액트 개발환경 직접 구축하기

- create-react-app을 사용하지 않고 구축해보면서, 바벨과 웹팩의 필요성 익히기

### 1.2.1 Hello World 페이지 만들기

- createElement
  - React.createElement(component, props, ...children)
  - JSX문법을 사용하려면 바벨이 필요한데, 바벨이 없으므로 현재는 createElement를 통해서 생성한다.
- 돔 요소를 여러개를 두고 랜더링 할 수도 있다.

### 1.2.2 바벨 사용해보기

- 바벨은 자바스크립트 코드를 변환해주는 컴파일러이다.
- 최신 자바스크립트 문법을 지원하지 않는 환경에서도 최신 문법을 사용할 수 있다.
  - 예를 들어 ES5만 지원하는 브라우저이고, ES6로 작성한 코드일 때 바벨이 ES5문법으로 변환해줘서 사용 가능했다.
- react에서는 JSX문법을 사용하기 위해 babel이 필수이다.
- JSX문법과 HTML의 차이점
  - class 대신 className 사용
  - style 적용 시 - 가 아니라 camel case를 이용한다
- @babel/cli
  - babel을 커맨드라인에서 실행할 수 있는 바이너리 파일
- @babel/preset-react
  - JSX로 작성된 코드를 createElement로 바꿔주는 플러그인
- 바벨의 동작
  - 바벨은 js 파일을 받아서 js 파일을 반환한다.
  - 변환 작업은 plugin 단위로 이루어진다.
  - 한 변환을 위해 여러 plugin이 필요한 경우 plugin의 집합을 만들고 preset이라고 부른다

### 1.2.3 웹팩의 기본 개념 이해하기

- 웹팩은 자바스크립트로 만든 프로그램을 배포하기 좋은 형태로 묶어주는 도구이다.
- 기존의 웹사이트 제작 방식은 페이지별로 HTML 파일을 만들어서 불러오는 것
  - js의 역할도 크지 않았고, 파일별로 js 파일이 나뉘었다
- 현재 SPA 형식의 제작방식이 되면서 한개의 html에 수십, 수백개의 js파일이 필요해졌다.
  - 모든 js파일을 < script > 태그로 불러올 수 없다
  - 의존성 때문에 순서를 신경써야한다.
  - 다른 파일의 전역 변수를 덮어씌울수도 있다.
- 기존의 모듈 시스템은 commonJS를 사용했으나, ES6 이후 ESM을 이용한 모듈 시스템을 이용한다
- 웹팩은 commonJS와 ESM을 모두 지원한다.
  - 웹팩이 만들어준 js파일을 HTML파일에 script로 포함시키면 된다.

### 1.2.4 웹팩 사용해 보기

- npx webpack을 통해서 src에 있는 js를 dist 폴더를 생성해서 그안에 main.js로 묶어준다.

## 1.3 create-react-app으로 시작하기

- 웹 어플리케이션을 만들기 위한 환경을 제공한다.
  - babel, webpack, es6+ 문법, css 후처리, HMR(hot-module-replacement), test 시스템 등 필수 환경을 구성해준다.
- 직접 구축할 경우 오래걸리면서 버전이 바뀔 경우 유지보수가 필요하다
  - create-react-app은 패키지 버전만 올리면 된다.

### 1.3.1 create-react-app 사용해보기

- `npx create-react-app < app name >`으로 사용한다.
  - 혹은 `npm install -g create-react-app` 후에 `create-react-app < app name>`을 사용한다
-
