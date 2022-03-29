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
  - HMR(Hot-Module-Replacement): 웹팩에서 제공하는 기능으로, 모든 종류의 모듈을 새로고침할 필요 없이 런타임에 바로 업데이트 할 수 있다.
- 직접 구축할 경우 오래걸리면서 버전이 바뀔 경우 유지보수가 필요하다
  - create-react-app은 패키지 버전만 올리면 된다.

### 1.3.1 create-react-app 사용해보기

- `npx create-react-app < app name >`으로 사용한다.
  - 혹은 `npm install -g create-react-app` 후에 `create-react-app < app name>`을 사용한다
- `npm start`로 프로젝트 시작
- index.js와 index.html, package.json은 필수 파일
- index.js에 연결 될 모든 js 파일은 src 폴더 내부에 있어야 한다.
- 웬만하면 모든 파일은 src에서 관리한다
- 빌드 시 자동 압축된다
- 검색 엔진 최적화를 위해서는 Next.js 선택지도 존재한다
- PWA(Progressive Web App) 기능을 원한다면 serviceWorker.js file과 함게 serviceWorker.register()를 index.js 에 포함시킨다.

### 1.3.2 주요 명령어 알아보기

- 개발모드
  - `npm start`로 실행
  - HMR을 통한 수정된 코드 자동 반영
  - 브라우저에서 error message 확인 가능
  - https 실행 지원
    - 맥: `HTTPS=true npm start`
    - 윈도우: `set HTTPS=true && npm start`
    - 자체 서명 인증서를 사용해서 경고가 뜨지만 무시해도 무방
- 빌드
  - `npm run build`로 실행, 배호 환경에서 사용할 파일 생성
  - 모든 파일, css, 등이 압축된다
    - 10kb 미만의 파일은 data:url을 통해서 문자열 형태로 포함
    - 10kb 이상의 파일은 < 파일이름 >.{해시값}.{확장자}의 형식으로 저장
- 테스트
  - `npm test`를 통해서 테스트 실행
  - create-react-app을 사용하면 jest 기반 테스트 시스템이 자동 구축
  - test가 진행되는 파일
    - **test**폴더 밑의 모든 js 파일
    - 이름이 .test.js, .spec.js로 끝나는 파일
  - test는 watch 모드로 동작한다.
    - CI(Continuous Integration)과 같이 watch 모드가 필요없는 경우 watch 없이 test돌릴 수 있다
      - 맥: `CI=true npm test`
      - 윈도우: `set "CI=true" && npm test`
- 설정 파일 추출
  - `npm run eject`를 사용하면 create-react-app 내부 설정 파일이 노출된다.
  - 바벨이나 웹팩의 설정을 변경할 수 있다
  - 리액트 툴체인에 익숙해지고 사용하는 것을 추천

### 1.3.3 자바스크립트 지원 범위

- create-react-app은 ES6 의 모든 기능을 지원한다
- 그 외 추가된 기능
  - 지수 연산자
  - async, await
  - 나머지 연산자(rest operator), 전개 연산자(spread operator)
  - 동적 임포트(dynamic import)
    - 필요한 경우에만 모듈을 import해서 초기 성능을 높인다
  - 클래스 필드(class field)
  - JSX 문법
  - 타입스크립트, 플로 타입 시스템
    - flow도 타입스크립트처럼 타입을 정의하고 js를 코딩할 수 있는 스크립트
- core.js를 통해 다양한 polyfill을 사용할 수 있다
  - polyfill
    - 자바스크립트의 새로운 feature가 나와도 브라우저에서 지원하지 않는 경우 사용이 불가능
    - babel을 통해서 기능이 존재하지 않는 경우 선택적으로 변환해서 기능을 사용할 수 있게 하는 것을 polyfill이라고 부른다

### 1.3.4 코드 분할하기

- 코드 분할을 통해 사용자에게 필요한 양의 코드만 내려주면 초기 성능이 좋아진다
  - 한가지 방법으로 동적 임포트가 있다
- 동적 분할을 할 시 build 후 별개의 js파일이 생성되어 필요한 경우만 내려받도록 구현된다
- SPA를 위해 react-router-dom을 이용하는 경우 페이지 단위 코드 분할을 적용할 수 있다.

### 1.3.5 환경변수 사용하기

- create-react-app에서는 빌드 시점에 환경 변수를 코드로 전달할 수 있다.
- 환경변수는 개발, 테스트, 배포 환경별로 다른 값을 적용할 수 있다.
- process.env.{환경변수 이름} 으로 접근할 수 있다.
- NODE_ENV 환경변수 이용하기(어떤 환경인지 확인 가능)
  - npm start: development
  - npm test: test
  - npm run build: production
- 기타 환경 변수 이용하기
  - process.env.REACT*APP* 으로 접근 가능
  - 환경 변수는 shell에서 입력하거나 .env 파일로 입력할 수 있다.
  - shell
    - 맥: `REACT_APP_API_URL=api.myapp.com npm start`
    - 윈도우: `set "REACT_APP_API_URL=api.myapp.com" && npm start`
  - .env파일
    - `REACT_APP_API_URL=api.myapp.com`
