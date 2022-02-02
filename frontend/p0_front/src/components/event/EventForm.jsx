import React, { useEffect, useState } from "react";
import useHttpClient from "../../hooks/httpClient";

export default function EventForm({ event }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isVirtual, setVirtual] = useState(true);
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString());
  const [message, setMessage] = useState("");
  const client = useHttpClient();

  useEffect(() => {
    setName(event ? event.name : "");
    setCategory(event ? event.category : "");
    setVirtual(event ? event.is_virtual : true);
    setPlace(event ? event.place : "");
    setAddress(event ? event.address : "");
    setStartDate(
      event
        ? new Date(event.start_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
    setEndDate(
      event
        ? new Date(event.end_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
  },[event]);

  function handleSubmit(e) {
    var newEvent = {
      name: name,
      category: category,
      is_virtual: isVirtual,
      place: place,
      address: address,
      start_date: startDate,
      end_date: endDate,
    };

    if (event) {
      client.put(`/api/events/${event.id}`, newEvent).then((res) => {
        if (res.status !== 200) {
          setMessage("There was an error updating event");
        } else {
          setMessage("Event updated successfully!");
        }
      });
    } else {
      client.post("/api/events", newEvent).then((res) => {
        if (res.status !== 200) {
          setMessage("There was an error creating event");
        } else {
          setMessage("Event created successfully!");
        }
      });
    }
    e.preventDefault();
  }

  return (
    <div
      className="modal fade"
      id="editOrCreateModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="signUpModal">
              {event ? "Update event" : "Create Event"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => window.location.reload(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="ML for Dummies"
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="floatingName">Event Name</label>
              </div>
              <div className="form-floating">
                <select className="form-select" name="floatingCategory" onChange={e => setCategory(e.target.value)} value="conference">
                  <option
                    value="conference"
                  >
                    Conference
                  </option>
                  <option
                    value="seminar"
                  >
                    Seminar
                  </option>
                  <option
                    value="congress"
                  >
                    Congress
                  </option>
                  <option value="course" onSelect={() => setCategory("course")}>
                    Course
                  </option>
                </select>
                <label htmlFor="floatingCategory">Event Category</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPlace"
                  placeholder="ML112"
                  required={true}
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
                <label htmlFor="floatingPlace">Event Place</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingAddress"
                  placeholder="Cra. 1 #18a-12"
                  required={true}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="floatingAddress">Event Address</label>
              </div>
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="floatingStartDate"
                  min={new Date().toLocaleDateString()}
                  required={true}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="floatingStartDate">Event Start Date</label>
              </div>
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="floatingEndDate"
                  min={new Date().toLocaleDateString()}
                  required={true}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <label htmlFor="floatingEndDate">Event End Date</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="floatingVirtual"
                  value={isVirtual}
                  required={false}
                  onChange={(e) => setVirtual(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="floatingVirtual">Event virtual</label>
              </div>
              <p>{message}</p>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                {event ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
