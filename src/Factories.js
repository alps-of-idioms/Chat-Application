const uuidv4 = require("uuid/v4");
/* import { v4 as uuidv4 } from "uuid/v4"; */

const createUser = ({ name = "", id } = {}) => ({
  id,
  name
});

const createMessage = ({ message = "", sender } = {}) => ({
  id: uuidv4(),
  time: getTime(new Date(Date.now())),
  message,
  sender
});

const createRoom = user => [user];

const getTime = date => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createRoom,
  createMessage,
  createUser
};
