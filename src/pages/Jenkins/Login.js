import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Form, Card, Modal, Button, message} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;


@Form.create()
class JenkinsLogin extends Component{
    constructor(props){
        super(props)
    }

    getMallWebConfig(){
        const {dispatch} = this.props;
        dispatch({
            type: 'jenkins/mall_web_config'
        })
    }
    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;

        return(
            <PageHeaderWrapper title="Jenkins login" content="">
                <Card bordered={false}>
                    <Form style={{marginTop: 8}}>
                        <Button onClick={()=>this.getMallWebConfig()}>Get Mall Web Config</Button>
                     </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    return {
        // tags: state.jenkins.tags
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _jenkinsLogin = connect(mapStateToProps)(JenkinsLogin)

export default _jenkinsLogin