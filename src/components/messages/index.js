import React from "react";
import PropTypes from "prop-types";
import {
  MessagesWrapper,
  UserMessageBody,
  ServerMessageBody,
  UserMesssageWrapper,
  UserImage,
  NameTimeWrapper,
  TextWrapper,
  Sender,
  Time,
  Prob
} from "./styles";

export default class Messages extends React.Component {
  container = React.createRef();

  static propTypes = {
    //Массив сообщений
    messages: PropTypes.arrayOf(PropTypes.object),
    //Объект содержаший данные пользователя
    user: PropTypes.objectOf(PropTypes.string)
  };

  //Прокрутка окна сообщений
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
        {messages.map(({ id, messageText, isServer, time, sender }) => {
          return isServer ? (
            <ServerMessageBody key={id}>{messageText}</ServerMessageBody>
          ) : (
            <UserMesssageWrapper key={id} isSender={sender === user.name}>
              <Prob isSender={sender === user.name}>
                <UserMessageBody isSender={sender === user.name}>
                  <NameTimeWrapper>
                    <Sender>{sender}</Sender>
                    <Time>{time}</Time>
                  </NameTimeWrapper>
                  <TextWrapper>
                    <span>{messageText}</span>
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
