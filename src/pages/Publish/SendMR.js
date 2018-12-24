import React, { Component } from 'react';
import { connect } from 'dva';
import {Form, Card, Input, Spin,List,Collapse, Select, Checkbox, Modal, Button,message,Row,Col} from 'antd';
const CheckboxGroup = Checkbox.Group;
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getGitToken ,getRepository} from '../../utils/gitMap';
import layout from "@/utils/layout";

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

//  ----------------- function 模式
//   function RepositoryColumns(props){
//     const R_Columns = props.options.map((col) => 
//         <Col span={8} key={col.value}>
//             <Checkbox  value={col.value}>{col.label}</Checkbox>
//         </Col>
//     );
//     return(
//         <Row>{R_Columns}</Row>
//     );
//   }

// ----------------- class 模式
  class RepositoryColumns extends Component{
    /**
     * 详细解释参加文档 Skill-Learn-Point.md
        constructor(props){
            super(props);
        }
    */
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


@Form.create()
class SendMR extends Component{
    constructor(props){
        super(props)
    }
    // 提交merge request的校验
    validate = () => {
        const {form: { validateFieldsAndScroll,validateFields },dispatch,} = this.props;
        // validateFields(['mr_privateKey','mr_originBranch','mr_targetBranch','mr_title','mr_description'],(error, values) => {
        validateFields(['mr_repos','mr_originBranch','mr_targetBranch','mr_title','mr_description'],(error, values) => {
            console.info(values);
            // validateFieldsAndScroll: 校验所有当前页面所有的字段
            // validateFields: 校验指定的Fields
            // validateFieldsAndScroll((error, values) => {
          if (!error) {
              if(values.mr_originBranch === values.mr_targetBranch){
                message.error('Can not be same branch!!!');
              }else{
                Modal.confirm({
                    title: '勾选的项目发送 Merge request',
                    content: '请确认你的操作?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => dispatch({
                        type: 'publish/sendMR',
                        payload: values,
                    })
                })
            }
          }
        });
    };

    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        // from mapStateToProps
        const sendLoading = this.props.sendLoading;
        return(
            <PageHeaderWrapper title="Send merge request" content="">
                {/* ####################### Panel_Step 1 ###################################### */}
                        <Card bordered={false} >
                        <Spin spinning={sendLoading} tip="Merge requests are submitting...">
                            <Form style={{marginTop: 8}}  >
                                {/* ---------------- 私钥  ---------------- */}
                                {/* <FormItem {...layout.formItemLayout} label={fieldLabels.mr_privateKey}>{
                                    getFieldDecorator('mr_privateKey',{
                                        initialValue: 'K4Qoz7woxAYZ4v6NKyZ9',
                                        rules: [{required: true, message: '清选择Token'}]
                                    })(<Select placeholder="清选择Token" >
                                        {tokens.map(item => <Option key={item.index} value={item.val}>{item.text + '-' + item.val}</Option>)}
                                        </Select>)
                                }</FormItem> */}
                                
                                <Form.Item {...layout.formItemLayout} label="Gitlab项目">{
                                    getFieldDecorator('mr_repos',{
                                        rules:[{required:true,message: '请选择仓库'}]
                                    })(<Checkbox.Group style={{ width: '100%' }}>
                                        <RepositoryColumns options={repository}></RepositoryColumns>
                                    </Checkbox.Group>)
                                }
                                </Form.Item>

                                {/* ---------------- Gitlab项目  ---------------- */}
                                {/* <FormItem {...layout.formItemLayout} label='Gitlab项目'>
                                    <Collapse >
                                        <Panel header="点击查将要提交Merge request的Git项目列表" key="10">
                                            <List size="small"
                                            // bordered
                                            dataSource={repository}
                                            renderItem={item => (<List.Item>{item.label}</List.Item>)}/>
                                        </Panel>
                                    </Collapse>
                                </FormItem> */}

                                {/* ---------------- 原分支  ---------------- */}
                                <FormItem {...layout.formItemLayout} label={fieldLabels.mr_originBranch}>{
                                    getFieldDecorator('mr_originBranch',{
                                        initialValue: 'develop',
                                        rules: [{required: true, message: '清选择原分支'}]
                                    })(<Select placeholder="清选择原分支" >
                                    <Option value="develop">develop</Option>
                                    <Option value="master">master</Option>
                                </Select>)
                                }</FormItem>
                                {/* ---------------- 目标分支 ---------------- */}
                                <FormItem {...layout.formItemLayout} label={fieldLabels.mr_targetBranch}>{
                                    getFieldDecorator('mr_targetBranch',{
                                        initialValue: 'master',
                                        rules: [{required: true, message: '清选择目标分支'}]
                                    })(<Select placeholder="清选择目标分支" >
                                    <Option value="develop">develop</Option>
                                    <Option value="master">master</Option>
                                </Select>)
                                }</FormItem>

                                {/* ---------------- 标题 ---------------- */}
                                <FormItem {...layout.formItemLayout} label={fieldLabels.mr_title}>{
                                    getFieldDecorator('mr_title',{
                                        initialValue: '',
                                        rules: [{required: true, message: '请输入标题'}]
                                    })(<Input placeholder="请输入Merge request标题" ></Input>)
                                }</FormItem>

                                {/* ---------------- 描述 ---------------- */}
                                <FormItem {...layout.formItemLayout} label={fieldLabels.mr_description}>{
                                    getFieldDecorator('mr_description',{
                                        initialValue: '',
                                        rules: [{required: true, message: '请输入描述'}]
                                    })(<TextArea placeholder="请输入Merge request描述" ></TextArea>)
                                }</FormItem>

                                {/*  */}
                                <FormItem {...layout.submitFormLayout} style={{ marginTop: 10 }}>
                                    <Button type="primary" onClick={()=>this.validate()}>提交Merge request</Button>      
                                </FormItem>
                            </Form>
                         </Spin>
                    </Card>
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    return {
        sendLoading: state.publish.sendLoading,
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _sendMR = connect(mapStateToProps)(SendMR)

export default _sendMR