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
    /**
     * 父组件在调用子组件的时候,会将方法传递过去,方法名自定义 anyFunctionName
     * 子组件可在自己的方法中使用
     * React: this.props.anyFunctionName();
     * Vue:   this.$emit('anyFunctionName');
     */

    // 方法,可调用父组件方法(emit) - 箭头函数_方法_works 🎃🎃🎃
    onChangeChild = (value) => {
        this.setState({checkedList:value})
        this.props.onChangeParent(value);
    }
    
    onCheckAllChange = (e) => {
        let checked = e.target.checked;
        if(checked){
            let all_items = [];
            repository.map((r) =>{
                all_items.push(r.value);
            })
            this.setState({checkedList:all_items})
            this.props.onChangeParent(all_items);
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