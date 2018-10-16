import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);

    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);

    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);

    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);

  }

  componentDidMount() {
    const token = getFromStorage('the_main_app');
    if (token) {
      // verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    signInEmail: event.target.value
  }

  onTextboxChangeSignInPassword(event) {
    signInPassword: event.target.value
  }

  onTextboxChangeSignUpFirstName(event) {
    signUpFirstName: event.target.value
  }

  onTextboxChangeSignUpLastName(event) {
    signUpLastName: event.target.value
  }

  onTextboxChangeSignUpEmail(event) {
    signUpEmail: event.target.value
  }

  onTextboxChangeSignUpPassword(event) {
    signUpPassword: event.target.value
  }


  onSignUp() {

  }

  onSignIn() {
    //grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    //post request to back end
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            // signUpEmail: '',
            // signUpPassword: '',
            // signUpFirstName: '',
            // signUpLastName: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  /*This is content code section for notes on over all page functionality

  React start up application still needs to be introduced to project MVC
*/

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <div>
            <form>
              {
                (signInError) ? (
                  <p>{signInError}</p>
                ) : (null)
              }
              <p>Sign In</p>

              <input
                type="email"
                placeholder="Email Address"
                value={this.signInEmail}
                onChange={this.onTextboxChangeSignInEmail}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={this.signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
              />
              <br />
              <button onClick={this.onSignIn}>Sign In</button>
            </form>
          </div>
          <br />
          <br />
          <div>
            <form>
              {
                (signUpError) ? (
                  <p>{signUpError}</p>
                ) : (null)
              }
              <p>Sign Up</p>
              <input
                type="text"
                placeholder="First Name"
                value={this.signUpFirstName}
                onChange={this.onTextboxChangeSignUpFirstName}
              />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                value={this.signUpLastName}
                onChange={this.onTextboxChangeSignUpLastName}
              />
              <br />
              <input
                type="email"
                placeholder="Email Address"
                value={this.signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={this.signUpPassword}
                onChange={this.onTextboxChangeSignUpPassword}
              />
              <br />
              <button onClick={this.onSignUp}>Sign Up</button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
      </div>
    );
  }
}

export default Home;
