import React from "react";
import "./Navbar.css";

const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul>
      <li>
        <a className="navbar-brand" href="/">Home</a>
      </li>
      <li>
        <a href="/authentication">Authentication</a>
      </li>
      <li>
        <a href="/clean">Clean</a>
      </li>
      <li>
        <a href="/global">Global</a>
      </li>
      <li>
        <a href="/report">Report</a>
      </li>
    </ul>
  </nav>
);

export default Navbar;