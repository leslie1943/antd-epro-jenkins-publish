import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Form, Card, Modal, Button, message, Divider} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;


@Form.create()
class Job extends Component{
    constructor(props){
        super(props)
    }

    // get epro mall api json.
    getMallApiJson(){
        const {dispatch} = this.props;
        dispatch({
            type: 'jenkins/mall_api_json'
        })
    }
    buildMallWithParam(){
        const {dispatch} = this.props;
        dispatch({
            type: 'jenkins/build_mall_params'
        })
    }

    fetchMallConfig(){
        const {dispatch} = this.props;
        dispatch({
            type: 'jenkins/fetch_mall_config'
        })
    }

    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;

        return(
            <PageHeaderWrapper title="Jenkins jobs" content="">
                <Card bordered={false}>
                    <Form style={{marginTop: 8, textAlign: 'center'}}>
                        <Button type="primary" icon="ordered-list" onClick={()=>this.getMallApiJson()}>Get Epro Mall Api Json</Button>
                        <Divider></Divider>
                        <Button type="primary" icon="ordered-list" onClick={()=>this.buildMallWithParam()}>Build Mall with Parameters</Button>
                        <Divider></Divider>
                        <Button type="primary" icon="ordered-list" onClick={()=>this.fetchMallConfig()}>Fetch Mall Config</Button>
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
const _job = connect(mapStateToProps)(Job)

export default _job