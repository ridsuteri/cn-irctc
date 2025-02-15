import React, { useState, useContext} from "react";
import { AuthContext } from '../../context/AuthContext';
import Navbar from "../../components/Navbar/Navbar";
import app from "../../config/firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useForm from "../../hooks/useForm";
import {useNavigate} from 'react-router-dom';
import {showSuccessToast, showErrorToast, showInfoToast} from '../../utils/toast'
import styles from "./Login.module.css"; // Import CSS Module

const Login = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)
  const [formData, handleChange] = useForm({});
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      // Check if email is verified
      if (user.emailVerified) {
        showSuccessToast("Login successful! Welcome.");
        login(user);
        navigate('/')
      } else {
        showInfoToast("Please verify your email before logging in.");
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  return (
    <div className={styles.container}>
    <Navbar/>
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
