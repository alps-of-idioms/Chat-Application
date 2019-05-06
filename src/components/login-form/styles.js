import styled from "styled-components";

export const Input = styled.input`
  min-width: 50%;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 0.25rem;
  &::placeholder {
    color: #a0b0b9;
  }
  @media only screen and (max-width: 576px) {
    padding: 0.5rem;
  }
`;

export const HeaderText = styled.h2`
  margin-top: 0;
  font-size: 2rem;
  line-height: 2rem;
  border-radius: 0.25rem;
  @media only screen and (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

export const SubmitButton = styled.button`
  max-width: 20%;
  padding: 1.25rem 1rem;
  border: none;
  font-weight: 900;
  border-radius: 0.25rem;
  margin-left: 0.25rem;
  background-color: lightseagreen;
  color: white;
  &:disabled {
    background-color: silver;
  }
  @media only screen and (max-width: 576px) {
    padding: 0.75rem 0.25rem;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const ErrorText = styled.div`
  color: red;
`;
