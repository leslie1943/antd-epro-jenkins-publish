/* eslint-disable */
import React, { Component } from 'react';
import { Button } from 'antd';

import PubSub from 'pubsub-js'
class PubSubChild extends Component {
  constructor() {
    super();
  }

  sendMsg = () => {
    // 参数: eventName, eventData
    PubSub.publish('random', `我是发布的随机数:${parseInt(Math.random() * 1000)}`)
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}><Button type="primary" onClick={this.sendMsg}>发布消息</Button></div>

      </div>
    )
  }
}


export default PubSubChild;
