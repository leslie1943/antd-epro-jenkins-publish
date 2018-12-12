import React, { Component } from 'react';
import { connect } from 'dva';
import {Form, Card, Input, Spin,List, Select, Button,message,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getGitMap, getGitToken } from '../../utils/gitMap';
const gitMap = getGitMap();
const tokens = getGitToken();

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

const acceptLabels = {
    accept_privateKey: '接收Merge request私钥',
}

@Form.create()
class AcceptMR extends Component{
    constructor(props){
        super(props)
    }
    
    // 接收一个merge request
    // id: project_id
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
            <PageHeaderWrapper title="Accept merge request" content="">
            {/* ####################### Panel_Step 2 ###################################### */}
                <Card bordered={false}>
                    <Form style={{marginTop: 8}}>
                        {/* ---------------- 接收Merge request私钥  ---------------- */}
                        {/* <FormItem {...formItemLayout} label={acceptLabels.accept_privateKey}>{
                            getFieldDecorator('accept_privateKey',{
                                initialValue: '',
                                rules: [{required: true, message: '清选择Token'}]
                            })(<Select placeholder="清选择Token" >
                                {tokens.map(item => <Option key={item.index} value={item.val}>{item.text + '-' + item.val}</Option>)}
                                </Select>)
                            }
                        </FormItem> */}
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
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    // console.info(state.publish.result);
    return {
        mrResult: state.publish.mrResult,
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _acceptMR = connect(mapStateToProps)(AcceptMR)

export default _acceptMR