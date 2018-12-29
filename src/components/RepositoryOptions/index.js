import React, { Component } from 'react';
import { Row, Col, Checkbox ,Form} from 'antd';
import { getGitToken ,getRepository} from '../../utils/gitMap';
const repository = getRepository();
export default class RepositoryOptions extends Component{
    constructor(props){
        super(props)
        // console.info(this.props);
    }
    
    // 方法,可调用父组件方法(emit) - 声明式_方法_works 🌼🌼🌼
    // onChangeChild(val){
    //     console.info(val);
    //     this.props.onChangeParent(val);
    // }

    // 方法,可调用父组件方法(emit) - 箭头函数_方法_works 🎃🎃🎃
    onChangeChild = (value) => {
        this.props.onChangeParent(value);
    }

    render(){
        return(
            // <Checkbox.Group style={{ width: '100%' }} onChange={(value)=>this.onChangeChild(value)}> 声明式_方法_works 🌼🌼🌼
            // 箭头函数_方法_works 🎃🎃🎃
            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeChild}> 
                <Row>{
                    repository.map((col) =>
                    <Col span={8} key={col.value}>
                        <Checkbox value={col.value}>{col.label}</Checkbox>
                    </Col>)
                }</Row>
            </Checkbox.Group>
          )
      }
  }