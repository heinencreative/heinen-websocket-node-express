import React, { Component } from 'react';
import './App.css';
import Websocket from 'react-websocket';
import ChatForm from './components/ChatForm'
import ChatList from './components/ChatList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  handleData(data) {
    this.setState({ messages: [...this.state.messages, data] })
  }

  sendMessage(message){
    this.refWebSocket.sendMessage(message);
  }

  render() {
    return (
      <div className="App">
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
    );
  }
}

export default App;
