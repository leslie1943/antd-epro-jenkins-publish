import React, { Component } from 'react';
import { Input} from 'antd';

import moment from 'moment';
import PropTypes from 'prop-types';


export default class Clock extends Component{
    constructor(props){
        // super(props);
        super(props)
        console.info(this.props); // {clockColor: "orange"}

        // 🌈构造函数是唯一能初始化 state 的地方.
        this.state = {date: new Date(),name:"",band:""};
        

        // 不能在 function OneClass(){} 定义的函数式组件使用ref.
        this.formRef = React.createRef();
        this.nameRef = React.createRef();
        this.bandRef = React.createRef();
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

    // 🍭🍭🍭🍭🍭🍭 Working_1
    inputChangeFunction(event){
        console.info('Name changing...');
        this.setState({name: event.target.value});
        let refName = this.nameRef.current;
        console.info(refName.props);
    }

    // 🍭🍭🍭🍭🍭🍭 Working_2
    inputChangeArrow = (event) => {
        console.info('Band changing...');
        this.setState({band: event.target.value});
        let refBand = this.bandRef.current;
        console.info(refBand.props);
    }

    tick(){
        let ref = this.formRef.current;
        // console.info(ref['baseURI']);
        this.setState({date:new Date()})
    }
    render(){
        return(
            <div ref={this.formRef} style={{textAlign:'center', marginBottom:'10px', color: this.props.clockColor}}>
                <strong>{moment(this.state.date).format("YYYY-MM-DD HH:mm:ss")} </strong>

                {/* inputChange = (event) => {} 🍭🍭🍭🍭🍭🍭 Working_1 参数[e] 必须 */}
                {/* <Input value={this.state.name} onChange={(e)=>this.inputChangeFunction(e)} ref={this.nameRef}></Input> */}
                
                {/* inputChange = (event) => {} 🍭🍭🍭🍭🍭🍭 Working_2 */}
                {/* <Input value={this.state.band} onChange={this.inputChangeArrow} ref={this.bandRef}></Input> */}
            </div>
        )
    }
}

Clock.propTypes = {
    clockColor: PropTypes.string,
}