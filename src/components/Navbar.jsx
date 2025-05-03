import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { FaBell, FaQuestionCircle, FaHome } from "react-icons/fa";
import LoginModal from "../pages/LoginModal";
import RegisterModal from "../pages/RegisterModal";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/AuthService";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth(); // Fixed: Proper extraction from useAuth hook
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBookingClick = () => {
    if (currentUser) {
      navigate("/booking-history"); // Changed: Navigate to booking instead of train-search
    } else {
      setIsLoginOpen(true);
    }
  };

  // const handleTrainSearchClick = () => {
  //   navigate("/train-search"); // Added: Separate handler for train search
  // };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <FaHome
            className={styles.homeIcon}
            onClick={handleHomeClick}
            title="Home"
          />
          <div className={styles.logo}>IRCTC</div>
        </div>
        <div className={styles.navLinks}>
          <span className={styles.navLink} onClick={handleBookingClick}>
            BOOKINGS
          </span>
          {/* <span 
            className={styles.navLink} 
            onClick={handleTrainSearchClick}
          >
            TRAIN SEARCH
          </span> */}
          <span className={styles.navLink} onClick={handleContactClick}>
            CONTACT US
          </span>
          <span>
            {currentTime.toLocaleDateString()} [
            {currentTime.toLocaleTimeString()}]
          </span>
          <FaBell className={styles.icon} title="Notifications" />
          <FaQuestionCircle className={styles.icon} title="Help & Support" />
          {currentUser ? (
            <>
              <span>Welcome, {currentUser.displayName || "User"}</span>
              <button className={styles.authButton} onClick={handleLogout}>
                LOGOUT
              </button>
            </>
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

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        switchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onLogin={() => {}} // Will be updated in LoginModal.jsx
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
