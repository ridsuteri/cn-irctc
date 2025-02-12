import React from 'react'
import { getAuth } from "firebase/auth";
import app from "../../config/firebase.js";
function Private({Component}) {
    const auth = true;
  return 
    {auth ? <Component/> : <>Please login</>}
  
}

export default Private