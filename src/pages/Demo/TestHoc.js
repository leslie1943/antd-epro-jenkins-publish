/* eslint-disable */
import React, { Component } from 'react';
import Welcome from './HocDemo/BizEdit'
import BizView from './HocDemo/BizView'

class DemoHoc extends Component {
  render() {
    return (
      <div>
        <Welcome />
        <BizView />
      </div>
    )
  }
}


export default DemoHoc;
