import React, { useEffect, useState } from 'react';
import Login from './Login.jsx';
import Messages from './Messages.jsx';
import axios from 'axios';

const App = () => {
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLogin = (e, name, password) => {
    e.preventDefault();
    axios.post('/login', {name: name, password: password}).then((response) => {
      setStatus(response.data.msg);
      setUserId(response.data.id);
    })
  };

  if (status !== 'Login Successful!') {
    return (
      <div>
        <h1>Chat App</h1>
        <Login handleLogin={handleLogin} status={status} />
      </div>
    )
  } else {
    return (
      <div>
        <h1>Messages</h1>
        <Messages id={userId} />
      </div>
    )
  }



};

export default App;