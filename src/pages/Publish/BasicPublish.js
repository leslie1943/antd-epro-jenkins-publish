import React, { Component } from 'react';
import styles from './BasicPublish.css';
import { connect } from 'dva';
import {Form, Card, Icon, DatePicker, TimePicker, Input, List,Collapse, Select, Popover, Button,Checkbox,message,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getGitMap} from '../../utils/gitMap';
const gitMap = getGitMap();

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
const Panel = Collapse.Panel;


const fieldLabels = {
    mrType: "Merge 类型",
    privateKey: '私钥',
    originBranch: '原分支',
    targetBranch: '目标分支',
    tagBranch: 'Tag分支',
    tagName: 'Tag名称',
    title: '标题',
    description: '描述',
  };

const types = [
    { id: 106, desc: 'epro-mall' },
    { id: 116, desc: 'epro-dmcc-svc' },
    { id: 104, desc: 'epro-user-svc' },
    { id: 103, desc: 'epro-certificate-svc' },
    { id: 173, desc: 'epro-gateway' },
    { id: 166, desc: 'epro-job' },
    { id: 207, desc: 'epro-flyway' },
    { id: 113, desc: 'epro-message' },
    { id: 211, desc: 'utility-epro' },
    { id: 107, desc: 'epro-mall-web' },
];


@Form.create()
class BasicPublish extends Component{
    constructor(props){
        super(props)
    }
    accept(iid){
        message.success(iid);
    }
    // 校验
    validate = () => {
        const {form: { validateFieldsAndScroll },dispatch,} = this.props;
        validateFieldsAndScroll((error, values) => {
          if (!error) {
            // console.info(values);
            dispatch({
              type: 'publish/send',
              payload: values,
            });
          }
        });
    };

    componentDidMount(){}
    render(){
        // console.info(this.props);
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        // from mapStateToProps
        const serviceResult = this.props.result;
        // console.info(serviceResult);

        // Item 布局
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
              md: { span: 10 },
            },
          };

          // 提交布局
          const submitFormLayout = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 10, offset: 7 },
            },
          };
        return(
            <PageHeaderWrapper title="易普网发版" content="">
                <Collapse>
                {/* ####################### Panel_Step 1 ###################################### */}
                    <Panel header="Step 1: 提交 Merge Request" key="1">
                        <Card bordered={false}>
                            <Form style={{marginTop: 8}}>
                            {/* ---------------- 私钥  ---------------- */}
                            <FormItem {...formItemLayout} label={fieldLabels.privateKey}>{
                                getFieldDecorator('privateKey',{
                                    initialValue: 'K4Qoz7woxAYZ4v6NKyZ9',
                                    rules: [{required: true, message: '请输入私钥'}]
                                })(<TextArea placeholder='请输入私钥' ></TextArea>)
                            }</FormItem>

                            {/* ---------------- 选择类型  ---------------- */}
                            {/* <FormItem {...formItemLayout} label={fieldLabels.mrType}>{
                                getFieldDecorator('mrType',{
                                    rules: [{required: true, message: '请输入私钥'}]
                                })(<Select placeholder="清选择类型" >
                                {types.map(item => <Option key={item.id} value={item.id}>{item.desc}</Option>)}
                            </Select>)
                            }</FormItem> */}

                            <FormItem {...formItemLayout} label='Gitlab项目'>
                                <Collapse >
                                    <Panel header="点击查看Git项目列表" key="10">
                                        <List size="small"
                                        // bordered
                                        dataSource={types}
                                        // renderItem={item => (<List.Item>{item.desc.toUpperCase()}</List.Item>)}/>
                                        renderItem={item => (<List.Item>{item.desc}</List.Item>)}/>
                                    </Panel>
                                </Collapse>
                            </FormItem>

                            {/* ---------------- 原分支  ---------------- */}
                            <FormItem {...formItemLayout} label={fieldLabels.originBranch}>{
                                getFieldDecorator('originBranch',{
                                    rules: [{required: true, message: '清选择原分支'}]
                                })(<Select placeholder="清选择原分支" >
                                <Option value="develop">develop</Option>
                                <Option value="master">master</Option>
                            </Select>)
                            }</FormItem>
                            {/* ---------------- 目标分支 ---------------- */}
                            <FormItem {...formItemLayout} label={fieldLabels.targetBranch}>{
                                getFieldDecorator('targetBranch',{
                                    rules: [{required: true, message: '清选择目标分支'}]
                                })(<Select placeholder="清选择目标分支" >
                                <Option value="develop">develop</Option>
                                <Option value="master">master</Option>
                            </Select>)
                            }</FormItem>

                            {/* ---------------- 标题 ---------------- */}
                            <FormItem {...formItemLayout} label={fieldLabels.title}>{
                                getFieldDecorator('title',{
                                    rules: [{required: true, message: '请输入标题'}]
                                })(<Input placeholder="请输入Merge request标题" ></Input>)
                            }</FormItem>

                            {/* ---------------- 描述 ---------------- */}
                            <FormItem {...formItemLayout} label={fieldLabels.description}>{
                                getFieldDecorator('description',{
                                    rules: [{required: true, message: '请输入描述'}]
                                })(<TextArea placeholder="请输入Merge request描述" ></TextArea>)
                            }</FormItem>

                            {/*  */}
                            <FormItem {...submitFormLayout} style={{ marginTop: 10 }}>
                                <Button type="primary" onClick={this.validate}>提交MR</Button>      
                             </FormItem>
                         </Form>
                    </Card>
                </Panel>
                {/* ####################### Panel_Step 2 ###################################### */}
                <Panel header="Step 2: 接收 Merge Request" key="2">
                    <Card bordered={false}>
                        {/* <ul>
                            {serviceResult.map(function(item){
                                return(
                                    <li key={item.id}>{item.project_id}</li>
                                )
                            })}
                        </ul> */}
                        <List
                            grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,}}
                            dataSource={serviceResult}
                            renderItem={item => (
                            <List.Item>
                                <Card title={item.iid}extra={<a onClick={this.accept(item.iid)} href="#">Accept</a>}>
                                    <strong><span style={{color:'green'}}>{gitMap[item.project_id]}</span></strong>
                                </Card>
                            </List.Item>
                            )}
                        />
                    </Card>
                </Panel>

                {/* ####################### Panel_Step 3 ###################################### */}
                <Panel header="Step 3: 创建 Tag" key="3">
                    <Card bordered={false}>
                        <Form style={{marginTop: 8}}>
                        </Form>
                    </Card>
                </Panel>

            </Collapse>
               
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    // console.info(state.publish.result);
    return {
        result: state.publish.result
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _basicPublish = connect(mapStateToProps)(BasicPublish)

export default _basicPublish