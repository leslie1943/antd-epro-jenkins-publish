/* eslint-disable */
import React, { Component } from 'react';
import wrapWithUsername from './wrapWithUsername'

class BizEdit extends Component {
  render() {
    return (
      <div>
        <div> BizEdit, {this.props.username}</div>
      </div>
    )
  }
}

BizEdit = wrapWithUsername(BizEdit)

export default BizEdit;
