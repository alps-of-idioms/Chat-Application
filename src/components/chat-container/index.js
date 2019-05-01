import React from "react";
import ChatHeading from "../chat-heading";
import Messages from "../messages";
import MessageInput from "../message-input";
import {
  MESSAGE_SENT,
  SERVER_MESSAGE,
  LOGOUT,
  TYPING,
  LIST_OF_USERS
} from "../../constants";

export default class ChatContainer extends React.Component {
  state = {
    messages: [],
    onlineUsers: []
  };

  componentDidMount() {
    const { socket } = this.props;
    socket.on(SERVER_MESSAGE, message => {
      console.log(message);
      this.setState(prevState => {
        return {
          messages: prevState.messages.concat(message)
        };
      });
    });
    socket.on(LIST_OF_USERS, listOfUsers => {
      this.setState({
        onlineUsers: listOfUsers
      });
    });
  }

  sendMessage = (roomId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, { roomId, message });
  };

  sendTyping = (roomId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { roomId, isTyping });
  };
  render() {
    const { roomId, user } = this.props;
    const { messages, onlineUsers } = this.state;
    return (
      <div className="container">
        Комната {this.props.roomId}
        <div className="chat-room-container">
          <div className="chat-room">
            <ChatHeading onlineUsers={onlineUsers} />
            <Messages messages={messages} user={user} />
            <MessageInput
              sendMessage={message => {
                this.sendMessage(roomId, message);
              }}
              sendTyping={isTyping => this.sendTyping(roomId, isTyping)}
            />
          </div>
        </div>
      </div>
    );
  }
}
