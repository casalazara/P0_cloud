import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import eventicon from "../../assets/eventicon.png";
import SignUp from "./SignUp";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        if (res.status !== 200) {
          setMessage("Invalid password or email");
          return {}
        } 
        else {
          setMessage("Welcome!");
          return res.json();
        }
      })
      .then((res) => {
        sessionStorage.setItem('accessToken', res.access_token);
        window.location.reload(false);
      }
      );
    event.preventDefault();
  }
  return (
    <>
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src={eventicon} alt="" width="72" height="90" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email.value}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password.value}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <p>{message}</p>
          <button className="btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <button
            type="button"
            className="btn btn-lg btn-info"
            data-bs-toggle="modal"
            data-bs-target="#signUpModal"
          >
            Sign up
          </button>
        </form>
      </div>
      <SignUp />
    </>
  );
}
