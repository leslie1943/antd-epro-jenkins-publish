import React, { Component } from 'react';
import styles from './BasicPublish.css';
import { connect } from 'dva';
import {Form, Card, Icon, DatePicker, TimePicker, Input, Spin,List,Collapse, Select, Popover, Button,Checkbox,message,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getGitMap, getGitToken,getRepository } from '../../utils/gitMap';
const gitMap = getGitMap();
const repository = getRepository();
const tokens = getGitToken();

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
const Panel = Collapse.Panel;


const fieldLabels = {
    mrType: "Merge 类型",
    mr_privateKey: '提交Merge request私钥',
    mr_originBranch: '原分支',
    mr_targetBranch: '目标分支',
    mr_title: '标题',
    mr_description: '描述',
  };

  const acceptLabels = {
    accept_privateKey: '接收Merge request私钥',
  }

  const tagLabels = {
    tag_privateKey: 'Tag私钥',
    tag_Branch: 'Tag分支',
    tag_Name: 'Tag名称',
    tag_repository: 'Tag项目',
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
    
    // 提交merge request的校验
    validate = () => {
        const {form: { validateFieldsAndScroll,validateFields },dispatch,} = this.props;
        validateFields(['mr_privateKey','mr_originBranch','mr_targetBranch','mr_title','mr_description'],(error, values) => {
            // validateFieldsAndScroll: 校验所有当前页面所有的字段
            // validateFields: 校验指定的Fields
            // validateFieldsAndScroll((error, values) => {
          if (!error) {
              if(values.mr_originBranch === values.mr_targetBranch){
                message.error('Can not be same branch!!!');
              }else{
                dispatch({
                    type: 'publish/sendMR',
                    payload: values,
                });
            }
          }
        });
    };

    // 接收一个merge request
    acceptOne(id,iid){
        message.success(id + "-" + iid);
        const {dispatch} = this.props;
        dispatch({
            type: 'publish/acceptOne',
            payload: {id:id,iid:iid},
        });
    }
    // 接收全部merge request
    acceptAll(){
        const {dispatch} = this.props;
        dispatch({
            type: 'publish/acceptAll',
        });
    }
    // componentDidMount(){}
    
    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        // from mapStateToProps
        const mrResult = this.props.mrResult;
        const sendLoading = this.props.sendLoading;

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
                        <Card bordered={false} >
                        <Spin spinning={sendLoading} tip="Merge requests are submitting...">
                            <Form style={{marginTop: 8}}  >
                                {/* ---------------- 私钥  ---------------- */}
                                <FormItem {...formItemLayout} label={fieldLabels.mr_privateKey}>{
                                    getFieldDecorator('mr_privateKey',{
                                        initialValue: 'K4Qoz7woxAYZ4v6NKyZ9',
                                        rules: [{required: true, message: '清选择Token'}]
                                    })(<Select placeholder="清选择Token" >
                                        {tokens.map(item => <Option key={item.index} value={item.val}>{item.text + '-' + item.val}</Option>)}
                                        </Select>)
                                }</FormItem>

                                {/* ---------------- Gitlab项目  ---------------- */}
                                <FormItem {...formItemLayout} label='Gitlab项目'>
                                    <Collapse >
                                        <Panel header="点击查将要提交Merge request的Git项目列表" key="10">
                                            <List size="small"
                                            // bordered
                                            dataSource={types}
                                            renderItem={item => (<List.Item>{item.desc}</List.Item>)}/>
                                        </Panel>
                                    </Collapse>
                                </FormItem>

                                {/* ---------------- 原分支  ---------------- */}
                                <FormItem {...formItemLayout} label={fieldLabels.mr_originBranch}>{
                                    getFieldDecorator('mr_originBranch',{
                                        initialValue: 'develop',
                                        rules: [{required: true, message: '清选择原分支'}]
                                    })(<Select placeholder="清选择原分支" >
                                    <Option value="develop">develop</Option>
                                    <Option value="master">master</Option>
                                </Select>)
                                }</FormItem>
                                {/* ---------------- 目标分支 ---------------- */}
                                <FormItem {...formItemLayout} label={fieldLabels.mr_targetBranch}>{
                                    getFieldDecorator('mr_targetBranch',{
                                        initialValue: 'master',
                                        rules: [{required: true, message: '清选择目标分支'}]
                                    })(<Select placeholder="清选择目标分支" >
                                    <Option value="develop">develop</Option>
                                    <Option value="master">master</Option>
                                </Select>)
                                }</FormItem>

                                {/* ---------------- 标题 ---------------- */}
                                <FormItem {...formItemLayout} label={fieldLabels.mr_title}>{
                                    getFieldDecorator('mr_title',{
                                        initialValue: '测试代码-请勿合并！！！',
                                        rules: [{required: true, message: '请输入标题'}]
                                    })(<Input placeholder="请输入Merge request标题" ></Input>)
                                }</FormItem>

                                {/* ---------------- 描述 ---------------- */}
                                <FormItem {...formItemLayout} label={fieldLabels.mr_description}>{
                                    getFieldDecorator('mr_description',{
                                        initialValue: '测试代码-请勿合并！！！',
                                        rules: [{required: true, message: '请输入描述'}]
                                    })(<TextArea placeholder="请输入Merge request描述" ></TextArea>)
                                }</FormItem>

                                {/*  */}
                                <FormItem {...submitFormLayout} style={{ marginTop: 10 }}>
                                    <Button type="primary" onClick={()=>this.validate()}>提交Merge request</Button>      
                                </FormItem>
                            </Form>
                         </Spin>
                    </Card>
                </Panel>
                
                {/* ####################### Panel_Step 2 ###################################### */}
                <Panel header="Step 2: 接收 Merge Request" key="2">
                    <Card bordered={false}>
                        <Form style={{marginTop: 8}}>
                        {/* ---------------- 接收Merge request私钥  ---------------- */}
                            <FormItem {...formItemLayout} label={acceptLabels.accept_privateKey}>{
                                getFieldDecorator('accept_privateKey',{
                                    initialValue: '',
                                    rules: [{required: true, message: '清选择Token'}]
                                })(<Select placeholder="清选择Token" >
                                    {tokens.map(item => <Option key={item.index} value={item.val}>{item.text + '-' + item.val}</Option>)}
                                    </Select>)
                                }
                            </FormItem>
                            {/* 待接收的Merge requests */}
                            <List
                                grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,}}
                                dataSource={mrResult}
                                renderItem={item => (
                                <List.Item>
                                    <Card title={item.iid}extra={<a onClick={()=>this.acceptOne(item.project_id,item.iid)} href="#">Accept</a>}>
                                        <strong><span style={{color:'green'}}>{gitMap[item.project_id]}</span></strong>
                                    </Card>
                                </List.Item>
                                )}
                            />
                            {/* 接收全部Merge request */}
                            <FormItem {...submitFormLayout} style={{ marginTop: 10 }}>
                                <Button type="primary" onClick={() => this.acceptAll()}>接收全部Merge request</Button>
                            </FormItem>
                        </Form>
                        </Card>
                </Panel>

                {/* ####################### Panel_Step 3 ###################################### */}
                <Panel header="Step 3: 创建 Tag" key="3">
                    <Card bordered={false}>
                        <Form style={{marginTop: 8}}>
                            {/* ---------------- 私钥  ---------------- */}
                            <FormItem {...formItemLayout} label={tagLabels.tag_privateKey}>{
                                getFieldDecorator('tag_privateKey',{
                                    initialValue: 'K4Qoz7woxAYZ4v6NKyZ9',
                                    rules: [{required: true, message: '请输入Tag私钥'}]
                                })(<Select placeholder="清选择Token" >
                                {tokens.map(item => <Option key={item.index} value={item.val}>{item.text + '-' + item.val}</Option>)}
                                </Select>)
                            }</FormItem>

                            {/* ---------------- 项目 ---------------- */}
                            <FormItem {...formItemLayout} label={tagLabels.tag_repository}>{
                                getFieldDecorator('tag_repository',{
                                    rules:  [{required: true, message: '请选择Tag项目'}]
                                })(<Select placeholder="请选择Tag项目" >
                                {repository.map(item => <Option key={item.id} value={item.id}>{item.desc}</Option>)}
                                </Select>)
                            }                               
                            </FormItem>

                            {/* ---------------- Tag 分支 ---------------- */}
                            <FormItem {...formItemLayout} label={tagLabels.tag_Branch}>{
                                getFieldDecorator('tag_Branch',{
                                    initialValue: 'master',
                                    rules: [{required: true, message: '请选中Tag分支'}]
                                })(<Select placeholder="请选择tag分支">
                                <Option value="master">master</Option>
                                </Select>)
                            }</FormItem>

                            {/* ---------------- Tag 名称 ---------------- */}
                            <FormItem {...formItemLayout} label={tagLabels.tag_Name}>{
                                getFieldDecorator('tag_Name',{
                                    rules: [{required: true, message: '请输入Tag名称'}]
                                })(<Input placeholder='请输入Tag名称' ></Input>)
                            }</FormItem>

                            
                            
                            {/* ---------------- 创建 Tag  ---------------- */}
                            <FormItem {...submitFormLayout} style={{ marginTop: 10 }}>
                                <Button type="primary" onClick={() => validateNewTag()}>创建Tag</Button>
                            </FormItem>
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
        mrResult: state.publish.mrResult,
        sendLoading: state.publish.sendLoading,
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _basicPublish = connect(mapStateToProps)(BasicPublish)

export default _basicPublish