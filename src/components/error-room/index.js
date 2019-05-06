import React from "react";
import { HeaderText } from "../login-form/styles";
import { ForwardButton, Wrapper } from "./styles";

const ErrorRoom = () => {
  return (
    <Wrapper>
      <HeaderText>Комнаты не существует</HeaderText>
      <a href="/">
        <ForwardButton>Вернуться к созданию комнаты</ForwardButton>
      </a>
    </Wrapper>
  );
};

export default ErrorRoom;
