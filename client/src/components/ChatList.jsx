import React, { Component } from 'react';

class ChatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.messages.length > 0
          ? this.props.messages.map((message, idx) => {
            return (
              <div key={idx}>
                {message}
              </div>
            )
          })
          : <div>No chat messages</div>
        }
      </div>
    );
  }
}

ChatList.defaultProps = {
  messages: []
}

export default ChatList;