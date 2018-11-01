import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    // <footer className="page-footer font-small bg-light pt-4 lessmess-footer">
    <footer className="lessmess-footer">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h6><span>{'\u00A9'}</span> Less Mess</h6>
            <a href="https://github.com/dtwelve89/project3" target="_blank" rel="noopener noreferrer" id="repo">Project Repository</a>
          </div>
          <hr className="clearfix w-100 d-md-none pb-3"></hr>
          <div className="col-md-1.5 mt-md-0 mt-3" id="contributors">
            <h6 className="text-uppercase">Contributors:</h6>
          </div>
          <div className="col-md-2 mt-md-0 mt-3">
            <ul className="list-unstyled">
              <li> Ramon:
                <a href="https://github.com/MonMaramba" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#!">LinkedIn</a>
              </li>
              <li> Sabine:
                <a href="https://github.com/SHollatz" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li> Danny:
                <a href="https://github.com/dtwelve89" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/dannydanhnguyen/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mt-md-0 mt-3">
            <ul className="list-unstyled">
              <li> Philip:
                <a href="https://github.com/uhPotato" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#!">LinkedIn</a>
              </li>
              <li> Nick:
                <a href="https://github.com/nicholasjoz" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#!">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;