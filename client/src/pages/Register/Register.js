import React, { Component } from 'react';
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";
import './Register.css';
// import bcrypt from "bcrypt-nodejs";

class Register extends Component {
  state = {
    userName: "",
    password: "",
    message: "",
    validation: false
  };

  // componentDidMount() {
  //   this.compareEmail("email@gmail.com");
  // }

  handleInputChange = event => {
    event.preventDefault();
    // console.log(event)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  // compareEmail = (email) => {
  //   API.getEmail(email)
  //     .then(res => {
  //       if (res.userName === email) {
  //         this.setState({
  //           validation: false
  //         });
  //         console.log("State email/userName " + email);
  //         console.log("Response userName " + res.userName)
  //       } else {
  //         this.setState({
  //           validation: true
  //         })
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  handleFormSubmit = event => {
    event.preventDefault();
    // this.compareEmail(this.state.userName);
    if (this.state.userName && this.state.password) {
      API.getEmail(this.state.userName)
      .then(res => {
        console.log(res);
        if (!res.data) {
          this.setState({
            validation: true
          });
          console.log(res);
          console.log("Validation: " + this.state.validation);
          console.log("State email/userName " + this.state.userName);
          console.log("Response userName " + res.data)
        } else {
          this.setState({
            validation: false
          })
          console.log("Validation: " + this.state.validation);
        }
      })
      // .catch(err => console.log(err))
      .then(() => {
        if (this.state.validation === true) {
          API.saveUser({
            userName: this.state.userName,
            password: this.state.password
          })
            .then(res => {
              console.log(res)
              console.log("Registered!");
            })
            .then(res => window.location.replace("/login"))
            .catch(err => console.log(err));
        } else {
          console.log("Email already exist");
        }
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <form className="form-signin">
          <h2 className="form-signin-heading">Register</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input className="form-control"
            type="email"
            placeholder="Email address"
            name="userName"
            value={this.state.userName}
            onChange={this.handleInputChange} />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange} />
          <button className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={!(this.state.userName && this.state.password)}
            onClick={this.handleFormSubmit}>
            Submit
          </button>
        </form>
      </Wrapper>
    );
  }
}

export default Register;
