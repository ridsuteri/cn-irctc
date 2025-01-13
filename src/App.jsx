import React, { useEffect } from "react";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ClassBasedComponent from "./pages/ClassBasedComponent";
import FunctionalComponent from "./pages/FunctionalComponent";

const App = () => {
  return (
    <div>
      <Homepage/>
      {/* <Login/> */}
      {/* <ClassBasedComponent initialCount = {10} />
      <hr />
      <FunctionalComponent  initialCount = {10} /> */}
    </div>
  );
};

export default App;