# 3장. 중요하지만 헷갈리는 리액트 개념 이해하기

## 3.5 ref 속성값으로 자식 요소에 접근하기

- 리액트로 작업하다보면 돔 요소에 직접 접근해야하는 경우가 있다.
  - 돔 요소에 포커스를 주거나, 요소의 크기 및 위치에 접근해야하는 경우 주로 생긴다.
- 이 때 ref 속성값을 이용하면 자식 요소에 직접 접근할 수 있다.

### 3.5.1 ref 속성값 이해하기

```javascript
import { useRef, useEffect } from "react";

function App() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button>저장</button>
    </div>
  );
}

export default App;
```

- 위의 코드는 input과 button이 있고, rendering 되자마자 input에 focus를 주는 코드이다.
- ref를 통해서 input을 제어할 수 있다.
- useRef 훅이 반환하는 ref 객체를 이용해서 자식 요소에 접근할 수 있다.

### 3.5.2 ref 속성값 활용하기

- 클래스형 컴포넌트에 ref를 이용하면 ref.current는 해당 인스턴스를 가리키며 ref.current로 함수를 호출할수도 있다.
- 함수형 컴포넌트에 ref를 이용하면 인스턴스로 만들어지지 않지만, useImperativeHandle 훅을 사용하면 함수형 컴포넌트의 함수와 변수도 외부로 노출시켜서 접근할 수 있다.
  - 하지만 이렇게 자손요소의 ref값을 받아서 사용하는 경우 부모가 자손의 구조를 알아햐므로 유지보수에 좋은 방법은 아니다
- forwardRef를 사용하면 ref 속성값을 받아와서 직접 처리할 수 있다.

```javascript
import { useRef, forwardRef } from "react";

const TextInput = forwardRef((props, ref) => {
  <div>
    <input type="text" ref={ref} />
    <button>저장</button>
  </div>;
});

function App() {
  const inputRef = useRef();

  return (
    <div>
      <TextInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  );
}
```

- ref 속성값으로 함수를 사용할 수도 있다.

```javascript
import { useState } from "react";

const INITIAL_TEXT = "hello react!";

function App() {
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(true);

  return (
    <div>
      {showText && (
        <input
          type="text"
          ref={(ref) => ref && setText(INITIAL_TEXT)}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <button onClick={() => setShowText(!showText)}>보이기/가리기</button>
    </div>
  );
}

export default App;
```

- 위의 함수에서 ref를 사용해서 최초 랜더링시에 ref가 true가 되어 INITIAL_TEXT가 들어가고 그 후엔 input에 따라 바뀔 것이라고 생각이 된다.
- 하지만 ref를 속성값으로 함수가 생성되면, react는 랜더링시마다 새로운 함수를 호만들어 호출하게 되고, 항상 text가 INITIAL_TEXT로 덮이게 된다.
- 이 경우는 useCallback 훅을 이용하면 된다.

```javascript
import { useState, useCallback } from "react";

const INITIAL_TEXT = "hello react!";

function App() {
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(true);

  const setInitialText = useCallback((ref) => ref && setText(INITIAL_TEXT), []);
  return (
    <div>
      {showText && (
        <input
          type="text"
          ref={setInitialText}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <button onClick={() => setShowText(!showText)}>보이기/가리기</button>
    </div>
  );
}

export default App;
```

- useCallback의 memoization 기능으로 react가 새로운 함수를 만들지 않으므로, 최초 랜더링때만 실행되어, 추후 input값의 변경이 잘 이루어지게 된다.

### 3.5.3 ref 속성값 사용시 주의할 점

- ref 속성값으로 참조하는 element를 조건부 랜더링 하는 경우 해당 element가 랜더링 되지 않은 상태에서 ref에 접근하면 에러가 발생한다.
- 따라서 그런 경우 current 속성을 검사하는 코드를 함께 작성해야 한다.
