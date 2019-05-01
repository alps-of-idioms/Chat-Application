const uuidv4 = require("uuid/v4");
const port = 6600;

var app = require("express")();

var server = require("http").createServer(app);

require("./socket")(server);

/* function addUsertoRoom(roomList, user, roomId) {
  let newRoomList = Object.assign({}, roomList);
  newRoomList[roomId].push(user);
  return newRoomList;
}
 */

server.listen(port, () => {
  console.log("Сервер слушает на" + port);
});
