import React from "react";
/* import axios from 'axios' */
import ChatContainer from "../chat-container";
import {
  USER_CONNECTED_AND_CREATE_ROOM,
  LOGOUT,
  CHECK_EXISTING_ROOM,
  USER_CONNECTED_AND_JOIN_ROOM
} from "../../constants";
import LoginForm from "../login-form/";
/* import io from "socket.io-client"; */
import io from "socket.io-client";
const uuidv4 = require("uuid/v4");

const socketUrl = "http://localhost:6600";

export default class Layout extends React.Component {
  state = {
    socket: null,
    user: null,
    roomId: null,
    error: null
  };

  componentDidMount() {
    const { match } = this.props.match.params;
    /* if (match.url === "/") { */
    this.initSocket();
    /* } */
  }

  initSocket = () => {
    // Создаем менеджер
    const socket = io(socketUrl);
    const { match } = this.props;

    socket.on("connect", () => {
      console.log("Connected", socket);
    });
    if (match.path !== "/") {
      socket.emit(CHECK_EXISTING_ROOM, match.params.roomid, this.checkRoom);
    }
    this.setState({ socket });
  };

  checkRoom = (message, roomId) => {
    this.setState({ error: message, roomId });
  };

  setUser = user => {
    const { socket, roomId } = this.state;
    const { match } = this.props;
    if (match.path === "/") {
      let roomId = uuidv4();
      socket.emit(USER_CONNECTED_AND_CREATE_ROOM, user, roomId);
      this.setState({ user, roomId }, () => {
        this.props.history.push(`/${roomId}`);
      });
    } else {
      socket.emit(USER_CONNECTED_AND_JOIN_ROOM, user, roomId);
      this.setState({ user, roomId });
    }
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { socket, user, roomId, error } = this.state;
    const { path } = this.props.match;
    if (error) return <div>Комнаты не существует</div>;
    return (
      <div className="container">
        {!user ? (
          <LoginForm
            socket={socket}
            setUser={this.setUser}
            isInvited={path !== "/"}
          />
        ) : (
          <ChatContainer
            socket={socket}
            user={user}
            roomId={roomId}
            logout={this.logout}
          />
        )}
      </div>
    );
  }
}

/*
заходит по "/"
вводит имя
верифицируется имя
если ок то, создается комната(id комнаты на клиенте, передается серверу, )
переадресация в адресной строке на комнату

*/
