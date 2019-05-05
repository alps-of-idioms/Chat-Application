import React from "react";
import logOut from "./iconmonstr-log-out-2.svg";
import ListOfUsers from "../list-of-users";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: #2f719f;
  width: 100%;
  height: 10%;
  position: relative;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom: 2px solid whitesmoke;
  @media only screen and (min-width: 576px) {
    height: 13%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  width: 100%;
  @media only screen and (min-width: 576px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const CountUsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ExitButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightseagreen;
  border-radius: 0.25rem;
  @media only screen and (min-width: 576px) {
    padding: 0.5rem 0.75rem;
  }
`;

const ButtonShow = styled.button`
  padding: 1rem 1rem;
  border: none;
  position: relative;
  border-radius: 0.25rem;
  background-color: lightseagreen;
  color: white;
  @media only screen and (min-width: 576px) {
    padding: 1.5rem 1.5rem;
  }
`;

const TrigrammMenu = styled.span`
  &,
  &::after,
  &::before {
    content: "";
    display: block;
    transition: transform 0.3s;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -1px;
    margin-left: -10px;
    width: 20px;
    height: 2px;
    background-color: white;
  }
  & {
    height: ${props => (props.changer ? "0" : "2px")};
  }
  &::before {
    transform: ${props =>
      props.changer ? " rotate(45deg)" : "translateY(-5px)"};
  }
  &::after {
    transform: ${props =>
      props.changer ? " rotate(-45deg)" : "translateY(5px)"};
  }
`;

const NumberOfVisitors = styled.span`
  font-weight: 500;
  @media only screen and (min-width: 576px) {
    font-weight: 900;
    font-size: 1.25rem;
  }
`;

const LogOutIcon = styled.img`
  display: block;
`;

export default class ChatHeading extends React.Component {
  state = {
    showList: false
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
