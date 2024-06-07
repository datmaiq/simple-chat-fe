import React from 'react';

const ChatList = ({ chats, userId, onSelectChat }) => {
  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat._id} onClick={() => onSelectChat(chat)}>
            Chat with {chat.users.filter(user => user !== userId).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;