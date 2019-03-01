import React, { Component } from 'react';

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value)
    this.state.value = ''
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea 
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={'Please add your comment'}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ChatForm;