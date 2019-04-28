import React, { Component } from "react";
import "../css/Home.css";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="container-fluid" id="home">
        <div className="row">
          <div className="col-md-12">
            <div className="carousel slide" id="carousel-610302">
              <div class="carousel-inner" role="listbox">
                <ol className="carousel-indicators">
                  <li data-slide-to="0" data-target="#carousel-610302" />
                  <li data-slide-to="1" data-target="#carousel-610302" />
                  <li
                    data-slide-to="2"
                    data-target="#carousel-610302"
                    className="active"
                  />
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      alt="Carousel Bootstrap First"
                      src="http://www.iiimltd.in/wp-content/uploads/2014/04/3988770_orig.jpg"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      alt="Carousel Bootstrap Second"
                      src="https://cityofirondaleal.gov/wp-content/uploads/kick-off-meeting.jpg"
                    />
                  </div>
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      alt="Carousel Bootstrap Third"
                      src="https://upwardsleader.files.wordpress.com/2016/01/public_meetings.jpg"
                    />
                  </div>
                </div>{" "}
                <a
                  className="carousel-control-prev"
                  href="#carousel-610302"
                  data-slide="prev"
                >
                  <span className="carousel-control-prev-icon" />{" "}
                  <span className="sr-only">Previous</span>
                </a>{" "}
                <a
                  className="carousel-control-next"
                  href="#carousel-610302"
                  data-slide="next"
                >
                  <span className="carousel-control-next-icon" />{" "}
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div className="jumbotron card card-block font-weight-light">
              <h3 className="greeting">Hello, Meeting Master!</h3>
              <p>As a meeting host, you can sign up, log in, then freely:</p>
              <ul>
                <li>Add meetings</li>
                <li>Check in, delete and inspect the meeting participants</li>
                <li>Star participants, pick random participants to send reward, and email anyone you want</li>
              </ul>
              <p>As a participant, you can sign up, log in, then freely:</p>
              <ul>
                <li>Attend an existing meeting</li>
                <li>Check in and see your pal participants list</li>
                <li>Receive reward and email real time by the host</li>
              </ul>
              {user && (
                <Link to="/meeting" className="btn btn-primary btn-lg">
                  Have a Meeting!
                </Link>
              )}

              {!user && (
                <span>
                  <Link to="/login" className="btn btn-success btn-md">
                    Log in
                  </Link>{" "}
                  <Link to="/signup" className="btn btn-success btn-md">
                    Sign Up
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
