import React, { useEffect } from "react";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import BookingHistory from "./pages/BookingHistory/BookingHistory";
import BookingDetails from "./pages/BookingDetails/BookingDetails";
import Register from "./pages/Register/Register";
import ClassBasedComponent from "./pages/ClassBasedComponent";
import FunctionalComponent from "./pages/FunctionalComponent";
import WrapperForExample from "./components/LifeCycleExample/WrapperForExample";
import TrainList from "./components/TrainList/TrainList";
import CustomHookUsage from "./components/CustomHookUsage";

const App = () => {
  return (
    <div>
      {/* <WrapperForExample/> */}
      {/* <CustomHookUsage/> */}
      {/* <Homepage/> */}
      {/* <Register/> */}
      {/* <Login/> */}
      <BookingHistory/>
      {/* <BookingDetails/> */}
      {/* <ClassBasedComponent initialCount = {10} />
      <hr />
      <FunctionalComponent  initialCount = {10} /> */}
    </div>
  );
};

export default App;