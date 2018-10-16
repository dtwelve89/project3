import React from "react";

import "./Footer.css";



const Footer = () => (

  <footer className="page-footer font-small bg-light pt-4">

    <div className="container-fluid text-center text-md-left">

      <div className="row">

        <div className="col-md-6 mt-md-0 mt-3">

          <h6 className="text-uppercase">Footer Content</h6>

          <p>Less Mess was developed by a team of 5 people. 

            The links on the left lead you to their GitHub repositories and LinkedIn profils.</p>

          <a href="https://github.com/dtwelve89/project3">Project Repository</a>

        </div>

        <hr className="clearfix w-100 d-md-none pb-3"></hr>

          <div className="col-md-4 mt-md-0 mt-3">

            <h6 className="text-uppercase">Contributors</h6>

            <ul className="list-unstyled">

              <li> Ramon

                <a href="#!">GitHub</a>

                <a href="#!">LinkedIn</a>

              </li>

              <li> Sabine

                <a href="#!">GitHub</a>

                <a href="#!">LinkedIn</a>

              </li>

              <li> Danny

                <a href="#!">GitHub</a>

                <a href="#!">LinkedIn</a>

              </li>

              <li> Philip

                <a href="#!">GitHub</a>

                <a href="#!">LinkedIn</a>

              </li>

              <li> Nick

                <a href="#!">GitHub</a>

                <a href="#!">LinkedIn</a>

              </li>

            </ul>

          </div>

      </div>

      </div>

      <div className="footer-copyright text-center py-3">© 2018 Copyright:

      </div>

  </footer>



    );



    export default Footer;