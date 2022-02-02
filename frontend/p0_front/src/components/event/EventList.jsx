import React, { useEffect, useState } from "react";
import useHttpClient from "../../hooks/httpClient";
import EventForm from "./EventForm";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const client = useHttpClient();
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    client
      .get("/api/events")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
          if (res)
            setEvents(res);
      });
  }, []);

  function deleteEvent(id) {
    client.delete(`/api/events/${id}`).then(() => {
      window.location.reload(false);
    });
  }

  function logout()
  {
    sessionStorage.clear();
    window.location.reload(false);
  }

  return (
    <div className="container-fluid">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Is Virtual</th>
            <th scope="col">Place</th>
            <th scope="col">Address</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.category}</td>
                <td>{event.is_virtual ? "Yes" : "No"}</td>
                <td>{event.place}</td>
                <td>{event.address}</td>
                <td>{new Date(event.start_date).toLocaleDateString()}</td>
                <td>{new Date(event.end_date).toLocaleDateString()}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editOrCreateModal"
                    onClick={()=>setCurrentEvent(event)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
      <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#editOrCreateModal"
                    onClick={()=>setCurrentEvent(null)}
                  >
                    Create Event
                  </button>
    <EventForm event={currentEvent}/>
    <button type="button" className="btn btn-danger" onClick={()=>logout()}>Log Out</button>

    </div>
  );
}
