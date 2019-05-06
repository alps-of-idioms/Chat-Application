import React from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles";
import ChatContainer from "../chat-container";
import LoginForm from "../login-form/";
import ErrorRoom from "../error-room";
import io from "socket.io-client";
import { Grid } from "react-flexbox-grid";
import Spinner from "../spinner";
import {
  USER_CONNECTED_AND_CREATE_ROOM,
  LOGOUT,
  CHECK_EXISTING_ROOM,
  USER_CONNECTED_AND_JOIN_ROOM
} from "../../constants";
const uuidv4 = require("uuid/v4");

const socketUrl = "http://localhost:6600";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null,
      roomId: null,
      error: null,
      loading: null
    };
  }

  static propTypes = {
    //Пропсы react-router-dom
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
  };

  //Инициализация подключения
  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    // Создаем подключение
    const socket = io(socketUrl);
    const { match } = this.props;

    /* socket.on("connect", () => {
      console.log("Connected", socket);
    }); */
    //
    if (match.path !== "/") {
      this.setState({ loading: true });
      //Проверка существует ли комната по указанному URL
      socket.emit(CHECK_EXISTING_ROOM, match.params.roomid, this.checkRoom);
    }
    this.setState({ socket });
  };

  //Коллбек для отправки на сервер
  checkRoom = (message, roomId) => {
    this.setState({ error: message, roomId, loading: false });
  };

  setUser = user => {
    const { socket, roomId } = this.state;
    const { match } = this.props;
    //Если пользователь пришел по сслылке присоединяем к комнате, если не то создаём новую
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

  //Выход пользователя из комнаты и редирект
  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ socket: io(socketUrl), user: null, roomId: null }, () => {
      this.props.history.push(`/`);
    });
  };

  render() {
    const { socket, user, roomId, error, loading } = this.state;
    const { path } = this.props.match;
    if (loading) return <Spinner />;
    if (error) return <ErrorRoom />;
    return (
      <Grid style={{ width: "100%" }}>
        {!user ? (
          <Wrapper>
            <LoginForm
              socket={socket}
              setUser={this.setUser}
              isInvited={path !== "/"}
            />
          </Wrapper>
        ) : (
          <ChatContainer
            socket={socket}
            user={user}
            roomId={roomId}
            logout={this.logout}
          />
        )}
      </Grid>
    );
  }
}
