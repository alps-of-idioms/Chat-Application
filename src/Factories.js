const uuidv4 = require("uuid/v4");

const createUser = ({ name = "", id } = {}) => ({
  id,
  name
});

const createMessage = ({
  message = "",
  sender = "SERVER",
  isServer = false
} = {}) => ({
  id: uuidv4(),
  time: getTime(new Date(Date.now())),
  message,
  sender,
  isServer
});

const getTime = date => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createMessage,
  createUser
};
