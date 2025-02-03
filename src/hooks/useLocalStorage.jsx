import React from 'react'

function useLocalStorage() {
    function getValue(key){
        return localStorage.getItem(key)
    }

    function setValue(key, value){
        localStorage.setItem(key, JSON.stringify(value));
        return localStorage.getItem(key) ? true : false 
    }

    return [getValue, setValue]
}

export default useLocalStorage