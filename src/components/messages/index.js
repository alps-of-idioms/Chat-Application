import React from "react";

export default class Messages extends React.Component {
  container = React.createRef();

  scrollDown = () => {
    const container = this.container.current;
    container.scrollTop = container.scrollHeight;
  };

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate() {
    this.scrollDown();
  }

  render() {
    const { messages, user /* typingUsers */ } = this.props;
    return (
      <div ref={this.container} className="thread-container">
        <div className="thread">
          {messages.map(mes => {
            return (
              <div
                key={mes.id}
                className={`message-container ${mes.sender === user.name &&
                  "right"}`}
              >
                <div className="time">{mes.time}</div>
                <div className="data">
                  <div className="message">{mes.message}</div>
                  <div className="name">{mes.sender}</div>
                </div>
              </div>
            );
          })}
          {/* {typingUsers.map(name => {
            return (
              <div key={name} className="typing-user">
                {`${name} is typing . . .`}
              </div>
            );
          })} */}
        </div>
      </div>
    );
  }
}
