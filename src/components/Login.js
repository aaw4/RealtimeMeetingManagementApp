import React, { Component } from "react";
import firebase from "./Firebase";
import FormError from "./FormError";
import { navigate } from "@reach/router";
import '../css/Login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      ThrowError: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    var submitInfo = {
      Email: this.state.Email,
      Password: this.state.Password
    };
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(submitInfo.Email, submitInfo.Password)
      .then(() => {
        navigate("/meeting");
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ ThrowError: error.message });
        } else {
          this.setState({ ThrowError: null });
        }
      });
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  render() {
    return (
      <div id="fullscreen_bg" className="fullscreen_bg">
        <form className="container register-form" onSubmit={this.handleSubmit}>
          <div className="form">
            <div className="heading text-center font-weight-bold text-dark mb-3 pt-3">
              <h1>Log in</h1>
            </div>
            <div className="form-content">
              <div className="row">
                {this.state.ThrowError !== null ? (
                  <FormError E={this.state.ThrowError} />
                ) : null}
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="Email"
                      id="Email"
                      required
                      value={this.state.Email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Your Password"
                      name="Password"
                      required
                      value={this.state.Password}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group text-right mb-0">
                <button type="submit" className="btnSubmit">
                  Log in now!
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
