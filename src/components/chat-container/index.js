import React from "react";
import ChatHeading from "../chat-heading";
import { Row, Col } from "react-flexbox-grid";
import Messages from "../messages";
import MessageInput from "../message-input";
import styled from "styled-components";
import {
  USER_SEND_MESSAGE,
  TYPING,
  LIST_OF_USERS,
  SERVER_SEND_MESSAGE
} from "../../constants";

const MessagesInputWrapper = styled.div`
  background-color: #0e222f;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow: auto;
  height: 90%;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  @media only screen and (min-width: 576px) {
    height: 87%;
  }
`;

export default class ChatContainer extends React.Component {
  state = {
    messages: [],
    onlineUsers: []
  };

  componentDidMount() {
    const { socket } = this.props;
    socket.on(SERVER_SEND_MESSAGE, message => {
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

  sendMessage = message => {
    const { socket, roomId } = this.props;
    socket.emit(USER_SEND_MESSAGE, roomId, message, this.addMessageToState);
  };

  addMessageToState = message => {
    this.setState(prevState => {
      return {
        messages: prevState.messages.concat(message)
      };
    });
  };

  sendTyping = (roomId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { roomId, isTyping });
  };

  render() {
    const { user, logout } = this.props;
    const { messages, onlineUsers } = this.state;
    return (
      <Row center="xs" style={{ height: "100%" }}>
        <Col xs={12} sm={12} md={9} lg={9}>
          <ChatHeading onlineUsers={onlineUsers} logout={logout} />
          <MessagesInputWrapper>
            <Messages messages={messages} user={user} />
            <MessageInput
              sendMessage={message => {
                this.sendMessage(message);
              }}
            />
          </MessagesInputWrapper>
        </Col>
      </Row>
    );
  }
}
