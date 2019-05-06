import styled from "styled-components";

export const MessagesWrapper = styled.div`
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

export const UserMessageBody = styled.div`
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

export const ServerMessageBody = styled.div`
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

export const UserMesssageWrapper = styled.div`
  align-self: ${props => (props.isSender ? "flex-end" : "flex-start")};
  margin: 0.75rem 0;
  max-width: 65%;
  font-size: 0.75rem;
  @media only screen and (min-width: 576px) {
    font-size: 1rem;
  }
`;

export const UserImage = styled.div`
  display: flex;
  min-height: 2rem;
  min-width: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: black;
  background-color: white;
`;

export const NameTimeWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  line-height: 1.25rem;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  word-break: break-word;
  padding: 0.5rem 0 0;
  text-align: justify;
`;

export const Sender = styled.span`
  font-size: 1rem;

  font-weight: 900;
  text-align: initial;
  @media only screen and (min-width: 576px) {
    font-size: 1.25rem;
  }
`;

export const Time = styled.span`
  font-size: 0.5rem;
  margin-left: 0.75rem;
  @media only screen and (min-width: 576px) {
    font-size: 0.75rem;
  }
`;

export const Prob = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: ${props => (props.isSender ? "row" : "row-reverse")};
`;
