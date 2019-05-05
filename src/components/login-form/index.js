import React from "react";
import { VERIFY_USER } from "../../constants";
import { Row, Col } from "react-flexbox-grid";
import styled from "styled-components";

const Input = styled.input`
  min-width: 50%;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 0.25rem;
  &::placeholder {
    color: #a0b0b9;
  }
  @media only screen and (max-width: 576px) {
    padding: 0.5rem;
  }
`;

export const HeaderText = styled.h2`
  margin-top: 0;
  font-size: 2rem;
  line-height: 2rem;
  border-radius: 0.25rem;
  @media only screen and (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

export const SubmitButton = styled.button`
  max-width: 20%;
  padding: 1.25rem 1rem;
  border: none;
  font-weight: 900;
  border-radius: 0.25rem;
  margin-left: 0.25rem;
  background-color: lightseagreen;
  color: white;
  &:disabled {
    background-color: silver;
  }
  @media only screen and (max-width: 576px) {
    padding: 0.75rem 0.25rem;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default class LoginForm extends React.Component {
  textInput = React.createRef();

  state = {
    username: "",
    error: ""
  };

  componentDidMount() {
    this.focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { socket } = this.props;
    const { username } = this.state;
    socket.emit(VERIFY_USER, username, this.setUser);
  };

  setUser = ({ user, isUser }) => {
    console.log(user, isUser);
    if (isUser) {
      this.setError("User name taken");
    } else {
      this.setError("");
      this.props.setUser(user);
    }
  };

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
                type="text"
                ref={this.textInput}
                id="username"
                value={username}
                onChange={this.handleChange}
                placeholder={"MyUsername"}
              />
              <SubmitButton disabled={username === ""} type="submit">
                Ввести
              </SubmitButton>
              {error ? <div className="error">{error}</div> : null}
            </form>
          </FormWrapper>
        </Col>
      </Row>
    );
  }
}
