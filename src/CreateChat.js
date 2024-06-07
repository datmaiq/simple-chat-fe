import React, { useState } from 'react';
import axios from 'axios';

const CreateChat = ({ onChatCreated }) => {
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const handleCreateChat = async (e) => {
    e.preventDefault();

    if (!senderId || !receiverId) {
      alert('Both sender and receiver IDs are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/chat', { senderId, receiverId });
      onChatCreated(res.data);
      setSenderId('');
      setReceiverId('');
    } catch (err) {
      console.error(err);
      alert('Failed to create chat');
    }
  };

  return (
    <form onSubmit={handleCreateChat} className="create-chat">
      <h2>Create New Chat</h2>
      <input
        type="text"
        value={senderId}
        onChange={(e) => setSenderId(e.target.value)}
        placeholder="Sender ID"
      />
      <input
        type="text"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        placeholder="Receiver ID"
      />
      <button type="submit">Create Chat</button>
    </form>
  );
};

export default CreateChat;