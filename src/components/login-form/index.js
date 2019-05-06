import React from "react";
import PropTypes from "prop-types";
import { VERIFY_USER } from "../../constants";
import { Row, Col } from "react-flexbox-grid";
import {
  Input,
  HeaderText,
  SubmitButton,
  FormWrapper,
  ErrorText
} from "./styles";

export default class LoginForm extends React.Component {
  textInput = React.createRef();

  state = {
    username: "",
    error: ""
  };

  static propTypes = {
    // Объект соединения
    socket: PropTypes.object,
    // Коллбек для обновления стейта
    setUser: PropTypes.func,
    // Флаг указывающий перешел ли пользователь по URL
    isInvited: PropTypes.bool
  };

  //Фокус на поле ввода после монтирования компонента
  componentDidMount() {
    this.focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { socket } = this.props;
    const { username } = this.state;
    socket.emit(VERIFY_USER, username, this.setUser);
  };

  //Коллбек для отправки на сервер, добавляет пользователя в стейт
  setUser = ({ user, isUser }) => {
    console.log(user, isUser);
    if (isUser) {
      this.setError("Имя пользователя уже занято");
    } else {
      this.setError("");
      this.props.setUser(user);
    }
  };

  //Коллбек устанавливающий текст ошибки в стейт
  setError = error => {
    this.setState({ error });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  focus() {
    this.textInput.current.focus();
  }

  render() {
    const { username, error } = this.state;
    const { isInvited } = this.props;
    return (
      <Row center="xs" style={{ height: "100%" }}>
        <Col xs={12} sm={11} md={9} lg={9}>
          <FormWrapper>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">
                {isInvited ? (
                  <HeaderText>
                    Вы приглашены в комнату для продолжения введите имя
                  </HeaderText>
                ) : (
                  <HeaderText>Введите имя для создания комнаты</HeaderText>
                )}
              </label>
              <Input
                ref={this.textInput}
                type="text"
                id="username"
                value={username}
                onChange={this.handleChange}
                placeholder={"Имя пользователя"}
              />
              <SubmitButton disabled={username === ""} type="submit">
                Ввести
              </SubmitButton>
              {error && <ErrorText>{error}</ErrorText>}
            </form>
          </FormWrapper>
        </Col>
      </Row>
    );
  }
}