- autoprefixer
  - css의 최신 기능을 사용하려면 vendor prefix가 붙은 이름을 사용해야 한다
    - -webkit, -ms
  - create-react-app에 포함 된 autoprefixer 패키지를 통해 벤더 접두사를 자동으로 붙일 수 있다.

## 1.4 CSS 작성 방법 결정하기

- 기존의 css 작성 방식은 css 파일을 작성한 후 link태그를 이용해 html에 전달하는 것
- 순수 css는 재사용이 어려울 수 있기 때문에 SASS(Syntactically Awesome StyleSheet)를 사용하기도 한다.
  - 변수와 믹스인 개념이 있어서 중복 코드를 많이 줄일 수 있다
- 응집도가 높은 좋은 컴포넌트를 작성하기 위해 css코드도 컴포넌트 내부에서 관리되면 좋다
  - css-module, css-in-js 방식으로 관리할 수 있다

### 1.4.1 일반적인 css 파일로 작성하기

- 일반적으로 파일마다 css파일로 분리해서 작성하고 import한다면, 추후 같은 이름을 가진 css 속성은 덮어씌워질 수 있다

### 1.4.2 css-module로 작성하기

- css-module을 통해서 이 충돌을 해결할 수 있다.
- 간결한 클래스명을 이용해서 컴포넌트 단위로 스타일을 적용할 때 좋다.
- `{name}.module.css`와 같이 작명한 파일은 css-module이 된다.
- css-module을 통해서 만들어진 component의 클래스는 해시값을 포함하여 다른 이름과 충돌이 발생하지 않는다.
- $와 {}로 이루어진 코드를 간결히 하기 위해서 classnames 패키지를 이용할 수 있다.
  - classnames를 이용해서 조건부로 클래스를 바꿀 수도 있다.

### 1.4.3 Sass로 작성하기

- Sass는 변수, 믹스인 등의 개념을 통해 스타일 코드를 재사용 할 수 있게 해줌으로써 생산성 높은 코드를 작성하게 해준다.
- `npm install node-sass`로 설치해서 사용한다
- Sass 문법으로 작성된 파일은 node-sass 패키지로 빌드 단계를 거쳐서 CSS파일로 변환된다.
- create-react-app으로 생성된 프로젝트엔 Sass를 위한 빌드 시스템이 구축되어 있으며, scss 확장자를 가지는 파일을 불러오면 자동으로 css파일로 컴파일된다.

### 1.4.4 css-in-js로 작성하기

- css 코드를 js 안에서 작성한다
- css 코드를 변수로 관리할 수 있다.
- 마크업 팀이 따로 있는 회사라면 적용하기 힘들 수 있다.
- 가장 유명한 css-in-js 패키지로는 styled-component가 있다
  - `npm install styled-component`로 설치한다
- 함수형 컴포넌트를 생성하고 styled.div`` 문법을 사용해서 정의한다
- 다른 styled component를 상속할 땐 styled(<상속할 styled component이름>)`` 으로 정의한다.
- styled-component엔 attribute를 넘기고, props를 이용해서 attribute를 이용한 랜더링도 가능하다.

### 1.5 단일 페이지 애플리케이션 만들기

- 리액트 앱의 페이지 전환은 단일 페이지 앱(Single Page Application) 방식으로 개발하는 것이 정석이다.
- SPA는 초기 요청 시 서버에서 첫 페이지를 처리하고 이후의 라우팅은 클라이언트에서 처리하는 웹 어플리케이션이다.
- SPA는 랜더링을 서버에서가 아닌 클라이언트에서 수행하기 때문에 페이지 전환 시 깜박이는 단점이 없어지고, 네이티브 앱처럼 자연스럽게 동작한다.

### 1.5.1 브라우저 히스토리 API

- SPA 구현을 위해서 다음 두가지 기능이 필요하다
  - 자바스크립트에서 브라우저 페이지 전환 요청을 보낼 수 있다.
    - 단 브라우저는 서버로 요청을 보내지 말아야 한다.
  - 브라우저의 뒤로가기와 같은 페이지 전환 요청을 자바스크립트에서 처리할 수 있다
    - 이 역시 서버로 요청을 보내지 말아야 한다
- 이러한 조건을 만족하는 브라우저 api는 pushState, replaceState, popState 함수이다.

### 1.5.2 react-router-dom 사용하기

- react-router-dom 패키지를 이용하면 브라우저 히스토리 api를 사용하지 않고 쉽게 구현할 수 있다.
  - react-router-dom도 내부적으로는 브라우저 히스토리 api를 사용한다
- `npm install react-router-dom`으로 설치
- react 뿐만 아니라 react native도 지원한다.
- 현재 설명은 react-router-dom v5인 모양이다.
