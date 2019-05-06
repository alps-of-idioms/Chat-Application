import React from "react";
import PropTypes from "prop-types";
import { Form, InputMes, SendButton } from "./styles";

export default class MessageInput extends React.Component {
  state = {
    message: "",
    isTyping: false
  };

  static propTypes = {
    //Коллбек для отправки сообщения
    sendMessage: PropTypes.func
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.sendMessage(this.state.message);
    this.setState({ message: "" });
  };

  handleInput = e => {
    this.setState({ message: e.target.value });
  };

  render() {
    const { message } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputMes
          id="message"
          type="text"
          value={message}
          autoComplete={"off"}
          placeholder="Написать сообщение..."
          onChange={this.handleInput}
        />
        <SendButton disabled={message.length < 1} type="submit">
          Отправить
        </SendButton>
      </Form>
    );
  }
}
