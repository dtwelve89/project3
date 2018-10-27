import React, { Component } from 'react';
import API from "../../utils/API";
import './Register.css';

class Register extends Component {
  state = {
    userName: "",
    password: "",
    message: ""
  };

  handleInputChange = event => {
    event.preventDefault();
    // console.log(event)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // compareEmail = (email) => {
  //     API.getEmail(email);
  //     if (email) {
  //       console.log("User Name already exists");
  //     }
  // }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Registered!");

    //compareEmail(this.state.userName);
    //  API.getEmail(this.state.userName);
    //   if (this.state.userName ===  ) {
    //     console.log("User Name already exists");
    //   }

    if (this.state.userName && this.state.password) {
      API.saveUser({
        userName: this.state.userName,
        password: this.state.password
      })
        .then(res => console.log(res))
        // .then(res => window.location.replace("/login"))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Register</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input className="form-control"
            type="email"
            placeholder="Email address"
            name="userName"
            value={this.state.userName}
            onChange={this.handleInputChange}/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}/>
          <button className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={!(this.state.userName && this.state.password)}
            onClick={this.handleFormSubmit}>
              Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
