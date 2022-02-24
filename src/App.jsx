import { Link, Outlet, Navigate } from "react-router-dom";
import './App.css';
import bottle from './bottle.png';
import React, { useState } from "react";
import 'reactjs-popup/dist/index.css';
import Login from "./routes/Login";
import Home from "./routes/Home";
import Users from "./routes/Users";
import SignUp from "./routes/SignUp";
import Logout from "./routes/Logout";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export default function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.token)


  console.log(localStorage);
  if (!currentUser) {
    return (
      <div>
        <h1>React Bottle <img src={bottle} alt="bottle"></img></h1>
        <BrowserRouter>
          <nav>
            <Link className="linkClass" to="/Home">Home</Link>
            <Link className="linkClass" to="/Login">Login</Link>
            <Link className="linkClass" to="/SignUp">Sign Up</Link>
          </nav>

          <Routes>
            <Route path="/" render={() => <Navigate to="/Home" />} />
            <Route path="Login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="Home" element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
              <Route
                index
                element={
                  <main className="homeMain">
                    <p>tu będą posty</p>
                  </main>
                }
              />
              <Route path=":invoiceId" element={<Users />} />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>pusto</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div>
        <h1>React Bottle <img src={bottle} alt="bottle"></img></h1>
        <BrowserRouter>
          <nav>
            <Link className="linkClass" to="/Home">Home</Link>
            <Link className="linkClass" to="/Logout">Logout</Link>
          </nav>

          <Routes>
            <Route path="/" render={() => <Navigate to="/Home" />}  />
            <Route path="Login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="Home" element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
              <Route
                index
                element={
                  <main className="homeMain">
                    <p>tu będą posty</p>
                  </main>
                }
              />
              <Route path=":invoiceId" element={<Users />} />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>pusto</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}