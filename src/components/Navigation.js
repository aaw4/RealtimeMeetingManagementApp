import React, { Component } from "react";
import "../css/Navigation.css";
import { FaMeetup } from 'react-icons/fa';
import { Link } from '@reach/router'

class Navigation extends Component {
  render() {
    const { user, userLogout } = this.props;

    return (
      <div id="fullscreen_bg" className="fullscreen_bg">
      <nav className="site-nav family-sans navbar navbar-expand navbar-dark higher">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-dark font-weight-bold">
          <FaMeetup className="faMeetUp mr-2 text-dark" />Realtime Meeting Management Tool
          </Link>
          <div className="navbar-nav ml-auto">
            {user && (
              <Link
                className="nav-item nav-link text-success font-weight-bold"
                to="/meeting"
              >
                Have a meeting!
              </Link>
            )}

            {!user && (
              <Link
                className="nav-item nav-link text-dark font-weight-bold"
                to="/login"
              >
                log in
              </Link>
            )}
            {!user && (
              <Link
                className="nav-item nav-link text-dark font-weight-bold"
                to="/signup"
              >
                Sign up
              </Link>
            )}
            {user && (
              <Link
                className="nav-item nav-link text-dark font-weight-bold"
                to="/login"
                onClick = {e => userLogout(e)} 
              >
                log out
              </Link>
            )}
          </div>
        </div>
      </nav>
      </div>
    );
  }
}

export default Navigation;
