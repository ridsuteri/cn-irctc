import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import styles from "../styles/AuthModal.module.css";
import {
  clearError,
} from "../redux/auth/authSlice";

const RegisterModal = ({ isOpen, onClose, switchToLogin }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    // TODO: 
  };

  const handleGoogleRegister = async () => {
    dispatch(clearError());

    // TODO: 
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleRegister}
          disabled={loading}
        >
          <FcGoogle /> Register with Google
        </button>

        <p onClick={switchToLogin}>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default RegisterModal;
