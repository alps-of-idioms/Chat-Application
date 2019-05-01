import React from "react";
import { VERIFY_USER } from "../../constants";

export default class LoginForm extends React.Component {
  textInput = React.createRef();

  state = {
    nickname: "",
    error: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
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
    this.textInput.focus();
  }

  render() {
    const { nickname, error } = this.state;
    const { isInvited } = this.props;
    return (
      <div className="login">
        {isInvited ? <div>Вы приглашены в комнату</div> : null}
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <input
            type="text"
            ref={this.textInput}
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder={"MyUsername"}
          />
          {error ? <div className="error">{error}</div> : null}
        </form>
      </div>
    );
  }
}
