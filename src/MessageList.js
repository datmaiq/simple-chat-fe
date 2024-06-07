import React from 'react';

const MessageList = ({ messages, userId }) => {
  return (
    <div className="message-list">
      {messages.map(message => (
        <div key={message._id} className={message.sender === userId ? 'message own' : 'message'}>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;