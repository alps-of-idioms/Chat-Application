const {
  VERIFY_USER,
  CHECK_EXISTING_ROOM,
  USER_CONNECTED_AND_CREATE_ROOM,
  USER_CONNECTED_AND_JOIN_ROOM,
  LIST_OF_USERS,
  USER_SEND_MESSAGE,
  SERVER_SEND_MESSAGE,
  LOGOUT
} = require("../constants");
const { createUser, createMessage } = require("../Factories");

let connectedUsers = {};

module.exports = function(server) {
  var io = require("socket.io").listen(server);

  io.on("connection", socket => {
    const getOnlineUsers = roomId => {
      return Object.values(connectedUsers).filter(user => {
        return Object.keys(io.sockets.adapter.rooms[roomId].sockets).includes(
          user.id
        );
      });
    };

    function emitOnlineUsers(roomId) {
      io.to(roomId).emit(LIST_OF_USERS, getOnlineUsers(roomId));
    }

    function emitMessage(roomId, message) {
      io.to(roomId).emit(
        SERVER_SEND_MESSAGE,
        createMessage({
          message,
          isServer: true
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

      emitMessage(roomId, `${user.name} создал комнату`);
      emitOnlineUsers(roomId);

      console.log("END OF ROOMS CREATE");
    });

    socket.on(USER_CONNECTED_AND_JOIN_ROOM, (user, roomId) => {
      connectedUsers = addUser(connectedUsers, user);
      socket.user = user;
      socket.room = roomId;
      socket.join(roomId);

      emitMessage(roomId, `${user.name} присоединился к комнате`);
      emitOnlineUsers(roomId);

      console.log("END OF ROOMS JOIN");
    });

    socket.on(CHECK_EXISTING_ROOM, (roomId, callback) => {
      if (Object.keys(io.sockets.adapter.rooms).includes(roomId)) {
        callback(null, roomId);
      } else {
        callback("Комнаты не существует");
      }
    });

    socket.on(USER_SEND_MESSAGE, (roomId, messageText, callback) => {
      if ("user" in socket) {
        let message = createMessage({
          message: messageText,
          sender: socket.user.name
        });

        callback(message);
        socket.broadcast.to(roomId).emit(SERVER_SEND_MESSAGE, message);
      }
    });

    socket.on("disconnect", () => {
      if ("user" in socket) {
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        if ("room" in socket) {
          socket.broadcast.to(socket.room).emit(
            SERVER_SEND_MESSAGE,
            createMessage({
              message: `${socket.user.name} покинул комнату`,
              isServer: true
            })
          );

          console.log("disconnect", socket.user.name);
          if (io.sockets.adapter.rooms[socket.room]) {
            emitOnlineUsers(socket.room);
          }
        }
      }
    });

    socket.on(LOGOUT, () => {
      socket.disconnect();
      /* connectedUsers = removeUser(connectedUsers, socket.user.name);
      socket.broadcast.to(socket.room).emit(
        SERVER_MESSAGE,
        createMessage({
          message: `${socket.user.name} leaved the room`,
          isServer: true
        })
      );
      if (io.sockets.adapter.rooms[socket.room]) {
        emitOnlineUsers(socket.room);
      } */
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
