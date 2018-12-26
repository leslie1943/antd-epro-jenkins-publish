import React, { Component } from 'react';
import moment from 'moment';

export default class Clock extends Component{
    constructor(props){
        // super(props);
        super()

        // 🌈构造函数是唯一能初始化 state 的地方.
        this.state = {date: new Date()}
    }
    // 挂载
    componentDidMount(){
        // 🌈如果需要存储不用于视觉输出的东西,可以手动向类中(this)添加其他字段: this.timeID.
        // 🌈如果不在 render() 中使用某些东西, 它就不应该在状态中 (state)
        this.timeID = setInterval(() => this.tick(), 1000);
    }
    // 卸载
    componentWillUnmount(){
        clearInterval(this.timeID);
    }

    tick(){
        this.setState({date:new Date()})
    }
    render(){
        return(
            <div style={{textAlign:'center',marginBottom:'10px'}}>
                <strong>{moment(this.state.date).format("YYYY-MM-DD HH:mm:ss")} </strong>
            </div>
        )
    }
}