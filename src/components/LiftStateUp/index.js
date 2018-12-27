import React, { Component } from 'react';
import { Input} from 'antd';

/**
 * How to understand 状态提升
 * 状态提升: https://react.docschina.org/docs/lifting-state-up.html
 * react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理.
 * 
 * 将多个组件需要共享的状态提升到它们最近的父组件上,在父组件上改变这个状态后通过props分发给子组件.
 */

 /** 
  * 可以在其他文件使用一下代码查看示例.
  * import LiftStateUp from '@/components/LiftStateUp/index';
  * <LiftStateUp/>
  */

class DoubledKill extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h3>子组件-double value: {this.props.value * 2}</h3>
            </div>
        ) 
    }
}

class TripleKill extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h3>子组件-triple value: {this.props.value * 3}</h3>
            </div>
        ) 
    }
}

class LiftStateUp extends Component{
    constructor(){
        super();
        this.state = {parentValue : 1}
    }
    // change event
    handleChange(e) {
        this.setState({
            parentValue:e.target.value
        });
    }
    render(){
        return(
            <div style={{width:"30%"}}>
               <Input placeholder="父组件输入数字" value={this.state.parentValue} onChange={(e) => this.handleChange(e)}></Input>
               <DoubledKill value={this.state.parentValue}></DoubledKill>
               <TripleKill value={this.state.parentValue}></TripleKill>
            </div>
        ) 
    }
}

export default LiftStateUp;