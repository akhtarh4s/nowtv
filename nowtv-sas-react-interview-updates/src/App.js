import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import getChatLog from "./service";

class App extends Component {
  constructor() {
    super();
    this.state = { logs: [] };
  }

  async componentDidMount() {
    let logs = await getChatLog();
    this.setState({ logs: logs });
  }

  renderLog(log) {
    return (
      <div key={log.messageId} data-toggle="tooltip" data-placement="top" title={log.email}>
        <div className="row" id="box">
          <div className="col">
            <div>
              <strong>Full Name: </strong>
              {log.fullName}
            </div>
            <div>
              <strong>User ID: </strong>
              {log.userId}
            </div>
            <div>
              <strong>Message: </strong> {log.message}
            </div>
            <div>
              <strong>Message id: </strong> {log.messageId}
            </div>
            <div>
              <strong>Time stamp: </strong>
              {log.humanTime}
            </div>
          </div>
          <div className="col">
            <div className="rightBox">
              <img src={log.avatar} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="AppContainer">
        <h1>Chat log Messages</h1>
        <div className="container">
          <ul>{this.state.logs.map(log => this.renderLog(log))}</ul>
        </div>
      </div>
    );
  }
}

export default App;
