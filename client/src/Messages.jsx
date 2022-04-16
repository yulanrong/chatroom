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
    if (text.length > 0) {

      axios.post(`/messages/${id}`, {message: text}).then(() => {
        fetchData();

      }).catch(err => console.log(err));
    }

    setText('');

  };


  return (
    <div className="container">
      <div className="messagesContainer">

      {messages.map((item, idx) => {

        return (
          <div key={idx} className="message">
            <p className="date">{moment(item.created_at).calendar()}</p>

            <p className="username">{item.user_id === id ? 'You:' : `${item.name}:`}</p>
            <p className="content">{item.message}</p>


          </div>
        )
      })}
      </div>



        <textarea rows="3" cols="70" className="sendInput" type="text" placeholder="Enter message..." value={text} onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}></textarea>
        <button onClick={sendMessage} className="sendButton">Send</button>

    </div>
  )

};

export default Messages;