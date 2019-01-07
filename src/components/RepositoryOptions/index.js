import React, { Component } from 'react';
import { Row, Col, Checkbox ,Form} from 'antd';
import { getGitToken ,getRepository} from '../../utils/gitMap';
const repository = getRepository();
export default class RepositoryOptions extends Component{
    constructor(props){
        super(props)
        // console.info(this.props);
        this.state = {
            checkedList: [],
        }
    }
    
    // 方法,可调用父组件方法(emit) - 声明式_方法_works 🌼🌼🌼
    // onChangeChild(val){
    //     console.info(val);
    //     this.props.onChangeParent(val);
    // }

    // 方法,可调用父组件方法(emit) - 箭头函数_方法_works 🎃🎃🎃
    onChangeChild = (value) => {
        this.setState({checkedList:value})
        this.props.onChangeParent(value);
    }
    
    onCheckAllChange = (e) => {
        let checked = e.target.checked;
        if(checked){
            let all = [];
            repository.map((r) =>{
                all.push(r.value);
            })
            this.setState({checkedList:all})
            this.props.onChangeParent(all);
        }else{
            this.setState({checkedList:[]})
            this.props.onChangeParent([]);
        }
    }

    render(){
        return(
            // <Checkbox.Group style={{ width: '100%' }} onChange={(value)=>this.onChangeChild(value)}> 声明式_方法_works 🌼🌼🌼
            // 箭头函数_方法_works 🎃🎃🎃
            <div>
                <Checkbox onChange={this.onCheckAllChange}>Check all</Checkbox>
                <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeChild} value={this.state.checkedList}> 
                    <Row>{
                        repository.map((col) =>
                        <Col span={8} key={col.value}>
                            <Checkbox value={col.value}>{col.label}</Checkbox>
                        </Col>)
                    }</Row>
                </Checkbox.Group>
            </div>
          )
      }
  }