import { useState } from "react";

function FunctionalComponent(props) {
  // hooks were added later which introduced concept of states in functional components
  let [count, setCount] = useState(props.initialCount || 0);

  const increment = () => {
    setCount((prevState) => ++prevState);
  };

  const decrement = () => {
    setCount((prevState) => --prevState);
  };

  return (
    <>
      <h1>I am functional component</h1>
      <div>{count}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}

export default FunctionalComponent;
