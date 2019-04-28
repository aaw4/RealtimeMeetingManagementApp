import React, { Component } from "react";
import { FaTrashAlt, FaStar, FaMailBulk } from "react-icons/fa";
import firebase from "./Firebase";

class AttendeesList extends Component {
  constructor(props) {
    super(props);

    this.deleteAttendee = this.deleteAttendee.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
  }

  deleteAttendee = (e, meeting, attendee) => {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase.database().ref(
        `meetings/${adminUser}/${meeting}/attendees/${attendee}`
    );
    ref.remove();
  }

  toggleStar = (e, star, meeting, attendee) => {
      e.preventDefault();
      const adminUser = this.props.adminUser;
      const ref = firebase.database().ref(
        `meetings/${adminUser}/${meeting}/attendees/${attendee}/star`
      );
      if (star === undefined) {
          ref.set(true);
      } else {
          ref.set(!star);
      }
  }

  render() {
    const admin = this.props.adminUser === this.props.userID ? true : false;
    const attendees = this.props.attendees;
    const myAttendees = attendees.map(item => {
      return (
        <div
          className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
          key={item.attendeeID}
        >
          <div className="card ">
            <div
              className={
                "card-body px-3 py-2 d-flex align-items-center " +
                (admin ? "" : "justify-content-center")
              }
            >
              {admin && (
                <div className="btn-group pr-2">
                    <button
                    className={
                      'btn btn-sm ' +
                      (item.star
                        ? 'btn-primary'
                        : 'btn-outline-secondary')
                    }
                    title="Click to give this Attendee a star"
                    onClick={e =>
                      this.toggleStar(
                        e,
                        item.star,
                        this.props.meetingID,
                        item.attendeeID
                      )
                    }
                  >
                    <FaStar />
                  </button>
                  <a
                    href={`mailto:${item.attendeeEmail}`}
                    className="btn btn-sm btn-outline-info"
                    title={"Click to email this attendee   " + item.attendeeEmail}
                  >
                    <FaMailBulk />
                  </a>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Click here to delete this Attendee"
                    onClick={e =>
                      this.deleteAttendee(
                        e,
                        this.props.meetingID,
                        item.attendeeID
                      )
                    }
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              )}
              <div>{item.attendeeName}</div>
            </div>
          </div>
        </div>
      );
    });

    return <div className="row justify-content-center">{myAttendees}</div>;
  }
}

export default AttendeesList;
