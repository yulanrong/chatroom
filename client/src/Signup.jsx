import React, { useState } from "react";
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registered, setRegistered] = useState('');


  const handleSignup = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setRegistered('passwords are not matching. Please confirm your password.');
    } else if (password.length === 0) {
      setRegistered('password cannot be empty.');
    } else {


          axios.post('/register', {name: name, password: password}).then((response) => {
            setRegistered(response.data.msg);
          }).catch(err => console.log(err))


    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        <label>
          <p> Please set your username</p>
          <input
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
            }}
          />
        </label>

        <label>
          <p> Please set your password</p>
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

        </label>
        <label>
          <p> Please confirm your password</p>
          <input
            type="text"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

        </label>
        <div>
          <button type="submit">Sign up</button>
        </div>

      </form>
      {registered === 'Registered!' ? <p>Thank you! You've been registered. <button> Go back to Login</button></p> : <p className="warning">{registered}</p>}

    </div>
  );
};

export default Signup;