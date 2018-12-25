import React, { Component } from 'react';
import { Row, Col, Checkbox ,Form} from 'antd';
import { getGitToken ,getRepository} from '../../utils/gitMap';
const repository = getRepository();
export default class RepositoryOptions extends Component{
    constructor(props){
        super(props)
        console.info(this.props);
    }
    // 方法,可调用父组件方法(emit)
    onChangeChild = (value) => {
        this.props.onChangeParent(value);
    }

    render(){
        return(
            <Checkbox.Group style={{ width: '100%' }} onChange={(value)=>this.onChangeChild(value)}>
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