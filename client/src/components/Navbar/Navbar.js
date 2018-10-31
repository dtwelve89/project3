import React from "react";
import "./Navbar.css";

const Navbar = props => (
  <nav className="navbar navbar-expand-lg">
    <div className="container">
      <a href="/">Home</a>
      <a href="/global">Messes</a>
      <a href="/login">SignIn</a>
    </div>
  </nav>
);

export default Navbar;