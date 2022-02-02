import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"email":email,"password":password}),
    }).then(res=>{
      if( res.status!==204){
        setMessage("An error have occurred")
      }
      else{
        setMessage("Succesfully registered")
      }
    })
    event.preventDefault();
  }

  return (
    <div
      className="modal fade"
      id="signUpModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="signUpModal">
              Sign up
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmailLogin"
                  placeholder="name@example.com"
                  value={email.value}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingEmailLogin">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPasswordLogin"
                  placeholder="Password"
                  value={password.value}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPasswordLogin">Password</label>
              </div>
              <p>{message}</p>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign up
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
