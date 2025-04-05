import React, { useState, useEffect } from "react";

import styles from "../styles/Navbar.module.css";
import { FaBell, FaQuestionCircle, FaHome } from "react-icons/fa";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedInLocal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <FaHome className={styles.homeIcon} title="Home" />
          <div className={styles.logo}>IRCTC</div>
        </div>
        <div className={styles.navLinks}>
          <span className={styles.navLink}>BOOKINGS</span>
          <span className={styles.navLink}>CONTACT US</span>
          <span>
            {currentTime.toLocaleDateString()} [
            {currentTime.toLocaleTimeString()}]
          </span>
          <FaBell className={styles.icon} title="Notifications" />
          <FaQuestionCircle className={styles.icon} title="Help & Support" />
          {isLoggedIn ? (
            <>
              <span>Welcome, User</span>
              <button className={styles.authButton}>LOGOUT</button>
            </>
          ) : (
            <>
              <button className={styles.authButton}>LOGIN</button>
              <button className={styles.registerButton}>REGISTER</button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
