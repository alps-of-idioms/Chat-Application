import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
`;

const InputMes = styled.input`
  flex: 1 1 75%;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  /* border-top-left-radius: 0.25rem; */
  border-bottom-left-radius: 0.25rem;

  &::placeholder {
    color: #a0b0b9;
  }
  @media only screen and (max-width: 576px) {
    padding: 0.5rem;
  }
`;

const SendButton = styled.button`
  flex: 1 1 25%;
  padding: 1.25rem 1rem;
  border: none;
  font-weight: 900;
  border-bottom-right-radius: 0.25rem;

  background-color: lightseagreen;
  color: white;
  &:disabled {
    background-color: silver;
  }
  @media only screen and (max-width: 576px) {
    padding: 0.75rem 0.25rem;
  }
`;

export default class MessageInput extends React.Component {
  state = {
    message: "",
    isTyping: false
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
