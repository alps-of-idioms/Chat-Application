const uuidv4 = require("uuid/v4");

/**
 *
 * @param {object} user - Объект с данными для создания пользователя
 * @param {string}  user.name - Имя пользователя
 * @param {string} user.id - Id пользователя
 * @returns {object} - Объект пользователя
 */
const createUser = ({ name = "", id } = {}) => ({
  id,
  name
});

/**
 *
 * @param {object} message - Объект с данными для создания сообщения
 * @param {string} message.messageText - Текст сообщения
 * @param {string} message.sender - Имя пользователя с которым нужно ассоциировать текст сообщения
 * @param {boolean} message.isServer - Флаг для индикации того что сообщения было отправлено от лица сервера
 * @returns {object} - Объект сообщения
 */

const createMessage = ({
  messageText = "",
  sender = "SERVER",
  isServer = false
} = {}) => ({
  id: uuidv4(),
  time: getTime(new Date()),
  messageText,
  sender,
  isServer
});

/**
 * Функция форматирующая объект даты в строку вида
 * @param {object} date Объект даты
 * @returns {string} Строка с датой в двухзначном четырёхзначном формате
 */

const getTime = date => {
  return date.toLocaleString("ru", { hour: "2-digit", minute: "2-digit" });
};

/**
 * Чистая функция добавляющая пользователей в объект где содержатся текущие пользователей
 * @param {object} userList - Объект содержащий всех текущих пользователей
 * @param {object} user - Объект содержащий данные пользователя
 * @returns {object} Новый объект с текущими пользователями, содержащий добавленного пользователя
 */
function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}
/**
 * Чистая функция удалящая пользователя из объекта где содержаться текущие пользователи
 * @param {object} userList - Объект содержащий всех текущих пользователей
 * @param {string} username - Строка с именем пользователя
 * @returns {object} - Новый объект с текущими пользователями, без указанного пользователя
 */
function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

/**
 * Чистая функция проверяющая содержится ли указанный пользователь в списке текущих пользователей
 * @param {object} userList - Объект содержащий всех текущих пользователей
 * @param {string} username - Строка с именем пользователя
 * @returns {boolean} - Флаг содержит ли объект с текущими пользователями указанное имя пользователя
 */
function isUser(userList, username) {
  return username in userList;
}

module.exports = {
  addUser,
  removeUser,
  isUser,
  createMessage,
  createUser
};
