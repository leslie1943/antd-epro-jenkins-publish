/* eslint-disable */
import React, { Component } from 'react';

export default (WrappedComponent) => {
  class newComponent extends Component {
    constructor() {
      super();
      this.state = {
        username: ''
      }
    }

    componentWillMount() {
      localStorage.setItem('username', 'leslie')
      const username = localStorage.getItem('username');
      this.setState({
        username
      })
    }

    render() {
      return (
        <WrappedComponent username={this.state.username} />
      )
    }
  }
  return newComponent
}