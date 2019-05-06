import React from "react";
import PropTypes from "prop-types";
import ChatHeading from "../chat-heading";
import { Row, Col } from "react-flexbox-grid";
import Messages from "../messages";
import MessageInput from "../message-input";
import { MessagesInputWrapper } from "./styles";
import {
  USER_SEND_MESSAGE,
  LIST_OF_USERS,
  SERVER_SEND_MESSAGE
} from "../../constants";

export default class ChatContainer extends React.Component {
  state = {
    messages: [],
    onlineUsers: []
  };

  static propTypes = {
    //Коллбек для выхода из комнаты
    logout: PropTypes.func,
    //Идентификатор комнаты
    roomId: PropTypes.string,
    //Объект соединения
    socket: PropTypes.object,
    // Объект содержащий данные пользователя
    user: PropTypes.objectOf(PropTypes.string)
  };

  //Подписка на события отправки сообщения от сервера и события получения массива с пользователями
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

  //Отправка текста сообщения от пользователя на сервер
  sendMessage = message => {
    const { socket, roomId } = this.props;
    socket.emit(USER_SEND_MESSAGE, roomId, message, this.addMessageToState);
  };

  //Коллбек для вызова на сервере, добавляет сформированный объект сообщения в стейт
  addMessageToState = message => {
    this.setState(prevState => {
      return {
        messages: prevState.messages.concat(message)
      };
    });
  };

  render() {
    const { user, logout } = this.props;
    const { messages, onlineUsers } = this.state;
    return (
      <Row center="xs" style={{ height: "100%" }}>
        <Col xs={12} sm={12} md={10} lg={6}>
          <ChatHeading onlineUsers={onlineUsers} logout={logout} />
          <MessagesInputWrapper>
            <Messages messages={messages} user={user} />
            <MessageInput sendMessage={message => this.sendMessage(message)} />
          </MessagesInputWrapper>
        </Col>
      </Row>
    );
  }
}
