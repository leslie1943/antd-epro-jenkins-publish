/* eslint-disable */
import React, { useState } from 'react';
import { Button } from 'antd';

function HookDemo() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>you clicked {count} times</p>
      <Button type="primary" onClick={() => setCount(count + 1)}>Add</Button>
    </div>
  )
}

export default HookDemo;
