import React, { Component } from "react";
import firebase from "./Firebase";
import AttendeesList from "./AttendeesList";
import "../css/Attendee.css";
import { FaUndoAlt, FaRandom } from "react-icons/fa";

class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAttendees: [],
      queryText: "",
      allAttendees: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.randomPick = this.randomPick.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  resetQuery() {
    this.setState({
        queryText: "",
        displayAttendees: this.state.allAttendees
    });  
  }

  randomPick() {
    const randomAttendee = Math.floor(
        Math.random() * this.state.allAttendees.length
      );
      this.resetQuery();
      this.setState({
        displayAttendees: [this.state.allAttendees[randomAttendee]]
      });
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

    ref.on("value", snapshot => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star
        });
      }
      this.setState({
        allAttendees: attendeesList,
        displayAttendees: attendeesList
      });
    });
  }

  render() {
    const dataFilter = item =>
      item.attendeeName
        .toLowerCase()
        .match(this.state.queryText.toLowerCase()) && true;
    const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

    return (
      <div id="fullscreen_bg" className="fullscreen_bg">
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="font-weight-light text-center font-weight-bold">
                Meeting Attendees
              </h1>

              <div className="card bg-transparent border-0 mb-4">
                <div className="card-body text-center">
                  <div className="input-group">
                    <input
                      type="text"
                      name="queryText"
                      value={this.state.queryText}
                      placeholder="Search..."
                      className="form-control"
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-success"
                        title="Pick a random attendee"
                        onClick={() => this.randomPick()}
                      >
                        <FaRandom />
                      </button>
                    </div>
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-danger"
                        title="Reset Search Bar"
                        onClick={() => this.resetQuery()}
                      >
                        <FaUndoAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AttendeesList
            adminUser={this.props.adminUser}
            userID={this.props.userID}
            meetingID={this.props.meetingID}
            attendees={filteredAttendees}
          />
        </div>
      </div>
    );
  }
}

export default Attendees;
