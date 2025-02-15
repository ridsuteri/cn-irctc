import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link} from 'react-router-dom'
import "./Navbar.css";

const Navbar = () => {
  const { loggedInUser, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <h1>IRCTC</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        
        {!loggedInUser && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {loggedInUser && (
          <>
            <li>
              <Link to="/history">History</Link>
            </li>
            <li>
              <Link onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
