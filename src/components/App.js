import React, { Component } from "react";
import "../css/App.css";
import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import HaveAMeeting from "./HaveAMeeting";
import SignUp from "./SignUp";
import CheckIn from "./CheckIn";
import Attendees from "./Attendees";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });

        const meetingsRef = firebase.database().ref("meetings/" + FBUser.uid);

        meetingsRef.on("value", snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingsList,
            meetingAmount: meetingsList.length
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  addMeeting = meetings => {
    const ref = firebase.database().ref(`meetings/${this.state.userID}`);
    ref.push({ meetingName: meetings });
  };

  userSignUp = nick => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: nick
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate("/meeting");
      });
    });
  };

  userLogout = e => {
    this.setState({
      user: null,
      displayName: null,
      userID: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} userLogout={this.userLogout} />
        {this.state.user && (
          <Welcome
            username={this.state.displayName}
            userLogout={this.userLogout}
          />
        )}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <HaveAMeeting
            path="/meeting"
            addMeeting={this.addMeeting}
            meetings={this.state.meetings}
            userID={this.state.userID}
          />
          <CheckIn 
            path="/checkin/:userID/:meetingID"
          />
          <Attendees
            path="/attendees/:userID/:meetingID"
            adminUser={this.state.userID}
          />
          <SignUp path="/signup" userSignUp={this.userSignUp} />
        </Router>
      </div>
    );
  }
}

export default App;
