import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "../styles/AuthModal.module.css";
import { registerWithEmail, loginWithGoogle } from "../services/AuthService";

const RegisterModal = ({ isOpen, onClose, switchToLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerWithEmail(email, password, fullName);
      onClose();
      switchToLogin();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
