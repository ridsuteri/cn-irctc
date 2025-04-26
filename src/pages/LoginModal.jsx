import React, { useState } from "react";
import styles from "../styles/AuthModal.module.css";
import { FcGoogle } from "react-icons/fc";
import { loginWithEmail, loginWithGoogle } from "../services/AuthService";
import { useLocation, useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose, switchToRegister, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get return path from location state or default to '/'
  const returnPath = location.state?.returnPath || "/";

  if (!isOpen) return null;

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginWithEmail(email, password);
      if (onLogin) onLogin();
      setEmail("");
      setPassword("");
      onClose();

      // Navigate to the return path after successful login
      navigate(returnPath);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      if (onLogin) onLogin();
      onClose();

      // Navigate to the return path after successful login
      navigate(returnPath);
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
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleEmailLogin}>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle /> Login with Google
        </button>

        <p onClick={switchToRegister}>Don't have an account? Register</p>
      </div>
    </div>
  );
};

export default LoginModal;
