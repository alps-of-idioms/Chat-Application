import React from "react";
import { SubmitButton, HeaderText } from "../login-form";
import styled from "styled-components";

const ForwardButton = styled(SubmitButton)`
  max-width: initial;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
