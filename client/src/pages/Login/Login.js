import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  state = {
    userName: "",
    password: "",
    message: ""
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

  // This function was left alone to be further manipulated for whatever functionality we need.
  handleFormSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    axios.post('/api/auth/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

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
          onChange={this.handleInputChange}/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}/>
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