import React, { Component } from 'react';
import styles from './BasicPublish.css';
import moment from 'moment';
import { connect } from 'dva';
import {Form, Card, Select, Table, Button, message,Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { getRepository} from '../../utils/gitMap';
const repository = getRepository();

const { Option } = Select;
const FormItem = Form.Item;


const fieldLabels = {
    repository: "Repository name",
  };

@Form.create()
class SearchMR extends Component{
    constructor(props){
        super(props)
    }

    search = () => {
        const {form: { validateFields,getFieldValue}, dispatch} = this.props;
        validateFields(['repository'],(error, values) => {
            // 🎃🎃🎃KEEP DESC🎃🎃🎃 [getFieldValue('fieldName')]
            // 🎃🎃🎃KEEP DESC🎃🎃🎃 validateFieldsAndScroll: 校验所有当前页面所有的字段
            // 🎃🎃🎃KEEP DESC🎃🎃🎃 validateFields: 校验指定的Fields
            // 🎃🎃🎃KEEP DESC🎃🎃🎃 validateFieldsAndScroll((error, values) => {
          if (!error) {
            let project_id = getFieldValue('repository');
            dispatch({
                type: 'publish/searchMR',
                // payload: project_id,
                payload: values, // 👌👌👌 payload 可以是其他命名,但要和model里的参数名保持一致👌👌👌
            });
          }
        });
    };

    deleteRecord(record){
        const {dispatch } = this.props;
        Modal.confirm({
            title: `删除 ${record.id} 这条merger equest`,
            content: '请确认你的操作?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => dispatch({
                type: 'publish/close',
                payload: record,
            })
        })
    }

    componentDidMount(){}
    
    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        // from mapStateToProps
        const mrList  = this.props.mrList

         // 列数据...
         const columns = [
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: 200,
            },
            {
                title: 'Source branch',
                dataIndex: 'source_branch',
                key: 'source_branch'
            },
            {
                title: 'Target branch',
                dataIndex: 'target_branch',
                key: 'target_branch'
            },
            {
                title: 'Author',
                render: (text, record) => {
                    return record.author.username
                }
            },
            {
                title: 'Creation date',
                render: (text, record) => {
                    return moment(record.created_at).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: 'Status',
                render: (text, record) => {
                    return record.state;
                }
            },
            {
                title: 'Action',
                render: (text, record) => {
                    if(record.state === 'opened'){
                        return (
                            <span >
                                <a href="javascript:;" style={{color:'red'}} onClick={()=>this.deleteRecord(record)}>DELETE</a>
                            </span>
                        )
                    }else{
                        return "";
                    }
                }
            },

        ];

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
            <PageHeaderWrapper title="Query merge request" content="">
                <Card bordered={false}>
                    <Form style={{marginTop: 8}}>
                        {/* ---------------- 选择类型  ---------------- */}
                        <FormItem {...formItemLayout} label={fieldLabels.repository}>{
                            getFieldDecorator('repository',{
                                rules:[{required:true,message:'请选择Repository'}]
                            })(<Select placeholder="全部项目" >
                            {repository.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                        </Select>)
                        }</FormItem>

                        {/*  */}
                        <FormItem {...submitFormLayout} style={{ marginTop: 10 }}>
                            <Button type="primary" onClick={()=>this.search()}>查询 merge request</Button>      
                         </FormItem>
                     </Form>

                     <Table pagination={{ pageSize: 50 }} rowKey="id" scroll={{ y: 300 }} columns={columns} dataSource={mrList?mrList:[]} />
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