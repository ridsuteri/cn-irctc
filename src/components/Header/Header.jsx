import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <h1>IRCTC</h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
