import React, { Component } from "react";
import "../css/SignUp.css";
import FormError from "./FormError";
import firebase from "./Firebase";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      Email: '',
      Password: '',
      Password2: '',
      ThrowError: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    var submitInfo = {
        displayName: this.state.displayName,
        Email: this.state.Email,
        Password: this.state.Password
    }
    e.preventDefault();

    firebase
        .auth()
        .createUserWithEmailAndPassword(
            submitInfo.Email,
            submitInfo.Password
        )
        .then (() => {
            this.props.userSignUp(submitInfo.displayName);
        })
        .catch(error => {
            if (error.message !== null) {
                this.setState({ ThrowError: error.message})
            } else {
                this.setState({ ThrowError: null});
            }
        });
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (this.state.Password !== this.state.Password2) {
        this.setState({ ThrowError: "Passwords do not match" });
      } else {
        this.setState({ ThrowError: null });
      }
    });
  }

  render() {
    return (
      <div id="fullscreen_bg" className="fullscreen_bg">
        <form className="container register-form" onSubmit = {this.handleSubmit}>
          <div className="form">
              <h2 className="heading">Sign up to enjoy the tool!</h2>
            <div className="form-content">
              <div className="row">
                {this.state.ThrowError !== null ? (
                  <FormError E={this.state.ThrowError} />
                ) : null}
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="displayName"
                    >
                      displayName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="displayName"
                      required
                      value={this.state.displayName}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email Address"
                      name="Email"
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
                  <div className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Password2"
                    >
                      Password2
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="Password2"
                      required
                      value={this.state.Password2}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group text-right mb-0">
                <button type="submit" className="btnSubmit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
