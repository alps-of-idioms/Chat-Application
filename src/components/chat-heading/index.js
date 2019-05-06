import React from "react";
import PropTypes from "prop-types";
import logOut from "./iconmonstr-log-out-2.svg";
import ListOfUsers from "../list-of-users";
import {
  Header,
  Wrapper,
  CountUsersWrapper,
  ExitButton,
  ButtonShow,
  TrigrammMenu,
  NumberOfVisitors,
  LogOutIcon
} from "./styles";

export default class ChatHeading extends React.Component {
  state = {
    showList: false
  };

  static propTypes = {
    //Коллбек для выходя из комнаты
    logout: PropTypes.func,
    //Список пользователей находящихся в комнате
    onlineUsers: PropTypes.arrayOf(PropTypes.object)
  };

  handleChangeList = () => {
    this.setState(prevState => {
      return {
        showList: !prevState.showList
      };
    });
  };

  render() {
    const { onlineUsers, logout } = this.props;
    const { showList } = this.state;
    return (
      <Header>
        <Wrapper>
          <ExitButton onClick={logout}>
            <LogOutIcon src={logOut} alt="logout" />
          </ExitButton>
          <CountUsersWrapper>
            <NumberOfVisitors>
              Участников: {onlineUsers.length}
            </NumberOfVisitors>
          </CountUsersWrapper>
          <ButtonShow onClick={this.handleChangeList}>
            <TrigrammMenu changer={showList} />
          </ButtonShow>

          {showList && <ListOfUsers onlineUsers={onlineUsers} />}
        </Wrapper>
      </Header>
    );
  }
}
