import React, { useState } from "react";
import app from "../../config/firebase.js";
import useForm from "../../hooks/useForm";
import Navbar from "../../components/Navbar/Navbar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import styles from "./Register.module.css";
const Register = () => {
  const [formData, handleChange] = useForm({});
  const [message, setMessage] = useState("");
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        return sendEmailVerification(user);
      })
      .then((result) => {
        setMessage("User registerd successfully & please verify email ");
      })
      .catch((error) => {
        setMessage(`Error registering user ${error.message}`);
      });
  };
  return (
    <div className={styles.container}>
    <Navbar/>
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2>Register</h2>
        <p>{message && message}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
