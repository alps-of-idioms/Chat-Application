import React from "react";
import styled from "styled-components";

const WrapperOfUsers = styled.aside`
  border: 2px solid #ff9241;
  border-radius: 0.25rem;
  padding: 0 1rem;
  position: absolute;
  background-color: #2f719f;
  top: 10vh;
  left: 0;
  right: 0;
  z-index: 99;
  @media only screen and (min-width: 576px) {
    top: 13vh;
    left: 10%;
    right: 10%;
  }
  @media only screen and (min-width: 768px) {
    left: 30%;
    right: 30%;
  }
`;

const WrapperOfList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  margin: 1rem 3rem;
`;

const UserList = styled.span`
  font-weight: 500;
  margin: 0.75rem 0;
`;

const ListOfUsers = ({ onlineUsers }) => {
  return (
    <WrapperOfUsers>
      <h3>Список участников</h3>
      <WrapperOfList>
        {onlineUsers.map(user => {
          return <UserList key={user.id}>{user.name}</UserList>;
        })}
      </WrapperOfList>
    </WrapperOfUsers>
  );
};

export default ListOfUsers;
