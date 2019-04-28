import React, { Component } from "react";
import MeetingList from "./MeetingList";
import '../css/HaveAMeeting.css';

class HaveAMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addMeeting(this.state.meetingName);

    this.setState({ meetingName: "" });
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
              <h3>As a host, add a meeting you plan to have by entering the meeting info and clicking the blue button beneath</h3>
            </div>
            <div className="form-content text-center">
              <div className="row">
                <div className="col-md-12">
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Meeting Name"
                      name="meetingName"
                      id="Email"
                      required
                      aria-describedby="buttonAdd"
                      value={this.state.meetingName}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary"
                        id="buttonAdd"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="top-buffer row-1 col col-md-12 text-center">
                      <div className="card border-top-0 rounded-0">
                        {this.props.meetings && this.props.meetings.length ? (
                          <div className="card-body py-2">
                            <h4 className="card-title font-weight-bold m-0">
                              Your Meetings
                            </h4>
                          </div>
                        ) : null}

                        {this.props.meetings && (
                          <div className="list-group list-group-flush">
                            <MeetingList 
                              meetings={this.props.meetings}
                              userID={this.props.userID} 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default HaveAMeeting;
