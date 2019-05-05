import React from "react";
import styled from "styled-components";

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.75rem;
  background-color: #04273f;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0.25px;
    box-shadow: inset 0 0 6px lightseagreen;
    -webkit-box-shadow: inset 0 0 6px lightseagreen;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: lightseagreen;
    outline: 1px solid slategrey;
  }
`;

const UserMessageBody = styled.div`
  background-color: #4d7d9f;
  position: relative;
  padding: 0.5rem 0.25rem 0.5rem 0.5rem;
  margin-right: ${props => (props.isSender ? "0.5rem" : "0")};
  margin-left: ${props => (props.isSender ? "0" : "0.5rem")};
  &::after,
  &::before {
    content: "";
    border-style: solid;
    border-width: 4px;
    height: 0px;
    position: absolute;
    width: 0;
    border-top-color: transparent;
    border-bottom-color: #4d7d9f;
    border-left-color: #4d7d9f;
    border-right-color: transparent;
    left: auto;
    right: -7px;
    bottom: 16px;
  }
  &::after {
    display: ${props => (props.isSender ? "block" : "none")};
    border-left-color: #4d7d9f;
    border-right-color: transparent;
    left: auto;
    right: -7px;
  }
  &::before {
    display: ${props => (props.isSender ? "none" : "block")};
    border-left-color: transparent;
    border-right-color: #4d7d9f;
    right: auto;
    left: -7px;
  }

  @media only screen and (min-width: 576px) {
    margin-right: ${props => (props.isSender ? "1rem" : "0")};
    margin-left: ${props => (props.isSender ? "0" : "1rem")};
    padding: 0.75rem;
    &::after {
      border-width: 7px;
      right: -14px;
    }
    &::before {
      border-width: 7px;
      left: -14px;
    }
  }
`;

const ServerMessageBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 24px;
  padding: 0.25rem 1.5rem;
  align-self: center;
  background-color: black;
  border-radius: 1rem;
  margin: 0.5rem 0;
  font-size: 0.75rem;
  @media only screen and (min-width: 576px) {
    margin: 0.75rem 0;
    font-size: 1rem;
  }
`;

const UserMesssageWrapper = styled.div`
  align-self: ${props => (props.isSender ? "flex-end" : "flex-start")};
  margin: 0.75rem 0;
  max-width: 65%;
  font-size: 0.75rem;
  @media only screen and (min-width: 576px) {
    font-size: 1rem;
  }
`;

const UserImage = styled.div`
  display: flex;
  min-height: 2rem;
  min-width: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: black;
  background-color: white;
`;

const NameTimeWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  line-height: 1.25rem;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  word-break: break-word;
  padding: 0.5rem 0 0;
  text-align: justify;
`;

const Sender = styled.span`
  font-size: 1rem;

  font-weight: 900;
  text-align: initial;
  @media only screen and (min-width: 576px) {
    font-size: 1.25rem;
  }
`;

const Time = styled.span`
  font-size: 0.5rem;
  margin-left: 0.75rem;
  @media only screen and (min-width: 576px) {
    font-size: 0.75rem;
  }
`;

const Prob = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: ${props => (props.isSender ? "row" : "row-reverse")};
`;

export default class Messages extends React.Component {
  container = React.createRef();

  scrollDown = () => {
    const container = this.container.current;
    container.scrollTop = container.scrollHeight;
  };

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate() {
    this.scrollDown();
  }

  render() {
    const { messages, user } = this.props;

    return (
      <MessagesWrapper ref={this.container}>
        {messages.map(({ id, message, isServer, time, sender }) => {
          return isServer ? (
            <ServerMessageBody key={id}>{message}</ServerMessageBody>
          ) : (
            <UserMesssageWrapper key={id} isSender={sender === user.name}>
              <Prob isSender={sender === user.name}>
                <UserMessageBody isSender={sender === user.name}>
                  <NameTimeWrapper>
                    <Sender>{sender}</Sender>
                    <Time>{time}</Time>
                  </NameTimeWrapper>
                  <TextWrapper>
                    <span>{message}</span>
                  </TextWrapper>
                </UserMessageBody>
                <UserImage>
                  <span>{sender[0].toUpperCase()}</span>
                </UserImage>
              </Prob>
            </UserMesssageWrapper>
          );
        })}
      </MessagesWrapper>
    );
  }
}
