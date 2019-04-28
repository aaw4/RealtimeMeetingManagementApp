import React, { Component } from "react";
import firebase from "./Firebase";
import { FaTrashAlt, FaLink, FaListOl } from 'react-icons/fa';
import { navigate } from '@reach/router';

class MeetingList extends Component {

  constructor(props) {
    super(props);
    this.deleteMeeting = this.deleteMeeting.bind(this);

  }

  deleteMeeting = (e, whichMeeting) => {
    e.preventDefault();
    const ref = firebase.database().ref(`meetings/${this.props.userID}/${whichMeeting}`);
    ref.remove();
  }

  render() {
    const { meetings } = this.props;
    const myMeetings = meetings.map(item => {
      return (
        <div className="list-group-item d-flex" key={item.meetingID}>
          <section
            className="btn-group align-self-center"
            role="group"
            aria-label="Meeting Options"
          >
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={e => this.deleteMeeting(e, item.meetingID)}
              data-toggle="tooltip"
              title="Click to delete this meeting"
            >
              <FaTrashAlt />
            </button>
            <button
              className="btn btn-sm btn-outline-info"
              onClick={() => navigate(`/checkin/${this.props.userID}/${item.meetingID}`)}
              data-toggle="tooltip"
              title="Click here to check in to the meeting"
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate(`/attendees/${this.props.userID}/${item.meetingID}`)}
              data-toggle="tooltip"
              title="Click here to see the list of attendees"
            >
              <FaListOl />
            </button>
          </section>
          <section className="pl-3 text-left align-self-center">
            {item.meetingName}
          </section>
        </div>
      );
    });

    return <div>{myMeetings}</div>;
  }
}

export default MeetingList;
