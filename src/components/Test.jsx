import React from 'react'
import { useNavigate } from 'react-router-dom'

function Test() {
    const navigate = useNavigate()
  return (
    <div>
        Test component
        <button onClick={()=>navigate(-1)}> go back </button>
    </div>
  )
}

export default Test