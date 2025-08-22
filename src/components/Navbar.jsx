import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Navbar.module.css";
import { FaBell, FaQuestionCircle, FaHome } from "react-icons/fa";
import LoginModal from "../pages/LoginModal";
import RegisterModal from "../pages/RegisterModal";
import {
  openLoginModal,
  openRegisterModal,
  closeModals
} from "../redux/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get state from Redux store
  const { isLoginOpen, isRegisterOpen, isLoggedIn, user } = useSelector(
    (state) => state.auth
  );

  const [currentTime, setCurrentTime] = useState(new Date());

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
      dispatch(openLoginModal()); // Open login modal if not logged in
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
          {isLoggedIn && user ? (
            <>
              <span>{user.displayName}</span>
              <button
                className={styles.authButton}
                onClick={
                  // TODO: call method to logout
                  ()=>{}
                }
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.authButton}
                onClick={() => dispatch(openLoginModal())}
              >
                LOGIN
              </button>
              <button
                className={styles.registerButton}
                onClick={() => dispatch(openRegisterModal())}
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
        onClose={() => dispatch(closeModals())}
        onLogin={() => {}} // Login handled by async thunk
        switchToRegister={() => dispatch(openRegisterModal())}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => dispatch(closeModals())}
        switchToLogin={() => dispatch(openLoginModal())}
      />
    </>
  );
};

export default Navbar;
