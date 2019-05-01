import React from "react";

const ChatHeading = ({ onlineUsers }) => {
  return (
    <div className="chat-header">
      <div className="user-info">
        <div className="user-name">
          {onlineUsers.map(user => {
            return <span>{user.name}</span>;
          })}
        </div>
        <div className="status">
          <div className="indicator" />
          <span>{onlineUsers ? onlineUsers.length : null}</span>
        </div>
      </div>
      <div className="options" />
    </div>
  );
};

export default ChatHeading;
