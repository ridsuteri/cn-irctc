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
import Private from "./components/Private/Private";
import {AuthProvider} from './context/AuthContext'
import UseCallbackWrapper from './components/UseCallbackWrapper'
import { Toaster} from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/booking",
      element: <Private><BookingDetails /></Private>,
    },
    {
      path: "/history",
      element: <Private><BookingHistory /></Private>,
    },
  ]);
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
    // <UseCallbackWrapper/>
  );
};

export default App;