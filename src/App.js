import React, {useState, useEffect} from 'react';
import ChatList from './ChatList';
import Chat from './Chat';
import Create from './CreateChat';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8000');

function App() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [userId, setUserId] = useState(""); // Initially empty, will be set by the form
  const [inputUserId, setInputUserId] = useState(""); // Separate state for input value

  useEffect(() => {
    if (userId) {
      // Fetch user's chats
      const fetchChats = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/chat/${userId}`);
          setChats(res.data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchChats();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      socket.emit('addUser', userId);

      return () => {
        socket.disconnect();
      };
    }
  }, [userId]);

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setUserId(inputUserId); // Set the userId state from the input value
  };

  return (
    <div className="App">
      {/* <CreateChat onChatCreated={handleChatCreated} /> */}
      <form onSubmit={handleSubmit} className="create-chat">
        <h2>Who you are</h2>
        <input
          type="text"
          value={inputUserId}
          onChange={(e) => setInputUserId(e.target.value)}
          placeholder="Enter your ID"
        />
        <button type="submit">Set User ID</button>
      </form>

      {userId && (
        <>
          <ChatList chats={chats} userId={userId} onSelectChat={handleChatSelect}/>
          {currentChat && <Chat chat={currentChat} userId={userId} socket={socket}/>}
        </>
      )}
    </div>
  );
}

export default App;