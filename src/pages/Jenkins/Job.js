import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Form, Card, Modal, Button, message, Divider,Tooltip} from 'antd';
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
        Modal.confirm({
            title: '构建 Mall 项目',
            content: '请确认你的操作?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => dispatch({
                type: 'jenkins/build_mall_params',
                payload: values,
            })
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
        const mall_json = this.props.mall_json;

        return(
            <PageHeaderWrapper title="Jenkins jobs" content="">
                <Card bordered={false}>
                    <Form style={{marginTop: 8, textAlign: 'center'}}>
                        {mall_json.name}
                        <Divider></Divider>
                        <Button type="primary" icon="eye" onClick={()=>this.getMallApiJson()}>Get Epro Mall Api Json</Button>
                        <Divider></Divider>
                        <Button type="primary" icon="build" onClick={()=>this.buildMallWithParam()}>Build Epro Mall with Parameters</Button>
                        <Divider></Divider>
                        <Tooltip placement="right" arrowPointAtCenter title="API: /job/project_name/config.xml => Access Denied - 没有任务/ExtendedRead权限">
                            <Button disabled type="primary" icon="ordered-list" onClick={()=>this.fetchMallConfig()}>Fetch Mall Config</Button>
                        </Tooltip>
                     </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    return {
        mall_json: state.jenkins.mall_json
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _job = connect(mapStateToProps)(Job)

export default _job