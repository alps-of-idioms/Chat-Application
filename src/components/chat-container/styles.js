import styled from "styled-components";

export const MessagesInputWrapper = styled.div`
  background-color: #0e222f;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow: auto;
  height: 90%;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  @media only screen and (min-width: 576px) {
    height: 87%;
  }
`;
