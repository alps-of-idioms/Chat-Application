import styled from "styled-components";

export const Form = styled.form`
  display: flex;
`;

export const InputMes = styled.input`
  flex: 1 1 75%;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  border-bottom-left-radius: 0.25rem;

  &::placeholder {
    color: #a0b0b9;
  }
  @media only screen and (max-width: 576px) {
    padding: 0.5rem;
  }
`;

export const SendButton = styled.button`
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
