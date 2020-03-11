/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
function HookDemo() {
  // 参数: state,更新state的方法
  const [count, setCount] = useState(0)
  const [minus, setMiuns] = useState(0)
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
  const handleClick = () => {
    setCount(count + 1)
    setMiuns(minus - 1)
  }
  return (
    <div>
      <p>you clicked {count} times</p>
      <p>you clicked {minus} times</p>
      <Button type="primary"
        onClick={handleClick}>Add</Button>
    </div>
  )
}
export default HookDemo;
