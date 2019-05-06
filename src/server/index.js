const port = 6600;

var app = require("express")();

var server = require("http").createServer(app);

/**
 * Отправляем модулю объект сервера для инициализации
 *
 */
require("./socket")(server);

server.listen(port, () => {
  console.log("Server is listening on: " + port);
});
