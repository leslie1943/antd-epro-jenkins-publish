import React, { Component } from 'react';
import { Row, Col, Checkbox ,Form} from 'antd';
import { getGitToken ,getRepository} from '../../utils/gitMap';
const repository = getRepository();


export default class RepositoryOptions extends Component{
    /**
     * 详细解释参加文档 Skill-Learn-Point.md
        constructor(props){
            super(props);
            console.info(this.props) // 如果没有前一行的 super(props), 这句调用会出错
        }
    */
   constructor(props){
       console.info('RepositoryOptions starts loads');
        super(props);
        console.info(this.props) 
        // 👇👇👇👇👇👇👇👇
        // this.props => {value: undefined, id: "mr_repos", onChange: ƒ, data-__meta: {…}, data-__field: {…}}
        // 是因为 父组件在引用此组件时的范围如下 👇👇👇👇👇👇
        /**
             <Form.Item {...layout.formItemLayout} label="Gitlab项目">{
                getFieldDecorator('mr_repos',{
                    rules:[{required:true,message: '请选择仓库'}]
                    })(<RepositoryOptions/>)
                }
            </Form.Item>
         */
    }
    render(){
        // 🍭🍭🍭🍭 变量模式定义 🍭🍭🍭🍭
        // const R_Columns = this.props.options.map((col) => 
        //     <Col span={8} key={col.value}>
        //         <Checkbox  value={col.value}>{col.label}</Checkbox>
        //     </Col>
        // );
          return(
            // 🍭🍭🍭🍭 变量模式输出 🍭🍭🍭🍭
            // <Row>{R_Columns}</Row>
            <Checkbox.Group style={{ width: '100%' }}>
                <Row>{
                    // STEP_1: 如果父组件调用方式 【<RepositoryOptions options={repository}></RepositoryOptions>】
                    // STEP_2: 可以使用 【this.props.options.map((col) => 】 来输出结果
                    repository.map((col) =>
                    <Col span={8} key={col.value}>
                        <Checkbox value={col.value}>{col.label}</Checkbox>
                    </Col>)
                }</Row>
            </Checkbox.Group>
          )
      }
  }

/**  --------------------------------------------------- function 模式
  function RepositoryOptions(props){
    const R_Columns = props.options.map((col) => 
        <Col span={8} key={col.value}>
            <Checkbox  value={col.value}>{col.label}</Checkbox>
        </Col>
    );
    return(
        <Row>{R_Columns}</Row>
    );
  }
--------------------------------------------------- */

/** --------------------------------------------------- class 模式
  class RepositoryOptions extends Component{
    
    // 详细解释参加文档 Skill-Learn-Point.md
    // constructor(props){
    //     super(props);
    //}
    
    render(){
        console.info(this.props);
        // 🍭🍭🍭🍭 变量模式定义 🍭🍭🍭🍭
        // const R_Columns = this.props.options.map((col) => 
        //     <Col span={8} key={col.value}>
        //         <Checkbox  value={col.value}>{col.label}</Checkbox>
        //     </Col>
        // );
          return(
            // 🍭🍭🍭🍭 变量模式输出 🍭🍭🍭🍭
            // <Row>{R_Columns}</Row>
            <Row>{
                this.props.options.map((col) =>
                <Col span={8} key={col.value}>
                <Checkbox value={col.value}>{col.label}</Checkbox>
                </Col>)
            }</Row>
          )
      }
  }
  --------------------------------------------------- */