import React, { Component } from 'react';
import styles from './BasicPublish.css';
import { connect } from 'dva';
import {Form, Card, Icon, Tag, DatePicker, TimePicker, Input, List,Collapse, Select, Popover, Button,Checkbox,message,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
const Panel = Collapse.Panel;


const fieldLabels = {
    mrType: "Merge 项目",
    privateKey: '私钥',
    mrId: 'MR id',
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
class SearchMR extends Component{
    constructor(props){
        super(props)
    }
      // 校验
      validate = () => {
        const {
          form: { validateFieldsAndScroll },dispatch,} = this.props;

        validateFieldsAndScroll((error, values) => {
          if (!error) {
            // console.info(values);
            dispatch({
              type: 'publish/searchMR',
              payload: values,
            });
          }
        });
      };

    componentDidMount(){}
    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        // from mapStateToProps
        const serviceResult = this.props.result;
        const mrList  = this.props.mrList

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
            <PageHeaderWrapper title="关闭 Merge request" content="">
                <Card bordered={false}>
                    <div style={{textAlign:'center'}}>
                    <Tag color="#2db7f5">当前有<strong>{mrList.length}</strong>个Merge Requests</Tag>
                    </div>
                   
                    <Form style={{marginTop: 8}}>
 

                        {/* ---------------- 选择类型  ---------------- */}
                        <FormItem {...formItemLayout} label={fieldLabels.mrType}>{
                            getFieldDecorator('mrType',{
                                rules: [{required: true, message: '请选择项目'}]
                            })(<Select placeholder="清选择项目" >
                            {types.map(item => <Option key={item.id} value={item.id}>{item.desc}</Option>)}
                        </Select>)
                        }</FormItem>

                        {/* ---------------- 标题 ---------------- */}
                        {/* <FormItem {...formItemLayout} label={fieldLabels.mrId}>{
                            getFieldDecorator('mrId',{
                                rules: [{required: true, message: '请输入要关闭的 merge request id'}]
                            })(<Input placeholder="请输入merge request id" ></Input>)
                        }</FormItem> */}

                        {/*  */}
                        <FormItem {...submitFormLayout} style={{ marginTop: 10 }}>
                            <Button type="danger" onClick={this.validate}>查询 MR</Button>      
                         </FormItem>
                     </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    return {
        mrList: state.publish.mrList
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _searchMR = connect(mapStateToProps)(SearchMR)

export default _searchMR