/* eslint-disable */
import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import PubSubChild from './components/PubSubChild'
class PubSubDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
  }
  // 在父组件的componentWillMount钩子函数中订阅消息，要注意this
  componentWillMount() {
    console.info('PubSub', PubSub)
    // 订阅消息
    // 订阅event, 回调处理函数
    PubSub.subscribe('random', (msg, data) => {
      console.info('msg', msg)
      console.info('data', data)
      this.setState({
        msg: data
      })
    })


  }

  render() {
    let { msg } = this.state
    return (
      <div>
        <PubSubChild />
        <p style={{ color: 'darkgreen' }}>我是订阅的结果:{msg}</p>
      </div>
    )
  }
}


export default PubSubDemo;
