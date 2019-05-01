const {
  VERIFY_USER,
  CHECK_EXISTING_ROOM,
  USER_CONNECTED_AND_CREATE_ROOM,
  USER_CONNECTED_AND_JOIN_ROOM,
  SERVER_MESSAGE,
  LIST_OF_USERS,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  USER_DISCONNECTED,
  TYPING,
  STOP_TYPING,
  LOGOUT
} = require("../constants");
const { createUser, createMessage } = require("../Factories");

let connectedUsers = {};

module.exports = function(server) {
  var io = require("socket.io").listen(server);

  io.on("connection", socket => {
    const getOnlineUsers = roomId => {
      /* if (io.sockets.adapter.rooms[roomId].sockets) { */
      return Object.values(connectedUsers).filter(item => {
        return Object.keys(io.sockets.adapter.rooms[roomId].sockets).includes(
          item.id
        );
      });
      /*  }
    return []; */
    };

    function emitOnlineUsers(roomId) {
      /* console.log("GETONLINEUSERS", getOnlineUsers(roomId)); */
      io.to(roomId).emit(LIST_OF_USERS, getOnlineUsers(roomId));
    }

    function emitMessage(typeOfMessage, sender, roomId, message) {
      io.to(roomId).emit(
        typeOfMessage,
        createMessage({
          message,
          sender
        })
      );
    }

    socket.on(VERIFY_USER, (nickname, callback) => {
      if (isUser(connectedUsers, nickname)) {
        callback({ isUser: true });
      } else {
        callback({
          isUser: false,
          user: createUser({ id: socket.id, name: nickname })
        });
      }
    });

    socket.on(USER_CONNECTED_AND_CREATE_ROOM, (user, roomId) => {
      connectedUsers = addUser(connectedUsers, user);
      socket.user = user;
      socket.room = roomId;
      socket.join(roomId);

      emitMessage(SERVER_MESSAGE, "Server", roomId, `${user.name} welcome!`);
      emitOnlineUsers(roomId);

      /* io.to(roomId).emit(
      SERVER_MESSAGE,
      createMessage({
        message: `${user.name} welcome!`,
        sender: "Server"
      })
    ); */

      /* console.log(io.sockets.adapter.rooms); */
      console.log("END OF ROOMS CREATE");
    });

    socket.on(USER_CONNECTED_AND_JOIN_ROOM, (user, roomId) => {
      connectedUsers = addUser(connectedUsers, user);
      socket.user = user;
      socket.room = roomId;
      socket.join(roomId);

      emitMessage(
        SERVER_MESSAGE,
        "Server",
        roomId,
        `${user.name} joined to the room`
      );
      emitOnlineUsers(roomId);

      /* io.to(roomId).emit(
      SERVER_MESSAGE,
      createMessage({
        message: `${user.name} joined to the room`,
        sender: "Server"
      })
    ); */

      console.log("END OF ROOMS JOIN");
    });

    socket.on(CHECK_EXISTING_ROOM, (roomId, callback) => {
      if (Object.keys(io.sockets.adapter.rooms).includes(roomId)) {
        callback(null, roomId);
      } else {
        callback("Комнаты не существует");
      }
    });

    socket.on("disconnect", () => {
      if ("user" in socket) {
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        if ("room" in socket) {
          socket.broadcast.to(socket.room).emit(
            SERVER_MESSAGE,
            createMessage({
              message: `${socket.user.name} leaved the room`,
              sender: "Server"
            })
          );

          emitOnlineUsers(socket.room);
        }
      }
    });

    socket.on(LOGOUT, () => {
      connectedUsers = removeUser(connectedUsers, socket.user.name);
      socket.broadcast
        .to(socket.room)
        .emit(SERVER_MESSAGE, `${socket.user.name} leaved the room`);
    });
  });
};

function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

function isUser(userList, username) {
  return username in userList;
}
