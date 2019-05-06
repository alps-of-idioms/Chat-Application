import React from "react";
import { WrapperOfUsers, WrapperOfList, UserList } from "./styles";

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
