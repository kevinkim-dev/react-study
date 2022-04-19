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

// import { useState } from "react";

// const INITIAL_TEXT = "hello react!";

// function App() {
//   const [text, setText] = useState("");
//   const [showText, setShowText] = useState(true);

//   return (
//     <div>
//       {showText && (
//         <input
//           type="text"
//           ref={(ref) => ref && setText(INITIAL_TEXT)}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       )}
//       <button onClick={() => setShowText(!showText)}>보이기/가리기</button>
//     </div>
//   );
// }

// export default App;

// import { useRef, forwardRef } from "react";

// const TextInput = forwardRef((props, ref) => {
//   <div>
//     <input type="text" ref={ref} />
//     <button>저장</button>
//   </div>;
// });

// function App() {
//   const inputRef = useRef();

//   return (
//     <div>
//       <TextInput ref={inputRef} />
//       <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
//     </div>
//   );
// }

// export default App;

// import { useRef, useEffect } from "react";

// function App() {
//   const inputRef = useRef();

//   useEffect(() => {
//     inputRef.current.focus();
//   });

//   return (
//     <div>
//       <input type="text" ref={inputRef} />
//       <button>저장</button>
//     </div>
//   );
// }

// export default App;
