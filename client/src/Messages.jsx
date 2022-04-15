import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

const Messages = ({id}) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('/messages').then((response) => {
      setMessages(response.data);
    }).catch((err) => console.log(err));
  }

  const sendMessage = (e) => {
    e.preventDefault();
    axios.post(`/messages/${id}`, {message: text}).then(() => {fetchData()}).catch(err => console.log(err));
    setText('');

  };


  return (
    <div>

      {messages.map((item, idx) => {

        return (
          <div key={idx}>
            <p>{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p>{item.user_id === id ? 'You' : item.name}</p>
            <p>{item.message}</p>
          </div>
        )
      })}

      <div>
        <input type="text" placeholder="Enter message..." onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }} />
        <button onClick={sendMessage}>sent</button>
      </div>
    </div>
  )

};

export default Messages;