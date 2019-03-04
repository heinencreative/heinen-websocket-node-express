import React, { Component } from 'react';
import './App.css';
import Websocket from 'react-websocket';
import ChatForm from './components/ChatForm'
import ChatList from './components/ChatList'
import UserNameForm from './components/UserNameForm'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      messages: []
    };
  }

  handleData(data) {
    this.setState({ messages: [...this.state.messages, data] })
  }

  sendMessage(message){
    const payload = {
      message,
      username: this.state.username
    }
    this.refWebSocket.sendMessage(JSON.stringify(payload));
  }

  setUsername(username){
    this.setState({username})
  }

  render() {
    return (
      <div className="App">
        { this.state.username === ''
          ? <UserNameForm onUserNameSubmit={this.setUsername.bind(this)}/>
          : <div>
              <ChatList 
                messages={this.state.messages}
              />
              <ChatForm 
                onSubmit={this.sendMessage.bind(this)}
              />
              <Websocket url='ws://localhost:8999' 
                onMessage={this.handleData.bind(this)}
                ref={Websocket => {
                    this.refWebSocket = Websocket;
              }}/>
            </div>
        }
      </div>
    );
  }
}

export default App;
