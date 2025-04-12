import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { FaBell, FaQuestionCircle, FaHome } from "react-icons/fa";
import LoginModal from "../pages/LoginModal";
import RegisterModal from "../pages/RegisterModal";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedInLocal] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setIsLoggedInLocal(true);
    if (setIsLoggedIn) setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedInLocal(false);
    if (setIsLoggedIn) setIsLoggedIn(false);
  };

  const handleBookingClick = () => {
    if (isLoggedIn) {
      navigate("/booking");
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleHomeClick = () => {
    navigate("/");
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
          <span className={styles.navLink} onClick={handleContactClick}>
            CONTACT US
          </span>
          <span>
            {currentTime.toLocaleDateString()} [
            {currentTime.toLocaleTimeString()}]
          </span>
          <FaBell className={styles.icon} title="Notifications" />
          <FaQuestionCircle className={styles.icon} title="Help & Support" />
          {isLoggedIn ? (
            <>
              <span>Welcome, User</span>
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
        onLogin={handleLogin}
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
