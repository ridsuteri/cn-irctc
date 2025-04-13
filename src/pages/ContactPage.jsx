import React from "react";
import styles from "../styles/ContactPage.module.css";
import { useNavigate } from "react-router-dom";

function ContactPage() {
  const navigate = useNavigate()
  return (
    <div className={styles.contactContainer}>
      {/* <button onClick={()=>navigate('/test', { replace: true })}>Go to test</button> */}
      <div className={styles.contactContent}>
        <h2>Contact Us</h2>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <h3>Email Support</h3>
            <p>support@irctc.com</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Phone Support</h3>
            <p>+91-9876543210</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Office Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Address</h3>
            <p>IRCTC Office, New Delhi, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
