import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoginOpen: false,
        isRegisterOpen: false,
        isLoggedIn: false
    },

    reducers: {
        toggleLoginModal: ()=>{

        },

        toggleRegisterModal: ()=>{

        },

        loginUser: ()=>{

        },

        logoutUser: ()=>{

        }
    }
});


export {toggleLoginModal, toggleRegisterModal, loginUser, logoutUser};
export default authSlice.reducer;