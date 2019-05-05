import React from "react";
import styled from "styled-components";
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

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

  componentDidMount() {
    if (this.state.socket === null) {
      this.initSocket();
    }
  }

  initSocket = () => {
    // Создаем менеджер
    const socket = io(socketUrl);
    const { match } = this.props;

    socket.on("connect", () => {
      console.log("Connected", socket);
    });
    if (match.path !== "/") {
      this.setState({ loading: true });
      socket.emit(CHECK_EXISTING_ROOM, match.params.roomid, this.checkRoom);
    }
    this.setState({ socket });
  };

  checkRoom = (message, roomId) => {
    this.setState({ error: message, roomId, loading: false });
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
