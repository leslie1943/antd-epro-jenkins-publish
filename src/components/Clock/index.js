import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';


export default class Clock extends Component{
    constructor(props){
        // super(props);
        super(props)
        console.info(this.props); // {clockColor: "orange"}

        // 🌈构造函数是唯一能初始化 state 的地方.
        this.state = {date: new Date()};

        // 不能在 function OneClass(){} 定义的函数式组件使用ref.
        this.formRef = React.createRef();
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
        let ref = this.formRef.current
        // console.info(ref['baseURI']);
        // console.info(ref['baseURI']);
        this.setState({date:new Date()})
    }
    render(){
        return(
            <div ref={this.formRef} style={{textAlign:'center', marginBottom:'10px', color: this.props.clockColor}}>
                <strong>{moment(this.state.date).format("YYYY-MM-DD HH:mm:ss")} </strong>
            </div>
        )
    }
}

Clock.propTypes = {
    clockColor: PropTypes.string,
}