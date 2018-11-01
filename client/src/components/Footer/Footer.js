import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    // <footer className="page-footer font-small bg-light pt-4 lessmess-footer">
    <footer className="lessmess-footer">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-12 mt-md-0 mt-3">
            <h6 className="text-center"><span>{'\u00A9'}</span> Less Mess</h6>  
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-md-0 mt-3 text-center">
            <span>Contributors:</span>
                <a href="#!">Ramon</a>
                <a href="https://www.linkedin.com/in/sabinehollatz" target="_blank" rel="noopener noreferrer">Sabine</a>
                <a href="https://www.linkedin.com/in/dannydanhnguyen/" target="_blank" rel="noopener noreferrer">Danny</a>
                <a href="#!">Philip</a>
                <a href="#!">Nick</a>
                <a href="https://github.com/dtwelve89/project3" target="_blank" rel="noopener noreferrer">Project Repository</a>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;