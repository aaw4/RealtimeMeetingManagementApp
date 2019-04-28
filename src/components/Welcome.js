import React, { Component } from "react";
import { Link } from "@reach/router";
import "../css/Welcome.css";

class Welcome extends Component {
  render() {
    const { username, userLogout } = this.props;

    return (
      <div className="back text-right mt-4 pr-3">
        <span className="text-secondary text-dark font-weight-bold pl-1">
          Welcome {username}
        </span>
        ,
        <Link
          to="/login"
          className="font-weight-bold text-primary pl-1"
          onClick={e => userLogout(e)}
        >
          log out
        </Link>
      </div>
    );
  }
}

export default Welcome;
