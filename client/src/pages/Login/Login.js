import React, { Component } from 'react';
import axios from 'axios';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import './Login.css';
import bcrypt from "bcrypt-nodejs";


class Login extends Component {
  state = {
    userName: "",
    password: "",
    message: "",
    emailValidation: false,
    passwordValidation: false
  };

  // Made changes to this function and the corresponding components in render (name, value for userName and password). So the user information will be accepted from the front end. Then we can use or manipulate that information however way we want in the handleFormSubmit function, whether it be calling information from the database to match existing registered IDs, userNames, etc.
  handleInputChange = event => {
    event.preventDefault();
    // console.log(event)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };



  handleFormSubmit = event => {
    event.preventDefault();
    // this.compareEmail(this.state.userName);
    if (this.state.userName && this.state.password) {

        API.getEmail(this.state.userName)
          .then(res => {
            console.log(res);
            // const hash = res.data.password;
            // true or false
          if(res.data) {
            const hash = res.data.password;
           if (bcrypt.compareSync(this.state.password, hash) === true) {
            this.setState({
              emailValidation: true,
              passwordValidation: true
            });
            console.log(res);
            console.log("Validation: " + this.state.passwordValidation);
            console.log("State password " + this.state.password);
            console.log("Response userName " + res.data)
            
           } else {
              this.setState({
                passswordValidation: false
              })
              console.log(res.data.password);
              console.log("password does not match")
              console.log("Email Validation: " + this.state.emailValidation);
              console.log("Password Validation: " + this.state.passwordValidation);
            }
          } else {
            this.setState({
              emailValidation: false
            })
            console.log("User name or email does not exist");
          }
          })
          // .catch(err => console.log(err))
          .then(() => {
            if (this.state.emailValidation && this.state.passwordValidation === true) {
              console.log(this.state.emailValidation);
              console.log("Logged In!");
            } else {
              console.log("Email and password do not match!");
            }
          });

    }
  }

  // This function was left alone to be further manipulated for whatever functionality we need.
  // handleFormSubmit = event => {
  //   event.preventDefault();

  //   const { username, password } = this.state;

  //   axios.post('/api/auth/login', { username, password })
  //     .then((result) => {
  //       localStorage.setItem('jwtToken', result.data.token);
  //       this.setState({ message: '' });
  //       this.props.history.push('/')
  //     })
  //     .catch((error) => {
  //       if(error.response.status === 401) {
  //         this.setState({ message: 'Login failed. Username or password not match' });
  //       }
  //     });
  // }

  render() {
    return (
      <div className="container">
        <form className="form-signin">
          {/* {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          } */}
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input className="form-control"
            type="email"
            placeholder="Email address"
            name="userName"
            value={this.state.userName}
            onChange={this.handleInputChange} />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange} />
          <button className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={!(this.state.userName && this.state.password)}
            onClick={this.handleFormSubmit}>
            Login
          </button>
          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;