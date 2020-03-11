/* eslint-disable */
import React, { Component } from 'react';
import wrapWithUsername from './wrapWithUsername'

class BizView extends Component {
  render() {
    return (
      <div>BizView, {this.props.username}</div>
    )
  }
}
BizView = wrapWithUsername(BizView)

export default BizView;