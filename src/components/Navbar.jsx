import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { FaBell, FaQuestionCircle, FaHome } from "react-icons/fa";
import LoginModal from "../pages/LoginModal";
import RegisterModal from "../pages/RegisterModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingClick = () => {
    if (isLoggedIn) {
      navigate("/booking"); // Redirect to booking page if logged in
    } else {
      setIsLoginOpen(true); // Open login modal if not logged in
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo & Home Icon */}
        <div className={styles.logoContainer}>
          <FaHome
            className={styles.homeIcon}
            onClick={() => navigate("/")}
            title="Home"
          />
          <div className={styles.logo}>IRCTC</div>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <span className={styles.navLink} onClick={handleBookingClick}>
            BOOKINGS
          </span>
          <span className={styles.navLink} onClick={() => navigate("/contact")}>
            CONTACT US
          </span>
          <span>
            {currentTime.toLocaleDateString()} [
            {currentTime.toLocaleTimeString()}]
          </span>
          <FaBell className={styles.icon} title="Notifications" />
          <FaQuestionCircle className={styles.icon} title="Help & Support" />

          {/* Authentication Buttons */}
          {isLoggedIn ? (
            <button
              className={styles.authButton}
              onClick={() => setIsLoggedIn(false)}
            >
              LOGOUT
            </button>
          ) : (
            <>
              <button
                className={styles.authButton}
                onClick={() => setIsLoginOpen(true)}
              >
                LOGIN
              </button>
              <button
                className={styles.registerButton}
                onClick={() => setIsRegisterOpen(true)}
              >
                REGISTER
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Login & Register Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={() => setIsLoggedIn(true)} // Set login state when user logs in
        switchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        switchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;
