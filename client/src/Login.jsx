import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import Signup from "./Signup.jsx";

const Login = ({ handleLogin, status }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleLogin(e, name, password)}>
        <label>
          <p>username</p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <BiUser />
        </label>

        <label>
          <p>password</p>
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <RiLockPasswordLine />
        </label>
        <div>
          <button type="submit">sign in</button>
        </div>
        <p className="warning">{status}</p>
      </form>
      <p>Don't have an account? <button onClick={
        (e) => {
        e.preventDefault();
        setSignup(true);
         }}> Sign up here</button> </p>
         {signup ? <Signup /> : null}
    </div>
  );
};

export default Login;
