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
// Class epro-user-svc
function UserItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-user-svc tag">{
            getFieldDecorator('user_svc_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-user-svc tag'}],
            })(<Input placeholder="清选择 epro-user-svc tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-certificate-svc
function CertificateItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-certificate-svc tag">{
            getFieldDecorator('certificate_svc_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-certificate-svc tag'}],
            })(<Input placeholder="清选择 epro-certificate-svc tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-dmcc-svc
function DmccItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-dmcc-svc tag">{
            getFieldDecorator('dmcc_svc_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-dmcc-svc tag'}],
            })(<Input placeholder="清选择 epro-dmcc-svc tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-mall
function MallItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-mall tag">{
            getFieldDecorator('mall_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-mall tag'}],
            })(<Input placeholder="清选择 epro-mall tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-gateway
function GatewayItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-gateway tag">{
            getFieldDecorator('gateway_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-gateway tag'}],
            })(<Input placeholder="清选择 epro-gateway tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-job
function JobItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-job tag">{
            getFieldDecorator('job_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-job tag'}],
            })(<Input placeholder="清选择 epro-job tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-message
function MessageItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-message tag">{
            getFieldDecorator('message_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-message tag'}],
            })(<Input placeholder="清选择 epro-message tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-op
function OpItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-op tag">{
            getFieldDecorator('op_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-op tag'}],
            })(<Input placeholder="清选择 epro-op tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-support
function SupportItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-support tag">{
            getFieldDecorator('support_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-support tag'}],
            })(<Input placeholder="清选择 epro-support tag" ></Input>)}
        </FormItem>
    )
}

// Class epro-utility
function UtilityItem(props){
    const { form: { getFieldDecorator}} = props.props;
    return (
        <FormItem {...layout.formItemLayout} label="epro-utility tag">{
            getFieldDecorator('utility_tag',{
                initialValue: '',
                rules: [{required: true, message: '清选择 epro-utility tag'}],
            })(<Input placeholder="清选择 epro-utility tag" ></Input>)}
        </FormItem>
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
        validateFields(['support_tag','message_tag','build_project'],(error, values) => {
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

        /**
         * 在这个class之前定义了全部的单体依赖class(以function形式)
         * 根据不同项目的依赖项,组合成不同的界面, 然后把结果嵌入在 return 结果内.
         * 
         * 😎😎😎 具有复杂逻辑的组件,可以在return之前先处理, 然后把处理结果以变量的形式嵌入在结果中.
         *          {complexLogicComponent}
         */
        let dynamicItems = null;
        switch(id){
            // epro-user-svc
            case "104":
                dynamicItems = (<div>
                    <SupportItem props={this.props}></SupportItem>
                    <MessageItem props={this.props}></MessageItem>
                </div>)
                break;
            // epro-certificate-svc
            case "103":
                dynamicItems = (<div>
                    <MessageItem props={this.props}></MessageItem>
                    <SupportItem props={this.props}></SupportItem>
                </div>)
                break;
            // epro-dmcc-svc
            case "116":
                dynamicItems = (<div>
                    <SupportItem props={this.props}></SupportItem>
                    <MessageItem props={this.props}></MessageItem>
                </div>)
                break;
            // epro-mall
            case "106":
                dynamicItems = (<div>
                    <UserItem props={this.props}></UserItem>
                    <CertificateItem props={this.props}></CertificateItem>
                    <DmccItem props={this.props}></DmccItem>
                    <UtilityItem props={this.props}></UtilityItem>
                    <MessageItem props={this.props}></MessageItem>
                    <SupportItem props={this.props}></SupportItem>
                </div>)
                break;
            // epro-gateway
            case "173":
                dynamicItems = (<div>
                    <DmccItem props={this.props}></DmccItem>
                    <SupportItem props={this.props}></SupportItem>
                    <UserItem props={this.props}></UserItem>
                    <CertificateItem props={this.props}></CertificateItem>
                    <MessageItem props={this.props}></MessageItem>
                    <UtilityItem props={this.props}></UtilityItem>
                </div>)
                break;
            // epro-job
            case "166":
                dynamicItems = (<div>
                    <UtilityItem props={this.props}></UtilityItem>
                    <UserItem props={this.props}></UserItem>
                    <CertificateItem props={this.props}></CertificateItem>
                    <DmccItem props={this.props}></DmccItem>
                    <SupportItem props={this.props}></SupportItem>
                    <MessageItem props={this.props}></MessageItem>
                </div>)
                break;
            // epro-message
            case "113":
                dynamicItems = <SupportItem props={this.props}></SupportItem>
                break;
            // epro-op
            case "117":
                dynamicItems = (<div>
                    <UserItem props={this.props}></UserItem>
                    <CertificateItem props={this.props}></CertificateItem>
                    <DmccItem props={this.props}></DmccItem>
                    <SupportItem props={this.props}></SupportItem>
                </div>)
                break;
            // epro-support
            case "207":
                dynamicItems = (<div></div>);
                break;
            // epro-utility
            case "211":
                dynamicItems = <SupportItem props={this.props}></SupportItem>
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