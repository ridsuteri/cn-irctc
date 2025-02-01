import React, { useState } from 'react'
import ClassBasedExample from './ClassBasedExample'
import FunctionalBasedExample from './FunctionalBasedExample'
function WrapperForExample() {

  const [showComponent, setShowComponent] =  useState(true)
  return (
    <>
    <button onClick={()=>setShowComponent((prevState)=>!prevState)}>Toggle Component Visibility</button> <br />
    {showComponent ? <FunctionalBasedExample/> : <></>}
    </>
  )
}

export default WrapperForExample