# 6장. 리덕스로 상태관리하기

- 리덕스는 자바스크립트를 위한 상태관리 프레임워크이다
- 사용하는 이유
  - 컴포넌트 코드로부터 상태관리 코드를 분리할 수 있다
  - 서버 렌더링 시 데이터 전달이 간편하다
  - 로컬 스토리지에 쉽게 데ㅔ이터를 저장하고 불러올 수 있다.
  - 같은 상태값을 다수 컴포넌트에서 뿌려 쓸때 좋다
  - 상관관계가 깊은 컴포넌트 간 상태를 전달할 때 좋다
  - 알림창과 같이 전역 컴포넌트의 상태값을 관리할 때 좋다
  - 페이지가 전환되어도 데이터는 살아 있어야 할 때 좋다

## 6.1 리덕스 사용 시 따라야 할 세가지 원칙

- 원칙
  - 전체 상태값을 하나의 객체에 저장한다
    - 객체형으로 전체 상태값을 관리하면 활용도가 높아진다.
    - redo, undo의 기능을 쉽게 구현할 수 있다.
    - 다만 모든 상태값을 관리하는 것보다 컴포넌트에서 관리하는 게 더 나은 경우도 있다
      - 애니메이션을 위한 데이터나 문자열 입력창의 현재 상태값 등
  - 상태값은 불변 객체이다.
    - 상태값은 오직 액션 객체에 의해서만 변경되어야 한다.
      - action객체는 dispatch 메서드를 호출해서 상태값을 변경한다.
  - 상태값은 순수 함수에 의해서만 변경되어야 한다.
    - 리덕스의 상태값을 변경하는 함수를 리듀서라고 부른다.
      - 리듀서의 구조: (state, action) => nextState
    - 이 함수는 부수효과(side effect)를 발생시키지 않아야한다.
      - 부수효과를 발생시키지 않으려면, 동일 input에서 동일한 output이 나와야 한다.
    - 순수함수로 작성된다면 test code 작성도 쉽다.
      - input에 대한 예상 output을 쉽게 예측 가능하므로 toBe코드를 쉽게 작성 가능하다.

## 6.2 리덕스의 주요 개념 이해하기

- 리덕스의 상태값이 변경되는 과정
  - 액션 -> 미들웨어 -> 리듀서 -> 스토어 -> 뷰 -> 액션

### 6.2.1 액션

- 액션은 type속성값을 가진 자바스크립트 개체이다.
  - 액션의 생성은 function component로 만들지만, 해당 함수의 이름으로 불러오는 것이 아니라, return 된 값의 type을 통해서 호출된다.

```javascript
// 액션 생성
function addTodo({ title, priority }) {
  return { type: "todo/ADD", title, priority };
}

export const ADD = "todo/ADD";

// 호출
store.dispatch({ type: "todo/ADD", title: "영화보기", priority: "high" });
// 혹은(type명 변수로 export 시)
store.dispatch({ type: ADD, title: "영화보기", priority: "high" });
```

- 위와 같이 type을 지정할 때, 간단하면서 겹치지 않는 type명을 지정하기 위해 접두사(todo)와 동작을 설명할 수 있는 동사(ADD)의 조합으로 사용하는 경우가 많다.
  - 이 때, type명이 길어질 수 있는데, type명을 사용하는 곳에서 겹치지 않게 export해준다면 더 간단히 사용할 수 있다.
  - 만약 해당 컴포넌트에서 다른 store의 add를 사용하고, 해당 add도 ADD로 export를 한다면 사용이 불가능하다.
    - 이런 경우 Component를 더 분리하거나, string 타입 명 그대로 사용한다.

### 6.2.2 미들웨어

- 미들웨어는 리듀서가 액션을 처리하기 전에 실행되기 시작해서 액션 처리 전과 후에 작업을 관리하는 함수이다.
- 디버깅 목적으로 상태값 변경 시 로그를 출력하거나, 리듀서에서 발생한 예외를 서버로 전송하는 등의 목적으로 사용 가능하다.
- 미들웨어를 별도로 설정하지 않으면 액션은 곧바로 리듀서로 전해진다.
- 미들웨어 함수 동작 중간에 next(action)을 통해서 리듀서로 전달한다
  - 그 전과 후에 미들웨어의 동작을 정의한다
- 생성된 미들웨어는 createStore시 applyMiddleware(< middleware name>)을 두번째 인자로 전달하면서 동작시킬 수 있다.

### 6.2.3 리듀서

- 리듀서는 액션이 발생했을 때, 새로운 상태값을 만드는 함수이다.
  - 리덕스의 상태는 항상 readonly로 다루기 때문에 state를 직접 바꿀 수 없고, 현재 state를 참조해서 새로운 state를 계속 만들기 때문에 순수 함수가 된다.
- 리듀서의 구조
  - (state, action) => nextState
- 결국 리듀서가 state와 action을 받아서 새로운 state를 반환하면 dispatch가 새로 생성된 state를 store에 저장하는 구조가 된다.

```javascript
dispatch(action) {
    this._state = this.reducer(this._state, action);
}
```

- 리덕스의 상태값은 객체의 참조값이 언제든지 변경될 수 있다.
  - 따라서 객체를 참조할 때는 객체의 참조값이 아닌 고유의 id값을 사용하는 것이 좋다

### 6.2.4 스토어

- 스토어는 리덕스의 상태값을 가지는 객체이다.
- 특별한 이유가 없다면 스토어는 하나만 만드는 것이 좋고, 여러개로 분리해서 사용했다면 combineReducer 함수를 통해서 합칠 수 있다.
- `store = createStore(reducer)`와 같은 방식으로 미리 정의된 reducer를 parameter로 전달하면서 store를 생성한다
  - 이 때 dispatch로 불려진 reducer가 동작할 때 마다 store.subscribe()로 정의된 함수들이 호출된다.

### 6.4 리액트 상태값을 리덕스로 관리하기

### 6.4.2 react-redux 패키지 사용하기

- 리덕스는 리액트 전용이 아닌, 순수 javascript에서 사용 가능한 store이므로 해당 패키지 없이도 사용 가능하다
  - 하지만 react-redux 패키지를 사용하면 더 편리하게 사용 가능하다.
- `npm insstall react-redux`로 설치
- 가장 먼저 가장 상위 컴포넌트에 Provider를 감싸는 것이다

```javascript
// index.js
import {store} from "./common/store";
import { provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App>
    </Provider>,
    document.getElementById('root')
)
```

- Provider 하위의 컴포넌트들은 이제 리덕스 상태값이 변경되면 자동으로 컴포넌트 함수가 호출된다.
- state를 가져올때와 dispatch를 해야할 때 useSelector와 useDispatch를 사용하면, Provider에 등록된 store의 state와 reducer를 쉽게 호출할 수 있다.
- useSelector
  - useSelector 훅으로 state를 받아올 때, 실제로 state가 변하지 않았는 데 또 불러오는 경우가 있다
    - 이런 경우 react-redux에서 제공하는 shallowEqual을 사용하여, 그 전 상태와 비교 후, 변했을 때만 불려서 새로운 상태를 가져올 수 있다.
    - shallowEqual을 자주 사용하는 경우 custom hook을 통해서 가져와도 된다.

```javascript
import { shallowEqual } from "react-redux";

export default function MyComponent() {
  const value = useSelector(state => state.value, shallowEqual);
}

function useMySelector(selector) {
    return useSelector(selector, shallowEqual)
}

export default function MyComponent() {
    const value = useMySelector(state => state.value)
}

```
