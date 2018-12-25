import React, { Component } from 'react';
import { connect } from 'dva';

import {Form, Card, Modal, Button, message, Divider,Tooltip,Select,Input} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import layout from "@/utils/layout";
const FormItem = Form.Item;
const { Option } = Select;

const repository = [
    { value: 104, label: 'epro-user-svc' },
    { value: 103, label: 'epro-certificate-svc' },
    { value: 116, label: 'epro-dmcc-svc' },
    { value: 106, label: 'epro-mall' },
    { value: 173, label: 'epro-gateway' },
    { value: 166, label: 'epro-job' },
    { value: 113, label: 'epro-message' },
    { value: 117, label: 'epro-op' },
    { value: 207, label: 'epro-support' },
    { value: 211, label: 'utility-epro' },
  ];

function EproUserSVC(props){
    const { form: { getFieldDecorator}} = props.props
    return (
        <div>
            <FormItem  {...layout.formItemLayout} label="Support tag">{
                getFieldDecorator('usersvc_support',{
                    initialValue: '',
                    rules: [{required: true, message: '清选择Support tag'}],
                })(<Input placeholder="Support tag" >
                </Input>)}
            </FormItem>

            <FormItem  {...layout.formItemLayout} label="Message tag">{
                getFieldDecorator('usersvc_message',{
                    initialValue: '',
                    rules: [{required: true, message: '清选择Message tag'}],
                })(<Input placeholder="Message tag" >
                </Input>)}
            </FormItem>
        </div>
    )
}
function EproCertificateSVC(props){
    const { form: { getFieldDecorator}} = props.props
    return (
        <div>
            <FormItem  {...layout.formItemLayout} label="Message tag">{
                getFieldDecorator('usersvc_message',{
                    initialValue: '',
                    rules: [{required: true, message: '清选择Message tag'}],
                })(<Input placeholder="Message tag" >
                </Input>)}
            </FormItem>

            <FormItem  {...layout.formItemLayout} label="Support tag">{
                getFieldDecorator('usersvc_support',{
                    initialValue: '',
                    rules: [{required: true, message: '清选择Support tag'}],
                })(<Input placeholder="Support tag" >
                </Input>)}
            </FormItem>
        </div>
    )
}
function EproDmccSVC(){
    return (
        <h1>EproDmccSVC</h1>
    )
}
function EproMall(){
    return (
        <h1>EproMall</h1>
    )
}
function EproGateway(){
    return (
        <h1>EproGateway</h1>
    )
}
function EproJob(){
    return (
        <h1>EproJob</h1>
    )
}
function EproMessage(){
    return (
        <h1>EproMessage</h1>
    )
}
function EproOP(){
    return (
        <h1>EproOP</h1>
    )
}
function EproSupport(){
    return (
        <h1>EproSupport</h1>
    )
}
function UtilityEpro(){
    return (
        <h1>UtilityEpro</h1>
    )
}

// Class Dynamic item
function DynamicItems(props){
    console.info(props);
    return (
        <h1>Hello YO</h1>
    )
}

@Form.create()
class Job extends Component{
    constructor(props){
        super(props)
        this.state = {id : ''}
    }

    // get epro mall api json.
    getMallApiJson(){
        const {dispatch} = this.props;
        dispatch({
            type: 'jenkins/mall_api_json'
        })
    }
    buildMallWithParam(){
        const { form: { getFieldDecorator ,validateFields, getFieldValue},dispatch} = this.props;
        // TODO: need a validate mapping:
        validateFields(['usersvc_support','usersvc_message','build_project'],(error, values) => {
            console.info(values);
            if(!error){
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
        })
        
    }

    fetchMallConfig(){
        const {dispatch} = this.props;
        dispatch({
            type: 'jenkins/fetch_mall_config'
        })
    }

    projectChange = (value) =>{
         this.setState({id: value});
    }
    
    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        const mall_json = this.props.mall_json;
        const id = this.state.id + '';


        let dynamicItems = null;
        switch(id){
            case "104":
                dynamicItems = <EproUserSVC props={this.props}></EproUserSVC>;
                break;
            case "103":
                dynamicItems = <EproCertificateSVC props={this.props}></EproCertificateSVC>;
                break;
            case "116":
                dynamicItems = <EproDmccSVC></EproDmccSVC>;
                break;
            case "106":
                dynamicItems = <EproMall></EproMall>;
                break;
            case "173":
                dynamicItems = <EproGateway></EproGateway>;
                break;
            case "166":
                dynamicItems = <EproJob></EproJob>;
                break;
            case "113":
                dynamicItems = <EproMessage></EproMessage>;
                break;
            case "117":
                dynamicItems = <EproOP></EproOP>;
                break;
            case "207":
                dynamicItems = <EproSupport></EproSupport>;
                break;
            case "211":
                dynamicItems = <UtilityEpro></UtilityEpro>;
                break;
        }


        return(
            <PageHeaderWrapper title="Jenkins jobs" content="">
                <Card bordered={false}>
                    <Form style={{marginTop: 8}}>
                        {/*  DO NOT DELETE BELOW CODES 👇👇👇👇👇👇 */}
                        {/* <Button type="primary" icon="eye" onClick={()=>this.getMallApiJson()}>Get Epro Mall Api Json</Button>
                        <Divider></Divider>
                        {JSON.stringify(mall_json)}
                        <Divider></Divider> */}

                        <FormItem  {...layout.formItemLayout} label="Build项目">{
                            getFieldDecorator('build_project',{
                                initialValue: '',
                                rules: [{required: true, message: '清选择Build项目'}],
                            })(<Select placeholder="全部项目" onChange={this.projectChange}>
                            {repository.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                        </Select>)
                        }</FormItem>


                        {/* 动态加载不同项目的依赖项 */}
                        {dynamicItems}
                        
                        {/* <DynamicItems id={this.state.id}></DynamicItems> */}
                        <FormItem  style={{textAlign:'center'}}>
                            <Button  type="primary" icon="build" onClick={()=>this.buildMallWithParam()}>Build with Parameters</Button>
                        </FormItem>

                        {/* DO NOT DELETE BELOW CODES 👇👇👇👇👇👇 */}
                        {/* <Tooltip placement="right" arrowPointAtCenter title="API: /job/project_name/config.xml => Access Denied - 没有任务/ExtendedRead权限">
                            <Button disabled type="primary" icon="ordered-list" onClick={()=>this.fetchMallConfig()}>Fetch Mall Config</Button>
                        </Tooltip> */}
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