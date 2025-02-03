import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CustomHookUsage = () => {

    const [getValue, setValue ] = useLocalStorage()
    
    console.log(setValue('ridsuteri', '@1234')) // set a pair 
    console.log(getValue('ridsuteri')) // @1234

    return (
    <div>
        Using custom hook here
    </div>
  )
}

export default CustomHookUsage