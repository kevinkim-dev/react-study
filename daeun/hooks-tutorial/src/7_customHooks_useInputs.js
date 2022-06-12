import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initailForm) {
  const [state, dispatch] = useReducer(reducer, initailForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
