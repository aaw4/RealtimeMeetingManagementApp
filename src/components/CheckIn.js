import React, { Component } from "react";
import firebase from "./Firebase";
import { navigate } from "@reach/router";

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      Email: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    e.preventDefault();

    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);
    ref.push({
      attendeeName: this.state.displayName,
      attendeeEmail: this.state.Email,
      star: false
    });
    navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`);
  }

  render() {
    return (
      <div id="fullscreen_bg" className="fullscreen_bg">
        <form className="container register-form" onSubmit={this.handleSubmit}>
          <div className="form">
            <div className="heading text-center font-weight-bold text-dark mb-3 pt-3">
              <h1>Please Check In Here!</h1>
            </div>
            <div className="form-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="displayName"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Username"
                      name="displayName"
                      id="displayName"
                      required
                      value={this.state.displayName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
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
              </div>
              <div className="form-group text-right mb-0">
                <button type="submit" className="btnSubmit">
                  Check in now!
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckIn;
