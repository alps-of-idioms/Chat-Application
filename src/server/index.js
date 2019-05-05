const uuidv4 = require("uuid/v4");
const port = 6600;

var app = require("express")();

var server = require("http").createServer(app);

require("./socket")(server);

server.listen(port, () => {
  console.log("Сервер слушает на" + port);
});
