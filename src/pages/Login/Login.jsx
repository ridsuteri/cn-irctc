import React, { useState } from "react";
import app from "../../config/firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useForm from "../../hooks/useForm";
import styles from "./Login.module.css"; // Import CSS Module

const Login = () => {
  const [formData, handleChange] = useForm({});
  const [message, setMessage] = useState("");
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
        setMessage("Login successful! Welcome.");
      } else {
        setMessage("Please verify your email before logging in.");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        {message && <p className={styles.success}>{message}</p>}
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
  );
};

export default Login;
