import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [headers, setHeaders] = useState({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  function validateForm() {

    return userName.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    let user = {
      username: userName,
      password: password,
      ttl: 3600
    }

    const myStorage = localStorage;

    axios.post(
      'https://akademia108.pl/api/social-app/user/login',
      JSON.stringify(user),
      { 'headers': headers })
      .then((res) => {
        props.setCurrentUser(res.data.jwt_token)
        localStorage.setItem('name', res.data.username);
        localStorage.setItem('token', res.data.jwt_token);
        localStorage.setItem('status', res.statusText)
        console.log("RESPONSE RECEIVED: ", res);
        console.log("RESPONSE: ", myStorage);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    if (props.setVisibility) {
      props.setVisibility(false);
    }
  }

  return (
    <div className="login">
      {props.currentUser && <Navigate to="/Home" />}
      <Form className="formClass" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="userName">
          <Form.Label className='formLabel'>Nazwa użytkownika</Form.Label>
          <Form.Control
            className="formControl"
            autoFocus
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className='formLabel'>Hasło</Form.Label>
          <Form.Control
            className="formControl"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="buttonClass" blocksize="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
