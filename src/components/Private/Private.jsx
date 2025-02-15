import React,{useContext, useEffect} from "react";
import { Navigate } from "react-router-dom";
import {showErrorToast} from '../../utils/toast'
import {AuthContext} from '../../context/AuthContext'

const Private = ({ children }) => {
  const {loggedInUser} = useContext(AuthContext)
  useEffect(() => {
    if (!loggedInUser) {
      showErrorToast("You are not authenticated! Please log in to continue doing this action");
    }
  }, [loggedInUser]);

  return loggedInUser ? children : <Navigate to="/login" replace />;
};

export default Private;
