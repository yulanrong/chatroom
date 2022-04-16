import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import Signup from "./Signup.jsx";

const Login = ({ handleLogin, status }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);

  const closeSignup = (e) => {
    e.preventDefault();
    setSignup(false);
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e, name, password)}>
        <label>
          <p>user name</p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <BiUser size={"20px"}  />
        </label>

        <label>
          <p>password</p>
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <RiLockPasswordLine size={"20px"} />
        </label>
        <div>
          <button type="submit">Sign in</button>
        </div>
        <p className="warning">{status}</p>
      </form>
      <p>Don't have an account? <button className="signupButton" onClick={
        (e) => {
        e.preventDefault();
        setSignup(true);
         }}> Sign up here</button> </p>
         {signup ? <Signup closeSignup={closeSignup} /> : null}
    </div>
  );
};

export default Login;
