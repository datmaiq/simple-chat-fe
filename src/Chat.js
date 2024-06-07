import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';

const Chat = ({ chat, userId, socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch chat messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/messages/${chat._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [chat._id]);

  useEffect(() => {
    socket.on('getMessage', (message) => {
      console.log(message)
      setMessages((prev) => [...prev, message.message]);
    });

    return () => {
      socket.off('getMessage');
    };
  }, [socket]);

  const handleSendMessage = async (message) => {
    try {
      const newMessage = {
        chatId: chat._id,
        sender: userId,
        message: message,
      };
      const res = await axios.post('http://localhost:8000/messages', newMessage);
      setMessages((prev) => [...prev, res.data]);

      socket.emit('sendMessage', {
        senderId: userId,
        receiverId: chat.users.find(user => user !== userId),
        message: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat">
      <MessageList messages={messages} userId={userId} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;