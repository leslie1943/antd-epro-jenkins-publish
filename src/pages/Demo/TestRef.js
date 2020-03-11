import React from 'react';
import CustomTextInput from './CustomTextInput'

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.parentRef = React.createRef()
  }

  componentDidMount() {
    this.parentRef.current.focusTextInput()
  }

  render() {
    return (
      <CustomTextInput ref={this.parentRef} />
    )
  }

}
export default AutoFocusTextInput