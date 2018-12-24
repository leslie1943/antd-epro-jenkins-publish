import React, { Component } from 'react';
import { Row, Col, Checkbox ,Form} from 'antd';
import { getGitToken ,getRepository} from '../../utils/gitMap';
const repository = getRepository();


export default class RepositoryOptions extends Component{
    /** 详细解释参加文档 Skill-Learn-Point.md **/
    // constructor(props){
    //     super(props);
    //     console.info(this.props) 
    // }
    render(){
        return(
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