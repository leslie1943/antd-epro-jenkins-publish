/* eslint-disable no-console */
import React from 'react';

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.childTextInput = React.createRef()
  }

  focusTextInput = () => {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.childTextInput.current.focus()
    console.info('this.childTextInput.current.focus()', this.childTextInput)
  }

  render() {
    return (
      <div>
        <input type="input" ref={this.childTextInput} />
        <input type="button" value="Focus on text input" onClick={this.focusTextInput} />
      </div>
    )
  }
}
export default CustomTextInput