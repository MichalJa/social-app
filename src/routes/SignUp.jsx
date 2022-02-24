
import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";

export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);
    const [headers, setHeaders] = useState({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
    const [createdUser, setCreatedUser] = useState({});

    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {

        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirm = (e) => {

        setPasswordConfirm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setError(true);
        } else {
            setUser({
                "username": name,
                "email": email,
                "password": password,
            });
            setSubmitted(true);
            setError(false);
            axios.post(
                'https://akademia108.pl/api/social-app/user/signup',
                JSON.stringify(user),
                { 'headers': headers })
                .then((req) => {
                    console.log("RESPONSE RECEIVED: ", req);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })

        }
    };

    function validateForm() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let verif = /^(?=.*\d)(?=.*[!#@$%])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        return name.length > 0 && password.length > 5 && re.test(email) && password === passwordConfirm && verif.test(password);
    }

    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>Użytkownik {name} zarejestrowany pomyślnie</h1>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>
            <form>
                <label className="label">Nazwa użytkownika</label>
                <input onChange={handleName} className="input"
                    value={name} type="text" placeholder="User"></input>

                <label className="label">adres email</label>
                <input onChange={handleEmail} className="input"
                    value={email} type="email" placeholder="sample@email.com"></input>

                <label className="label">hasło <span className="passSpan"><br></br>[! # @ $ %] <br></br>min. 6 znaków w tym min. 1 cyfra</span></label>
                <input onChange={handlePassword} className="input"
                    value={password} type="password"></input>

                <label className="label">potwierdź hasło</label>
                <input onChange={handlePasswordConfirm} className="input"
                    value={passwordConfirm} type="password"></input>

                <button onClick={handleSubmit} className="btnRegister" type="submit" disabled={!validateForm()}>
                    Submit
                </button>
            </form>
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
        </div>
    );
}