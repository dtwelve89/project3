import React from "react";
import "./Navbar.css";

const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">

    <a className="navbar-brand" href="/">Home</a>

    <a href="/login">SignIn</a>

    <a href="/global">Messes</a>

  </nav>
);

export default Navbar;