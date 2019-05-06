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
const {
  addUser,
  removeUser,
  isUser,
  createUser,
  createMessage
} = require("../helpers");

/**
 * Объект для хранения текущих пользователей в виде пары ключ - Id сокета, значение - результат вызова функции "createUser"
 */
let connectedUsers = {};

/**
 *@module  модуль
 */
module.exports = function(server) {
  var io = require("socket.io").listen(server);
  /**
   * @event connection - Вызывается при подключении соединения с клиентской стороны
   */
  io.on("connection", socket => {
    /**
     * Функция возвращающая массив пользвателей находящихся в указанной комнате
     * @param {string} roomId Идентификатор комнаты
     * @returns {array} Массив пользователей находящихся в комнате
     */
    function getOnlineUsers(roomId) {
      return Object.values(connectedUsers).filter(user => {
        return Object.keys(io.sockets.adapter.rooms[roomId].sockets).includes(
          user.id
        );
      });
    }
    /**
     * Функция отправляющая массив пользователей в указанную комнату
     * @fires #LIST_OF_USERS
     * @param {string} roomId Идентификатор комнаты
     */
    function emitOnlineUsers(roomId) {
      io.to(roomId).emit(LIST_OF_USERS, getOnlineUsers(roomId));
    }

    /**
     * Функция отправляющая сообщение в указанную комнату
     * @fires #SERVER_SEND_MESSAGE
     * @param {string} roomId Идентификатор комнаты
     * @param {string} messageText Текст сообщения
     */
    function emitMessage(roomId, messageText) {
      io.to(roomId).emit(
        SERVER_SEND_MESSAGE,
        createMessage({
          messageText,
          isServer: true
        })
      );
    }
    /**
     * Верификация пользователя
     * @event #VERIFY_USER Вызывается с клиентской стороны
     * @param {string} - Имя пользователя
     * @callback callback функция для добавления клиента в стейт на клиентской стороне
     */
    socket.on(VERIFY_USER, (nickname, callback) => {
      //Проверка существует ли пользователь с таким именем
      if (isUser(connectedUsers, nickname)) {
        callback({ isUser: true });
      } else {
        callback({
          isUser: false,
          user: createUser({ id: socket.id, name: nickname })
        });
      }
    });

    /**
     * Создание новой комнаты и присоединение к ней пользователя
     * @event #USER_CONNECTED_AND_CREATE_ROOM
     * @param {object} - Объект содержащий данные пользователя
     * @param {string} - Идентификатор комнаты
     *
     */

    socket.on(USER_CONNECTED_AND_CREATE_ROOM, (user, roomId) => {
      //Добавление пользователя к списку пользователей
      connectedUsers = addUser(connectedUsers, user);
      socket.user = user;
      socket.room = roomId;
      //Присоединения пользователя к комнате
      socket.join(roomId);
      // Отправка сообщения о создании команты
      emitMessage(roomId, `${user.name} создал комнату`);
      //Отправка массива с пользователями присоединённых к комнате
      emitOnlineUsers(roomId);

      console.log("END OF ROOMS CREATE");
    });

    /**
     * Присоединение пользователя к указанной комнате
     * @event #USER_CONNECTED_AND_JOIN_ROOM
     * @param {object} - Объект содержащий данные пользователя
     * @param {string} - Идентификатор комнаты
     */
    socket.on(USER_CONNECTED_AND_JOIN_ROOM, (user, roomId) => {
      //Добавление пользователя к списку пользователей
      connectedUsers = addUser(connectedUsers, user);
      socket.user = user;
      socket.room = roomId;
      //Присоединения пользователя к комнате
      socket.join(roomId);
      // Отправка сообщения о присоединении к команте
      emitMessage(roomId, `${user.name} присоединился к комнате`);
      //Отправка массива с пользователями присоединённых к комнате
      emitOnlineUsers(roomId);

      console.log("END OF ROOMS JOIN");
    });

    /**
     * Присоединение пользователя к указанной комнате
     * @event #CHECK_EXISTING_ROOM
     * @param {string} - Идентификатор комнаты
     * @callback callback - Добавление ошибки в стейт на клиентской стороне в случае если комната уже существет
     */
    socket.on(CHECK_EXISTING_ROOM, (roomId, callback) => {
      if (Object.keys(io.sockets.adapter.rooms).includes(roomId)) {
        callback(null, roomId);
      } else {
        callback("Комнаты не существует");
      }
    });

    /**
     * Получение сообщения с клиентской стороны
     * @event #USER_SEND_MESSAGE
     * @param {string} - Идентификатор комнаты
     * @param {string} - Текст сообщения
     * @callback callback - Добавление сообщения в стейт на клиентской стороне
     */
    socket.on(USER_SEND_MESSAGE, (roomId, messageText, callback) => {
      if ("user" in socket) {
        //Создание сообщения
        let message = createMessage({
          messageText,
          sender: socket.user.name
        });
        console.log(message);
        callback(message);
        //Отправка сообщения остальным пользователям в комнате
        socket.broadcast.to(roomId).emit(SERVER_SEND_MESSAGE, message);
      }
    });
    /**
     * @event disconnect - Вызывается при отключении соединения с клиентской стороны
     */
    socket.on("disconnect", () => {
      if ("user" in socket) {
        //Удаление пользователя из списка пользователей
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        if ("room" in socket) {
          console.log("disconnect", socket.user.name);
          //Если в комнате ещё есть пользователи
          if (io.sockets.adapter.rooms[socket.room]) {
            //Отправка остальным пользователям сообщении об отключении пользователя
            socket.broadcast.to(socket.room).emit(
              SERVER_SEND_MESSAGE,
              createMessage({
                messageText: `${socket.user.name} покинул комнату`,
                isServer: true
              })
            );
            //Отправка списка пользователей в указанную комнату
            emitOnlineUsers(socket.room);
          }
        }
      }
    });
    /**
     * Отключение пользователя с клиентской стороны
     * @event #LOGOUT
     */
    socket.on(LOGOUT, () => {
      socket.disconnect();
    });
  });
};
